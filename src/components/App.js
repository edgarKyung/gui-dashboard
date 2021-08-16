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
import { MapContainer, OperationContainer, PointContainer } from "../containers";
import './App.scss'

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
    </Router>
  );
}