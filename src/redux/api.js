import consts from '../const';
let url = consts.hostURL;

const authURL = '/api/auth/authenticate';
export const api = {
  Login: url + authURL,
  Logout: url + authURL,
  PlanList: url + '/api/resource/library/with-fields/plans?orderBy=updatedAt&sortBy=desc&search=&offset=0&listType=all',
  TeamList: "TeamList"
};
