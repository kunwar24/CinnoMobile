import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

//redux actions
import { applicationSetting } from "../../redux/actions";

import { Tooltip, Container } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import "./plan.css";
import Button from "@material-ui/core/Button";
import Group from "@material-ui/icons/Group";
import DeviceHub from "@material-ui/icons/DeviceHub";

export default (props) => {
  const dispatch = useDispatch();
  const jsonData = require("../../planList.json");

  useEffect(() => {
    dispatch(applicationSetting({ title: "Plans" }));
  }, []);

  const onOrganizationClick = (planName, id) => {
    dispatch(applicationSetting({ title: planName }));
    props.history.push({ pathname: `/pdfviewer/${id}/${planName}` });
  };

  const onTeamsClick = (planName, id) => {
    props.history.push({ pathname: `/plandetail/${id}/${planName}` });
  };

  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  var date = `${currentDate.toDateString()} ${strTime}`;

  const listItems = jsonData.map((item, index) => (
    <ListItem key={index} className="planList-Background">
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.planName}
        secondary={`Last Modified: ${date}`}
      />
      <Tooltip title="Organization">
        <Button
          variant="contained"
          color="primary"
          aria-label="add"
          className="planList-Organization"
          onClick={() => {
            onOrganizationClick(item.planName, item.id);
          }}
        >
          <DeviceHub />
        </Button>
      </Tooltip>
      <Tooltip title="Teams">
        <Button
          variant="contained"
          color="primary"
          aria-label="add"
          onClick={() => {
            onTeamsClick(item.planName, item.id);
          }}
        >
          <Group />
        </Button>
      </Tooltip>
    </ListItem>
  ));

  return <Container>{listItems}</Container>;
};
