import React from "react";
import { Switch, Route } from "react-router-dom";
import home from "./components/home/home";
import discover from "./components/discover/discover";
import Signup from "./components/Signup/Signup";
import Login from "./components/login/login";
import pageSetup from "./components/pageSetup/pageSetup";
import displayPage from "./components/displayPage1/displayPage";
// import profile_edit from "./components/displayPage1/profile_edit";
import portfolio from "./components/Portfolio/portfolio";

export default (
  <Switch>
    <Route exact path="/" component={home} />
    <Route path="/discover" component={discover} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/auth/pageSetup" component={pageSetup} />
    <Route path="/auth/displayPage" component={displayPage} />
    <Route path="/auth/displayPage/profile" component={portfolio} />
    {/* <Route path="/profileEdit" component={profile_edit} /> */}
  </Switch>
);
