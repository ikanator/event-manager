import React from "react";
import { Spinner } from "react-bootstrap";

export const FullPageSpinner = () => (
  <div className="d-flex justify-content-center align-items-center bg-info flex-grow-1">
    <Spinner animation="grow" className="text-warning" />
  </div>
);
