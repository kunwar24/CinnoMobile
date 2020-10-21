import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Tooltip, Drawer, Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ReplyIcon from '@material-ui/icons/Reply';
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
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = () => {
    debugger
    // setDrawer(variant === "temporary" ? false : drawer);
    // setDrawer(!drawer);
  };

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          {!hideBack ? (
            <Tooltip title="Back">
              <IconButton
                aria-label="Logout"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onBack}
                color="inherit"
              >
                <ReplyIcon />
                {/* <ArrowBack /> */}
              </IconButton>
            </Tooltip>
          ) : (
              <IconButton
                // className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            )}
          <Typography variant="h6" color="inherit" className="title-flex">
            {title}
          </Typography>
          {/* <Tooltip title="Logout">
            <IconButton
              aria-label="Logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onLogout}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        // variant={variant}
        open={drawer}
        onClose={toggleDrawer}
        classes={{
          paper: 'drawerPaper'
        }}
      >
        <div className='toolbar'>
          <IconButton onClick={toggleDrawer}>
            {drawer ? (
              <ChevronLeftIcon />
            ) : (
                <ChevronRightIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onLogout}
          >
            <IconButton
              aria-label="Logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <ExitToAppIcon />
            </IconButton>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
};
