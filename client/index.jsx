import ReactDOM from "react-dom";
import React from "react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
