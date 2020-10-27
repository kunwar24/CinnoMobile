import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

//redux actions
import { applicationSetting } from "../../redux/actions";
import List from "@material-ui/core/List";
import { Tooltip, Container } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./plan.css";
import Button from "@material-ui/core/Button";
import Group from "@material-ui/icons/Group";
import DeviceHub from "@material-ui/icons/DeviceHub";
import Download from "@material-ui/icons/GetApp";
import Typography from "@material-ui/core/Typography";

export default (props) => {
    const dispatch = useDispatch();
    const jsonData = require("../../subPlans.json");

    useEffect(() => {
        dispatch(applicationSetting({ title: props.match.params.planName }));
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

    const showBtnPlans = ['Business Continuity Plan', 'Business Plan'];

    const listItems = jsonData.map((item, index) => (
        <ListItem key={index} className="planList-Background">
            <ListItemText
                primary={item.planName}
            // secondary={`Last Modified: ${date}`}
            />
            <Tooltip title="Organization">
                <div style={{ textAlign: 'center' }}>
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
                        <Download />
                    </Button>
                    {showBtnPlans.includes(props.match.params.planName) && <div style={{ marginTop: '3px' }}>
                        Org
                    </div>}
                </div>
            </Tooltip>
            {showBtnPlans.includes(props.match.params.planName) &&
                <Tooltip title="Teams">
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            aria-label="add"
                            size="small"
                            onClick={() => {
                                onTeamsClick(item.planName, item.id);
                            }}
                        >
                            <Download />
                        </Button>
                        <div style={{ marginTop: '3px' }}>
                            Team
                        </div>
                    </div>
                </Tooltip>
            }
        </ListItem>
    ));

    return (
        <Container>
            <List className="subPlanlist-root"></List>
            {listItems}
        </Container>
    );
};
