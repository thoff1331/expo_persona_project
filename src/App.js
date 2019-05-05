import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">{routes}</div>
      </HashRouter>
      {/* <Account /> */}
    </Provider>
  );
}

export default App;
