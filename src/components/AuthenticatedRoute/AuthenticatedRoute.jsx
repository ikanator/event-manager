import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

export const AuthenticatedRoute = ({ children, path = "/" }) => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <Route path={path}>
      {typeof user === "object" ? children : <Redirect to="/login" />}
    </Route>
  );
};

AuthenticatedRoute.propTypes = {
  /**
   * @property {React.ReactElement} children The JSX children elements
   */
  children: PropTypes.node,
  /**
   * @property {string} path The route URL
   */
  path: PropTypes.string,
};
