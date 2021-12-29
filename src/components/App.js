import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  MessageBoxWrapperContainer,
  LoadSpinnerContainer,
  DashBoardContainer,
} from "../containers";
import './App.scss'
import {
  ApolloProvider,
} from "@apollo/client";
import ApolloClient from '../services/dataCollector/apolloClient';

(function setViewportScale() {
  const statusBarSize = 24;
  const width = window.screen.width;
  const height = window.screen.height - statusBarSize;
  const scale = Math.min(width / 1920, height / 1200);
  const viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute('content', `initial-scale=${scale}, user-scalable=no`);
})();

console.log(ApolloClient);
export default function App() {
  const client = ApolloClient.getClient();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/"><DashBoardContainer /></Route>
        </Switch>
        <MessageBoxWrapperContainer />
        <LoadSpinnerContainer />
      </Router>
    </ApolloProvider>
  )
}