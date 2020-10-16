// NPM Pacakges
import React, { Fragment, memo } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//Elements - start with Capital
import Header from "../components/Header";
import Login from "../pages/Login";
import PlanList from "../pages/Plan";
import PlanDetail from "../pages/Plan/PlanDetail";
import PdfViewer from "../pages/Plan/PdfViewer";
import ForgotPassword from "../pages/ForgotPassword";

const ApplicationRouteHandler = memo(({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <div className="main">
        <Header {...routeProps} />
        <Component {...routeProps} />{" "}
      </div>
    )}
  />
));

export default memo((props) => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <ApplicationRouteHandler exact path="/planlist" component={PlanList} />
      <ApplicationRouteHandler
        exact
        path="/plandetail/:id/:planName"
        component={PlanDetail}
      />
      <ApplicationRouteHandler
        exact
        path="/pdfviewer/:id/:planName"
        component={PdfViewer}
      />
      <Route exact path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
});
