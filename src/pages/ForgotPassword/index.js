import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button, Container, Grid, Link } from "@material-ui/core";

import "./forgotpassword.css";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [isLoginClicked, setLoginClicked] = useState("");

  const handleSubmit = (event) => {};
  const handleLoginClick = (event) => {
    setLoginClicked(true);
  };

  return (
    <Container>
      <div className="paper-container">
        <img src="/images/logo.png" />
        <form className="forgotPassword-form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            id="email"
            required
            label="email"
            fullWidth
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="forgotPassword-submit"
          >
            Retrieve Password
          </Button>
          <br />
          <br />
          <Grid container>
            <Grid item xs onClick={handleLoginClick}>
              <Link
                to={isLoginClicked && props.history.push({ pathname: "/#" })}
              >
                Back to Login?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  forgotPasswordData: state.forgotPasswordData
});

const ForgotPasswordModule = connect(mapStateToProps)(ForgotPassword);

export default ForgotPasswordModule;
