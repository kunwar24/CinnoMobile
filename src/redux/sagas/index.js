//Npm packages
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { all, call, put, takeLatest } from "redux-saga/effects";
import swal from "sweetalert2";

//Redux actions
import { LOGIN, PLANLIST, LOGOUT, TEAMREQ } from "../actions";

//Helper files
import consts from "../../const";

const ResponseCode = consts.ResponseCode;
const ErrorText = consts.ErrorText;

/**
 * @desc - axios request
 * @param {Object} ActionInfo -  Object of action that has api path, body
 */
const fetchRequest = ({ apiUrl, data, apiMethod }) =>
  trackPromise(
    axios.request({
      method: apiMethod,
      baseURL: consts.hostURL,
      url: apiUrl,
      data: data,
      timeout: consts.defaultValue.requestTimeout
    })
  );

export function* request(action) {
  try {
    //Here we are request using action values
    let { data } = yield call(fetchRequest, action);

    //From here we dispatch Success and Failure action for the Request
    yield put({
      type: action.type + (data.success ? "_SUCCESS" : "_FAILURE"),
      data
    });
  } catch (error) {
    //reading the HTTP error code
    let errorStatus = error.response
      ? error.response.status
      : ResponseCode.RequestTimeout,
      message = "",
      shouldRedirectToLogin = errorStatus === ResponseCode.SessionExpire;
    switch (errorStatus) {
      case ResponseCode.InternalServerError:
        message = ErrorText.InternalServerError;
        break;
      case ResponseCode.ServerOverload:
        message = ErrorText.ServerOverload;
        break;
      case ResponseCode.ServerUnavailable:
        message = ErrorText.ServerUnavailable;
        break;
      case ResponseCode.SessionExpire:
        message = ErrorText.SessionExpire;
        break;
      case ResponseCode.BadRequest:
        message = ErrorText.BadRequest;
        break;
      case ResponseCode.RequestTimeout:
        message = ErrorText.RequestTimeoutError;
        break;
      default:
        message = ErrorText.UnhandledException;
        break;
    }
    //From here we dispatch Error action for the Request
    yield put({
      type: action.type + "_ERROR",
      data: { success: false, err: error }
    });
    if (shouldRedirectToLogin) {
      yield put({ type: "LOGIN_RESET", data: null });
    }

    //we show the exception message from here
    //In case of Session Expire we redirect the user to main screen
    if (!action.isFromLoginPage) {
      swal.fire("Error", message, "error").then(() => {
        if (shouldRedirectToLogin) {
          window.location.hash = "#/";
        }
      });
    }
  }
}

export function* loginRequest() {
  yield takeLatest(LOGIN, request);
}

export function* logoutRequest() {
  yield takeLatest(LOGOUT, request);
}

export function* planListRequest() {
  yield takeLatest(PLANLIST, request);
}

export function* teamRequest() {
  yield takeLatest(TEAMREQ, request);
}

export default function* rootSaga() {
  yield all([
    loginRequest(),
    logoutRequest(),
    planListRequest(),
    teamRequest()
  ]);
}
