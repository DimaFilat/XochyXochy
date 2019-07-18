import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import YaSoberu from './components/yaSoberu/YaSoberu';

const composeEnhancer = composeWithDevTools({});

const store = createStore(rootReducer, composeEnhancer());

const Index = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* <YaSoberu /> */}
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('react-app'));
