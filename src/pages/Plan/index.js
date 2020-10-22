import React, { useEffect } from "react";
import clsx from 'clsx';
import { useDispatch } from "react-redux";

//redux actions
import { applicationSetting } from "../../redux/actions";
import List from "@material-ui/core/List";
import { Tooltip, Container } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import "./plan.css";
import Button from "@material-ui/core/Button";
import Group from "@material-ui/icons/Group";
import DeviceHub from "@material-ui/icons/DeviceHub";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ViewListIcon from '@material-ui/icons/ViewList';
import AppsIcon from '@material-ui/icons/Apps';
import BallotIcon from '@material-ui/icons/Ballot';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ListIcon from '@material-ui/icons/List';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import TocIcon from '@material-ui/icons/Toc';
import AssessmentIcon from '@material-ui/icons/Assessment';

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

  const onPlansClick = (planName, id) => {
    props.history.push({ pathname: `/plans/${id}/${planName}` });
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
  let key = -1;

  const avatarList = [<BusinessCenterIcon className='avatarIcon' />, <ViewListIcon className='avatarIcon' />, <CloudQueueIcon className='avatarIcon' />, <DehazeIcon className='avatarIcon' />, <BallotIcon className='avatarIcon' />,
  <ListIcon className='avatarIcon' />, <AppsIcon className='avatarIcon' />, <TocIcon className='avatarIcon' />, <AssessmentIcon className='avatarIcon' />];

  const listItems = jsonData.map((item, index) => {
    key = key >= 2 ? 0 : (key + 1);
    return <ListItem key={index} className="planList-Background">
      <ListItemAvatar>
        <Avatar className={clsx('avatarBack', { ['avatarBackColor1']: (key == 0) }, { ['avatarBackColor2']: (key == 1) }, { ['avatarBackColor3']: (key == 2) })}>
          {avatarList[index]}
          {/* {item.planName == 'Business Continuity Plan' ? <BusinessCenterIcon className='avatarIcon' /> : <ViewListIcon className='avatarIcon' />} */}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={item.planName}
        // secondary={`Last Modified: ${date}`}
        onClick={() => {
          onPlansClick(item.planName, item.id);
        }}
      />
      {/* <Tooltip title="Organization">
        <Button
          variant="contained"
          color="primary"
          aria-label="add"
          className="planList-Organization"
          size="small"
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
          size="small"
          onClick={() => {
            onTeamsClick(item.planName, item.id);
          }}
        >
          <Group />
        </Button>
      </Tooltip> */}
    </ListItem>
  });

  return (
    <Container>
      <List className="planlist-root"><b>Welcome, Admin</b></List>
      {listItems}
    </Container>
  );
};
