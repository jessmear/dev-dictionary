import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import commonActions from './commonActions';

class Definition extends Component {
  static propTypes = {
    definition: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
  };

  state = {
    showAddDefinition: false,
    fetchError: null,
    isFetching: false,
    termList: null,
    userName: null,
    avatarUrl: null
  };

  componentWillMount() {
    this.setState({ isFetching: true })
    var url = "/users?q=" + this.props.author + "&_limit=1";
    commonActions.fetchJson(url)
      .then(response => {
        this.setState({ userName: response[0].name, avatarUrl: response[0].avatarUrl });
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));
  }

  render() {
    const { definition, index } = this.props;

    return (
      <div>
      <div className="definition">
        <div className="definition-index">{index}.</div>
        <div className="definition-content">{definition.content}</div>
      </div>
      <div className="def-byline">
        Definition provided by <Image src={'/avatars/' + this.state.avatarUrl} circle />  {this.state.userName}
      </div>
      </div>
    );
  }
}

export default Definition;

