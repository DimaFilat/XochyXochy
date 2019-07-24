import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserSmallWishList from './UserSmallWishList';

export default class UserWishItems extends Component {
  state = {};

  render() {
    return (
      <div>
        <ul>
          {this.state.wishItem
            ? this.state.wishItem.map((element, index) => (
                <UserSmallWishList
                  id={this.props.index}
                  key={this.props.index}
                  title={this.props.element.title}
                  img={this.props.element.img}
                  rating={this.props.element.rating}
                  price={this.props.element.price}
                  description={this.props.element.description}
                  active={this.props.element.active}
                  reserve={this.props.element.reserve}
                />
              ))
            : 'loading'}
        </ul>
      </div>
    );
  }
}
