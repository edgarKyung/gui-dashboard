import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { 
  OperationPage, MapPage, PointPage, SettingPage, LogPage
 } from './pages';
import './App.scss'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><OperationPage /></Route>
        <Route exact path="/operation"><OperationPage /></Route>
        <Route path="/map"><MapPage /></Route>
        <Route path="/point"><PointPage /></Route>
        <Route path="/setting"><SettingPage /></Route>
        <Route path="/log"><LogPage /></Route>
      </Switch>
    </Router>
  );
}