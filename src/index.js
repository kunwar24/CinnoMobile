import React from "react";
import ReactDOM from "react-dom";
import Loader from "./components/Loader";

import App from "./App";

ReactDOM.render(
  <div>
    <App />
    <Loader />
  </div>,
  document.getElementById("root")
);
