import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import home from "./components/home/home";
import discover from "./components/discover/discover";
import login from "./components/login/login";

export default (
  <Switch>
    <Route exact path="/" component={home} />
    <Route path="/discover" component={discover} />
    <Route path="/login" component={login} />
  </Switch>
);