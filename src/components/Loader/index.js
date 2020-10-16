import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import "./loader.css";

const loaderStyle = {
  position: "absolute",
  top: "42%",
  width: "10%",
  marginLeft: "45%",
  marginRight: "45%",
  height: "auto",
  textAlign: "center"
};

export default () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <Modal className="custom-loader" open={true} style={loaderStyle}>
        <CircularProgress />
      </Modal>
    )
  );
};
