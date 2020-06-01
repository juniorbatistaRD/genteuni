import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Parse from "parse";
import * as serviceWorker from "./serviceWorker";
import { initializeFirebase } from "./push-notification";

Parse.initialize(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_JAVASCRIPT_KEY
);

//Initialize Parse Server SDK
Parse.serverURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:1337/parse"
    : "https://parseapi.back4app.com/";

ReactDOM.render(<App />, document.getElementById("root"));

//Initialize push notifications with firebase
initializeFirebase();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
