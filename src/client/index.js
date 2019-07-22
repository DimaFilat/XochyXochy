import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/combineReducer';
import App from './components/app/app';
// import YaSoberu from './components/yaSoberu/YaSoberu';
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = composeWithDevTools({});
// add to store rootReducer

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const Index = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('react-app'));
