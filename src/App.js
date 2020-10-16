// NPM Pacakges
import React, { PureComponent } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

//Styling
import "./styles.css";

//Elements - start with Capital
import Router from "./routes";

// Files - start with small
import rootSaga from "./redux/sagas";
import configureStore from "./redux/configureStore";

//Configer Store and link saga with it
const initialState = {};
const store = configureStore(initialState);
store.runSaga(rootSaga);

//Application Root
export default class App extends PureComponent {
  render = () => {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="app">
            <Router />
          </div>
        </HashRouter>
      </Provider>
    );
  };
}
