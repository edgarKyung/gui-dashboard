import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MapPage, PointPage, PolygonPage } from './pages';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/polygon">
            <PolygonPage />
          </Route>
          <Route path="/point">
            <PointPage />
          </Route>
          <Route path="/">
            <MapPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}