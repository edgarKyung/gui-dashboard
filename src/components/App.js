import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { 
  MapPage, PointPage, PolygonPage, OperationPage
 } from './pages';
import './App.scss'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <OperationPage />
        </Route>

        <Route path="/polygon">
          <PolygonPage />
        </Route>
        <Route path="/point">
          <PointPage />
        </Route>
        <Route path="/map">
          <MapPage />
        </Route>
      </Switch>
    </Router>
  );
}