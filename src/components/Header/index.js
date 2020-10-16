import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import "./header.css";

const hideBackList = ["planlist"];

export default (props) => {
  let title = useSelector((state) => state.settingData.title);
  const hideBack = hideBackList.includes(props.location.pathname.substring(1));
  const onLogout = () => {
    props.history.push({ pathname: "/" });
  };
  const onBack = () => {
    props.history.goBack();
  };
  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          {!hideBack && (
            <Tooltip title="Back">
              <IconButton
                aria-label="Logout"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onBack}
                color="inherit"
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h6" color="inherit" className="title-flex">
            {title}
          </Typography>
          <Tooltip title="Logout">
            <IconButton
              aria-label="Logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onLogout}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};
