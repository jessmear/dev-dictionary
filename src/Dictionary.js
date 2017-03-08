import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Term from './Term';
import AddTerm from './AddTerm';
import commonActions from './commonActions';

class Dictionary extends Component {
  state = {
    showAddTerm: false,
    fetchError: null,
    isFetching: false,
    termList: null,
    userList: null,
  };

  componentDidMount() {
    this.setState({ isFetching: true })
    commonActions.fetchJson('/terms?_embed=definitions')
      .then(response => {
        var terms = response.map(term => {
          console.log("responseresponseresponse response response response response ")
          console.log(response)
          console.log(term.id)
          console.log(term)
          console.log(term.userId)
            return <Term key={term.id} term={term} author={term.userId} incrDefCount={this.props.incrDefCount}/>;
          });
        this.setState({ itemList: terms });
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));
  }

  toggleAdd = () => this.setState({ showAddTerm: !this.state.showAddTerm })

  render() {
    const { showAddTerm } = this.state;

    return (
      <div>
        <h2>Terms</h2>
        <Button bsStyle="success" onClick={this.toggleAdd}>
          <Glyphicon glyph="plus-sign" /> Add term
        </Button>
        {showAddTerm && <AddTerm hide={this.toggleAdd} incrWordCount={this.props.incrWordCount} />}
        <div className="terms">
          {this.state.itemList}
        </div>
      </div>
    );
  }
}

export default Dictionary;
