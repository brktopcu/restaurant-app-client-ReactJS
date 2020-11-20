import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";
import Login from "./Login";
import Register from "./Register";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class LandingPage extends Component {
  componentDidMount() {
    if (this.props.userDetails.validToken) {
      this.props.history.push("/allRestaurants");
    }
  }

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
  const { registerForm, userDetails } = state;

  return { registerForm: registerForm, userDetails: userDetails };
};

export default withRouter(connect(mapStateToProps, null)(LandingPage));
