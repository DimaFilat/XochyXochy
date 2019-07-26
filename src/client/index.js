/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../client/redux/reducers/combineReducer';
import App from '../client/components/app/app';
// import YaSoberu from './components/yaSoberu/YaSoberu';
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = composeWithDevTools({});
// add to store rootReducer

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const AppWithRouter = withRouter(App);

const Index = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('react-app'));
