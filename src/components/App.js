import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  SettingPage, LogPage
} from './pages';
import { 
  MapContainer, 
  OperationContainer, 
  PointContainer,
  MessageBoxWrapperContainer,
} from "../containers";
import './App.scss'

(function setViewportScale() {
  const statusBarSize = 24;
  const width = window.screen.width;
  const height = window.screen.height - statusBarSize;
  const scale = Math.min(width / 1920, height / 1200);
  const viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute('content', `initial-scale=${scale}, user-scalable=no`);
})();

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/operation" /></Route>
        <Route exact path="/operation"><OperationContainer /></Route>
        <Route path="/map"><MapContainer /></Route>
        <Route path="/point"><PointContainer /></Route>
        <Route path="/setting"><SettingPage /></Route>
        <Route path="/log"><LogPage /></Route>
      </Switch>
      <MessageBoxWrapperContainer />
    </Router>
  );
}