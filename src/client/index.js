import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import { createStore } from "redux";
// import rootReducer from "./redux/reducer/combinedReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const composeEnhancer = composeWithDevTools({});
// add to store rootReducer

const store = createStore(composeEnhancer());

const Index = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById("react-app"));
