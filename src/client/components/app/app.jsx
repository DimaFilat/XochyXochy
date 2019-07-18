import React, { Component } from 'react';
import Type from 'prop-types';
import elbrusImg from './elbrus.png';

export default class App extends Component {
  static propTypes = {
    appName: Type.string
  };

  static defaultProps = {
    appName: 'Default App Name'
  };

  componentDidMount() {
    const fetchFunc = async () => {
      const res = await fetch('/test');
      console.log(res);
      return res;
    };
    fetchFunc();
  }

  render() {
    const { appName } = this.props;
    return (
      <div className='some class'>
        <h1>{ appName }</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <img src={ elbrusImg } width='300px' className='other-img' />
      </div>
    );
  }
}
