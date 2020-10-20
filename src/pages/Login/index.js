import React, { useState } from "react";
import { connect } from "react-redux";
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

import "./login.css";

const Copyright = () => {
  return (
    // <Typography variant="body2" color="textSecondary" align="center">
    <div>
      <center>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Continuity Innovations
      </Link>{" "}
      {new Date().getFullYear()}
      </center>
    </div>

    // </Typography>
  );
};

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isResetPassword, setResetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      username.trim() === "admin@spraxa.com" &&
      password.trim() === "Admin@123"
    ) {
      props.history.push({ pathname: "/planlist" });
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleForgotPassword = (event) => {
    setResetPassword(true);
  };
  return (
    <Container>
      <div className="paper-container">
        <img src="./images/logo.png" />
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
  loginData: state.loginData
});

const LoginModule = connect(mapStateToProps)(Login);

export default LoginModule;
