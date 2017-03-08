import React, { Component } from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Image, Well } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import commonActions from './commonActions';

const userComponent = props => {
  const value = props.value ? props.value : props.option
  return (
    <div className="user-select-component" onClick={() => props.onSelect(value)}>
      <Image className="nav-avatar" src={'/avatars/' + value.avatarUrl} />
      {' '}
      <strong>{value.name}</strong>
    </div>
  )
};

class AddDefinition extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
    incrDefCount: React.PropTypes.func.isRequired,
    termId: React.PropTypes.number.isRequired
  };

  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  state = {
    who: null,
    fetchError: null,
    isFetching: false,
    options: null,
    value: ''
  };

  componentWillMount() {
    this.setState({ isFetching: true })
    commonActions.fetchJson('/users')
      .then(response => {
        this.setState({ options: response });
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));
  }

  createDefinition = () => {
    var definer;
    definer = this.state.who ? this.state.who.id : this.context.loggedInUser.id;
    var newDef = {
      userId: definer,
      content: this.state.value,
      termId: this.props.termId
    };
    commonActions.fetchJson('/definitions', {
      method: 'POST', 
      body: newDef})
      .then(response => {
        this.props.incrDefCount();
        //console.log(response)
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  };

  selectWho = user => this.setState({ who: user });

  render() {
    const { hide } = this.props;
    const { who } = this.state;

    return (
      <Well className="add-definition">
        <Form horizontal>
          <FormGroup controlId="defInput">
            <Col componentClass={ControlLabel} sm={2}>
              Definition
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                componentClass="textarea" 
                placeholder="Add your definition"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Who's definition?
            </Col>
            <Col sm={10}>
              <Select
                options={this.state.options}
                optionComponent={userComponent}
                ignoreCase
                onChange={this.selectWho}
                value={who}
                valueComponent={userComponent}
              />
              <HelpBlock>If you heard someone provide this definition, you can credit it to them. Otherwise, choose yourself.</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit" onClick={this.createDefinition}>
                Submit the definition
              </Button>
              <Button bsStyle="link" onClick={hide}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default AddDefinition;
