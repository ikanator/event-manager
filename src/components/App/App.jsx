import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Events } from "../Events/Events";
import { AuthenticatedRoute } from "../AuthenticatedRoute/AuthenticatedRoute";
import { UserProvider } from "../../providers/UserProvider";

function App() {
  return (
    <Router>
      <Switch>
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
  );
}

export default App;
