import { api } from "../api";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PLANLIST = "PLANLIST";
export const TEAMREQ = "TEAMREQ";
export const APPLICATIONSETTING = "APPLICATIONSETTING";

export function login(data = {}, options = {}) {
  return {
    type: options.type || LOGIN,
    apiMethod: options.apiMethod || "POST",
    isFromLoginPage: options.isFromLoginPage || false,
    apiUrl: api.Login,
    data
  };
}

export function logout(data = {}, options = {}) {
  return {
    type: options.type || LOGOUT,
    apiMethod: options.apiMethod || "POST",
    apiUrl: api.Logout,
    data
  };
}

export function planList(data = {}, options = {}) {
  return {
    type: options.type || PLANLIST,
    apiMethod: options.apiMethod || "POST",
    apiUrl: `${api.PlanList}&token=${options.token}`,
    data
  };
}
export function fetchTeam(data = {}, options = {}) {
  return {
    type: options.type || TEAMREQ,
    apiMethod: options.apiMethod || "POST",
    apiUrl: api.TeamList,
    data
  };
}

//local action
export function applicationSetting(data = {}) {
  return {
    type: APPLICATIONSETTING,
    data
  };
}
