import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import commonActions from './commonActions';
import Term from './Term'; 


class TermContainer extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      termName: React.PropTypes.string.isRequired,
    })
  };

  state = {
    showAddTerm: false,
    fetchError: null,
    isFetching: false,
    termId: null,
    userId: null,
    termName: null,
    term: null
  };

  componentDidMount() {
    this.setState({ isFetching: true })
    var url = '/terms?q=' + this.props.params.termName + '&_embed=definitions'
    commonActions.fetchJson(url)
      .then(response => {
        this.setState({ 
          termId: response[0].id,
          userId: response[0].userId,
          termName: response[0].name,
          term: <Term key={response[0].id} term={response[0]} author={response[0].userId}/>
        });
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));

    this.setState({ isFetching: true })
    commonActions.fetchJson('/terms?_embed=definitions')
      .then(response => {
        var terms = response.map(term => {
            return <Term key={term.id} term={term} author={term.userId} />;
          });
        this.setState({ itemList: terms });
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));
  }

  render() {
    return (
      <div className="term">
        <Link to="/terms">
          <Glyphicon glyph="chevron-left" /> Back to terms
        </Link>
        {this.state.term}
      </div>
    );
  }
}

export default TermContainer;
