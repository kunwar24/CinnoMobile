import React, { useEffect } from "react";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";

//redux actions
import { applicationSetting, planList } from "../../redux/actions";
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
import AssessmentIcon from '@material-ui/icons/Assessment';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CloudIcon from '@material-ui/icons/Cloud';
import NotesIcon from '@material-ui/icons/Notes';
import TuneIcon from '@material-ui/icons/Tune';

export default (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applicationSetting({ title: "Plans" }));
  }, []);

  useEffect(() => {
    let userData = sessionStorage.getItem('currentUser');
    if (userData) {
      let userToken = JSON.parse(userData).token;
      dispatch(planList({}, { token: userToken, apiMethod: 'GET' }));
    } else {
      props.history.push({ pathname: "/" });
    }
  }, []);

  let planListData = useSelector((state) => {
    let { payload } = state.planListData.data;
    return !!payload && payload.item.records || [];
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

  const avatarList = [<BusinessCenterIcon className='avatarIcon' />, <ViewListIcon className='avatarIcon' />, <CloudIcon className='avatarIcon' />, <AllInboxIcon className='avatarIcon' />, <BallotIcon className='avatarIcon' />,
  <TuneIcon className='avatarIcon' />, <AppsIcon className='avatarIcon' />, <NotesIcon className='avatarIcon' />, <AssessmentIcon className='avatarIcon' />];

  let key = -1;
  const listItems = planListData.length !== 0 && planListData.map((item, index) => {
    let currentDate = new Date(item.updatedAt * 1000);
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    let date = `${currentDate.toDateString()} ${strTime}`;
    let currentItem = item.name;
    key = key >= 2 ? 0 : (key + 1);
    return <ListItem key={index} className="planList-Background">
      <ListItemAvatar>
        <Avatar className={clsx('avatarBack', { ['avatarBackColor1']: (key == 0) }, { ['avatarBackColor2']: (key == 1) }, { ['avatarBackColor3']: (key == 2) })}>
          {avatarList[index]}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        className='listSecondaryText'
        primary={currentItem}
        secondary={`Last Modified: ${date}`}
        onClick={() => {
          onPlansClick(currentItem, item.id);
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
