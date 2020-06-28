import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import firebase from "firebase/app";
import "firebase/auth";

import "firebase/database";
import { firebaseConfig } from "./config/firebase";

import { createStore, combineReducers } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Hub from "./components/hub/Hub";
import Home from "./components/hub/Home";
import Construction from "./components/Construction";
import Startpage from "./components/startpage/Startpage";
import Projects from "./components/projects/Projects";
import Playground from "./components/playground/Playground";

// react-redux-firebase config
const rrfConfig = {
  // userProfile: "users"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const Root = ({ store }) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/home">
          <Redirect to="/" />
        </Route>

        <Route path="/hub" component={Hub} />
        <Route path="/projects" component={Projects} />

        <Route path="/playground/" component={Playground} />
        <Route path="/playground/startpage" component={Startpage} />

        <Route path="/construction" component={Construction} />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);

// Setup react-redux so that connect HOC can be used
ReactDOM.render(<Root store={store} />, document.getElementById("root"));
