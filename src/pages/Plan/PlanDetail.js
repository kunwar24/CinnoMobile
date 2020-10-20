import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
//redux actions
import { applicationSetting } from "../../redux/actions";

import Download from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import List from "@material-ui/core/List";
import { Container, Tooltip } from "@material-ui/core";
import "./plan.css";

export default (props) => {
  const dispatch = useDispatch();
  const jsonData = require("../../teamList.json");
  const id = props.match.params.id;
  const teamsData = (jsonData && jsonData[id]) || [];

  const onDownloadClick = (planName, id) => {
    props.history.push({ pathname: `/pdfviewer/${id}/${planName}` });
  };

  useEffect(() => {
    dispatch(applicationSetting({ title: props.match.params.planName }));
  }, []);

  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  var date = `${currentDate.toDateString()} ${strTime}`;

  const teamList = teamsData.map((item, index) => (
    <ListItem key={index} className="planList-Background">
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.teamName}
        secondary={`Last Modified: ${date}`}
      />
      <Tooltip title="Organization">
        <Button
          variant="contained"
          color="primary"
          aria-label="add"
          size="small"
          onClick={() => onDownloadClick(item.teamName, item.id)}
          className="planList-Organization"
        >
          <Download />
        </Button>
      </Tooltip>
    </ListItem>
  ));

  return (
    <Container>
      <List className="planlist-root"></List>
      {teamList}
    </Container>
  );
};
