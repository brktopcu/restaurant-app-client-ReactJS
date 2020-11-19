import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";
import Login from "./Login";
import Register from "./Register";
import { connect } from "react-redux";

export class LandingPage extends Component {
  render() {
    return (
      <div>
        <Grid style={{ height: "100vh" }}>
          <Grid.Column
            width="8"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image style={{ width: "85%" }} src="/Landing.png" />
          </Grid.Column>
          <Grid.Column width="8">
            {this.props.registerForm === "login" && <Login />}
            {this.props.registerForm === "register" && <Register />}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { registerForm } = state;

  return { registerForm: registerForm };
};

export default connect(mapStateToProps, null)(LandingPage);
