import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
// dev-mb0d74nd.us.auth0.com
// lBHtMkgJKmw3T62EyojbeajY4sI0NGNx

ReactDOM.render(
  <React.StrictMode>
    {/* this wraper came from api */}
    <Auth0Provider
      domain="dev-mb0d74nd.us.auth0.com"
      clientId="lBHtMkgJKmw3T62EyojbeajY4sI0NGNx"
      redirectUri={window.location.origin}
      // save to LS
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <Router>
          <App />
        </Router>
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
