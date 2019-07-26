import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

export default class UserCelebrationList extends Component {
  render() {
    return (
      <div>
        {this.props.title}
        <br/>
        {this.props.date.slice(0, 10)}
        <Divider />
      </div>
    );
  }
}
