import React from "react";
import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Events } from "../Events/Events";
import { AuthenticatedRoute } from "../AuthenticatedRoute/AuthenticatedRoute";
import { UserProvider } from "../../providers/UserProvider";
import { Authenticated } from "../Authenticated/Authenticated";
import Logo from "../../logo.png";

function App() {
  return (
    <div className="h-100 d-flex flex-column">
      <Router>
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand>
            <img width="55" src={Logo} alt="Event Manager Logo" /> Event Manager
          </Navbar.Brand>
        </Navbar>
        <Switch>
          <Route path="/authenticated">
            <Authenticated />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <UserProvider>
            <AuthenticatedRoute path="/" exact>
              <Events />
            </AuthenticatedRoute>
          </UserProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
