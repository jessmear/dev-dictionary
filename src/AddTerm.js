import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Col, Well } from 'react-bootstrap';
import commonActions from './commonActions';

class AddTerm extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  static propTypes = {
    hide: React.PropTypes.func.isRequired,
    incrWordCount: React.PropTypes.func.isRequired,
  };

  createTerm = () => {
    var newWord = {name: this.state.value, userId: this.context.loggedInUser.id};
    commonActions.fetchJson('/terms', {
      method: 'POST', 
      body: newWord})
      .then(response => {
        //console.log(response)
        this.props.incrWordCount();
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));
  };

  state = {
      value: ''
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  };

  render() {
    const { hide } = this.props;
    return (
      <Well className="add-term">
        <Form horizontal>
          <FormGroup controlId="termInput">
            <Col componentClass={ControlLabel} sm={2}>
              Term
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.value}
                placeholder="Enter new term"
                onChange={this.handleChange.bind(this)}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit" onClick={this.createTerm}>
                Submit new term
              </Button>
              <Button bsStyle="link" onClick={hide}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default AddTerm;
