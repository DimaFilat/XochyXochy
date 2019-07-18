import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app';
import { createStore } from "redux";
// import rootReducer from "./redux/reducer/combinedReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const composeEnhancer = composeWithDevTools({});
// const store = createStore(rootReducer, composeEnhancer());

const Index = () => (
<div>
  <App appName='React Router Challenge: Yelp Restaurants Clone'/>
  </div>
);

ReactDOM.render(<Index />, document.getElementById('react-app'));
