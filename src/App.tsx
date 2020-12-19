import React from "react";
import GraphiQL from "graphiql";
import logo from "./armillarysphere.svg";
import { FetcherParams } from "graphiql/dist/components/GraphiQL";
import "./App.css";
import "graphiql/graphiql.css";
import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import { Menu as MenuIcon } from "@material-ui/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GraphDebugger from "./GraphDebugger";
import { Box } from "@material-ui/core";

function App() {
  const classes = {};
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                style={{ width: "30px", fill: "white", marginRight: "10px" }}
              />
              Seven Sisters characters graph
            </Typography>
            <Box m={1}>
              <Link to="/">Graph</Link>
            </Box>
            <Box m={1}>
              <Link to="/debugger">Debugger</Link>
            </Box>
          </Toolbar>
        </AppBar>
        {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Switch>
          <Route path="/debugger">
            <GraphDebugger />
          </Route>
          <Route path="/">{/* <Home /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
