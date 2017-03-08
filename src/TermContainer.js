import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import commonActions from './commonActions';

class Term extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      termName: React.PropTypes.string.isRequired,
    })
  };

  state = {
    showAddTerm: false,
    fetchError: null,
    isFetching: false,
    termId: 0,
    termName: "Loading...",
    termAuthorId: 0
  };

  componentWillMount() {
    this.setState({ isFetching: true })
    var url = '/terms?q=' + this.props.params.termName + '&_limit=1';
    commonActions.fetchJson(url)
      .then(response => {
        this.setState({ 
          termId: response[0].id,
          termName: response[0].name,
          termAuthorId: response[0].userId
        });        
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => {this.setState({ isFetching: false })}
      );
  }

  render() {
    return (
      <div className="term">
        <Link to="/terms">
          <Glyphicon glyph="chevron-left" /> Back to terms
        </Link>
        <h1>    
          <Term key={this.state.termId} term={this.state.termName} author={this.state.termAuthorId}/>
        </h1>
      </div>
    );
  }
}

export default Term;
