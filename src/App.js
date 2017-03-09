import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './Layout';
import Logout from './Logout';
import Login from './Login';
import Welcome from './Welcome';
import Dictionary from './Dictionary';
import TermContainer from './TermContainer';
import commonActions from './commonActions';
import './css/App.css';

class App extends Component {
  static childContextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  constructor() {
    super();
    const loggedInUserJson = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserJson ? JSON.parse(loggedInUserJson) : null;
    this.state = {
      loggedInUser,
      defCount: null,
      wordCount: null,
      userId: null
    };
  }

  getChildContext() {
    return {
      loggedInUser: this.state.loggedInUser,
    };
  }

  markUserLoggedIn = user => {
    this.setState({ loggedInUser: user });
    this.getCount(user.id);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  markUserLoggedOut = () => {
    this.setState({ loggedInUser: null });
    localStorage.setItem('loggedInUser', null);
  };

  // gets the counts for definitions and words creatd by the logged in user
  getCount(user) {
    var data = '/users?q='+ user +'&_embed=definitions';
    commonActions.fetchJson(data)
      .then(response => { 
        this.setState({ 
          defCount: response[0]['definitions'].length })
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false })); 

    data = '/users?q='+ user +'&_embed=terms';
    commonActions.fetchJson(data)
      .then(response => { 
        this.setState({ 
          wordCount: response[0]['terms'].length })
        })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false })); 
  };

  componentDidMount() {
    var userId = JSON.parse(localStorage.loggedInUser).id;
    this.getCount(userId)
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={props => <Layout { ...props} defCount={this.state.defCount} wordCount={this.state.wordCount} />} >
          <IndexRoute component={Welcome} />
          <Route path="login" component={props => <Login { ...props} markUserLoggedIn={this.markUserLoggedIn} />} />
          <Route path="logout" component={props => <Logout { ...props} markUserLoggedOut={this.markUserLoggedOut} />} />
          <Route path="terms" >
            <IndexRoute component={Dictionary} />
            <Route path=":termName" component={TermContainer} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
