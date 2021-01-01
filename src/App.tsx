import React from "react";
import "./App.css";
import "graphiql/graphiql.css";
import AppBar from "@material-ui/core/AppBar/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GraphDebugger from "./components/GraphDebugger/GraphDebugger";
import GraphQuery from "./components/GraphQuery/GraphQuery";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import StartDialog from "./components/StartDialog/StartDialog";
import { GraphSettingsProvider } from "./context/GraphSettingsContext";

function App() {
  return (
    <Router>
      <StartDialog />
      <div className="App">
        <AppBar position="static">
          <AppToolbar />
        </AppBar>
        <Switch>
          <Route path="/debugger">
            <GraphDebugger />
          </Route>
          <Route path="/">
            <GraphSettingsProvider>
              <GraphQuery />
            </GraphSettingsProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
