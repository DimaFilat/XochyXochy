import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

export default class UserCelebrationList extends Component {
  render() {
    return (
      <div>
        {this.props.title}
        {this.props.date}
        <Divider />
      </div>
    );
  }
}
