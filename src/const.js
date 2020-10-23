const location = window.location;
const isLocal = location.href.indexOf("localhost") > -1;
const dir = location.pathname.substring(0, location.pathname.lastIndexOf("/"));

let url = location.origin;
if (!location.origin) {
  // Some browsers (mainly IE) does not have this property, so we need to build it manually...
  location.origin =
    location.protocol +
    "//" +
    location.hostname +
    (location.port ? ":" + location.port : "");
}
if (isLocal) {
  if (url.indexOf(":8001") > -1) {
    url = url.replace("8001", "8043");
  } else {
    if (dir && dir.length > 0) {
      url += dir;
    } else {
      // url += "/Cinno/";
      url = "http://localhost:8000";
    }
  }
} else {
  if (dir && dir.length > 0) {
    url += dir;
  }
}

export default {
  hostURL: url,
  defaultValue: {
    requestTimeout: 1000 * 30
  },
  ResponseCode: {
    InternalServerError: 500,
    ServerOverload: 503,
    ServerUnavailable: 403,
    SessionExpire: 401,
    BadRequest: 400,
    RequestTimeout: 408,
    Success: 200
  },
  ErrorText: {
    InternalServerError: "Internal Server Error",
    ServerOverload:
      "Server is currently unable to handle request due to temporary overload or maintenance",
    ServerUnavailable: "Server - unavailable",
    BadRequest: "Bad Request",
    SessionExpire: "Session Expired",
    UnhandledException: "Something went wrong",
    RequestTimeoutError: `Please check your Network Connection`
  }
};
