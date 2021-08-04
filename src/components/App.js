import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { 
  OperationPage, MapPage, PointPage, SettingPage, LogPage
 } from './pages';
import { MapContainer } from "../containers";
import './App.scss'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/operation" /></Route>
        <Route exact path="/operation"><OperationPage /></Route>
        <Route path="/map"><MapContainer /></Route>
        <Route path="/point"><PointPage /></Route>
        <Route path="/setting"><SettingPage /></Route>
        <Route path="/log"><LogPage /></Route>
      </Switch>
    </Router>
  );
}