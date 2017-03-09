import React, { Component } from 'react';
import Navigation from './Navigation';
import { Grid, Row, Col } from 'react-bootstrap';

class Layout extends Component {
  
  state = {
    wordCount: this.props.wordCount,
    defCount: this.props.defCount
  }
  render() {
    return (
      <div>
        <Navigation wordCount={this.props.wordCount} defCount={this.props.defCount}/>
        <Grid>
          <Row>
            <Col>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Layout;
