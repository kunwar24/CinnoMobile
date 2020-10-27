import React, { useState, useCallback, useEffect } from "react";
import { connect, shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  Container,
  Link,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import packageJson from '../../../package.json';
import "./login.css";
//Redux Actions
import { login } from '../../redux/actions';

const Copyright = () => {
  return (
    <div>
      <center>
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Continuity Innovations
      </Link>{` ${new Date().getFullYear()}`}
      </center>
    </div>
  );
};

const Login = (props) => {
  const { loginInfo } = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isResetPassword, setResetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const { error, payload } = loginInfo.data || {};
    if (error !== undefined && payload !== undefined && !error && !payload.item.expired) {
        sessionStorage.setItem('currentUser', JSON.stringify(payload.item));
        props.history.push({ pathname: "/planlist" });
    } else {
      props.history.push({ pathname: "/" });
    }
  }, [loginInfo.data]);

  const handleSubmit = values => {
    values.preventDefault();
    let params = {
      username: username.trim(),
      password: password.trim()
    }
    dispatch(login(params));
  };

  const handleForgotPassword = (event) => {
    setResetPassword(true);
  };
  var currentDate = new Date();
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let day = currentDate.getDate();
  let monthIndex = currentDate.getMonth();
  let monthName = monthNames[monthIndex];
  let year = currentDate.getFullYear();
  let builtDate = `${day} ${monthName} ${year}`;
  return (
    <Container>
      <div className="paper-container">
        <img src="./images/logo.png" />
        <center>
          <div className='versionName'>
            {`Version ${packageJson.version} Built on: ${builtDate}`}
          </div>
        </center>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            id="username"
            required
            label="Username"
            fullWidth
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            id="password"
            required
            label="Password"
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="login-submit"
          >
            Login
          </Button>
          <br />
          <br />
          {/* <Grid container>
            <Grid item xs onClick={handleForgotPassword}>
              <Link
                to={
                  isResetPassword &&
                  props.history.push({ pathname: "/forgotpassword" })
                }
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <div className="login-copyright">
        <Copyright />
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loginInfo: state.loginData
});

const LoginModule = connect(mapStateToProps)(Login);

export default LoginModule;
