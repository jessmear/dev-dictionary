import React, { Component } from 'react';
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Navigation extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  }

  state = {
    wordCount: this.props.wordCount,
    defCount: this.props.defCount
  }
  
  render() {
    const { loggedInUser } = this.context;

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Dev Dictionary</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            <Link to="/terms">Terms</Link>
          </Navbar.Text>
          <Nav pullRight>
            {loggedInUser && <Navbar.Text>
               <Image className="nav-avatar" src={'/avatars/' + loggedInUser.avatarUrl} />
              {' '}
              <strong>{loggedInUser.name}</strong>
            </Navbar.Text>}
            {loggedInUser && <Navbar.Text>
              You've created {this.props.wordCount} words and {this.props.defCount} definitions!
            </Navbar.Text>}
            {loggedInUser && <LinkContainer to="/logout"><NavItem eventKey={2}>Logout</NavItem></LinkContainer>}
            {!loggedInUser && <LinkContainer to="/login"><NavItem eventKey={2}>Login</NavItem></LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
