import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import firebaseConfig from "./services/firebaseConfig";

try {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().languageCode = "pt-BR";
} catch (err) {
  console.log(err);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
