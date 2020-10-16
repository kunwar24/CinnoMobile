//Npm Packages
import { combineReducers } from "redux";

//Redux Actions
import {
  LOGIN,
  PLANLIST,
  LOGOUT,
  PDFREQ,
  TEAMREQ,
  APPLICATIONSETTING
} from "../actions";

//initial state for server request
const initialState = { data: {} };

//initial state for local
const localState = { title: "" };

/**
 * @desc Local state reducer (data inside this reducer will be at zero level, like: {abcd:'xyz'})
 * @param {String} actionType - Reducer action type
 */
const localStates = (actionType) => {
  return (state = localState, action) => {
    const { type = "", data = {} } = action;
    switch (type) {
      case actionType:
        return {
          ...state,
          ...data
        };
      default:
        return state;
    }
  };
};

/**
 * @desc Request state reducer (data inside this reducer will be at first level, like: {data: {abcd:'xyz'}})
 * @param {String} actionType - Reducer action type
 */
const returnStates = (actionType) => {
  return (state = initialState, action) => {
    const { type = "", data = {} } = action;
    switch (type.replace(/_SUCCESS|_FAILURE|_ERROR/g, "")) {
      case actionType:
        return {
          ...state,
          data
        };
      case `${actionType}_RESET`:
        return initialState;
      default:
        return state;
    }
  };
};

export default combineReducers({
  //Local state
  settingData: localStates(APPLICATIONSETTING),

  //Request states
  loginData: returnStates(LOGIN),
  logoutData: returnStates(LOGOUT),
  planListData: returnStates(PLANLIST),
  teamListData: returnStates(TEAMREQ)
});
