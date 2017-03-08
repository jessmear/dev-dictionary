import React, { Component } from 'react';
import { Button, Glyphicon, Image } from 'react-bootstrap';
import Definition from './Definition';
import AddDefinition from './AddDefinition';
import { Link } from 'react-router';
import commonActions from './commonActions';

class Term extends Component {
  static propTypes = {
    term: React.PropTypes.object.isRequired,
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

  toggleAdd = () => this.setState({ showAddDefinition: !this.state.showAddDefinition })

  render() {
    const { term } = this.props;
    const { showAddDefinition } = this.state;
    return (
      <div className="term">
        <hr/>
        <h3><Link to={`/terms/${term.name}`}>{term.name}</Link></h3>
        <div className="small-byline">
          Term suggested by <Image src={'/avatars/' + this.state.avatarUrl} circle /> {this.state.userName}
        </div>
        <small className="remove-btn">remove term</small>
        {term.definitions.map((definition, index) => {
          return <Definition key={definition.id} definition={definition} index={index + 1} author={definition.userId}/>
        })}
        
        <div className="add-definition-section">
          <Button bsStyle="info" bsSize="xsmall" onClick={this.toggleAdd}>
            <Glyphicon glyph="plus-sign" /> Add definition
          </Button>
          {showAddDefinition && <AddDefinition hide={this.toggleAdd} termId={term.id} incrDefCount={this.props.incrDefCount}/>}
        </div>
      </div>
    );
  }
}

export default Term;
