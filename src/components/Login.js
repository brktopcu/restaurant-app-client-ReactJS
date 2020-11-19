import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { color, loginUserUrl } from "./Constants";
import { connect } from "react-redux";
import { toggleRegisterAction } from "../actions/toggleRegisterAction";
import { setUserAction } from "../actions/setUserAction";
import axios from "axios";
import setJwtToken from "../securityUtils/setJwtToken";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    showErrorMessage: false,
  };

  handleLogin = () => {
    axios
      .post(loginUserUrl, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        setJwtToken(token);
        const decodedToken = jwt_decode(token);
        this.props.setUserAction(decodedToken);
        this.props.history.push("/allRestaurants");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showErrorMessage: true });
      });
  };

  renderErrorMessage = () => {
    if (this.state.showErrorMessage) {
      return (
        <Message error>Hatalı giriş yaptınız. Lütfen tekrar deneyin.</Message>
      );
    }
  };

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color={color} textAlign="center">
              Hesabınıza Giriş Yapın
            </Header>
            <Form size="large" onSubmit={this.handleLogin}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-posta adresi"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />

                <Button type="submit" color={color} fluid size="large">
                  Giriş Yap
                </Button>
              </Segment>
            </Form>
            {this.renderErrorMessage()}
            <Message>
              Kayıtlı değil misiniz?{" "}
              <Button
                basic
                color="red"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  this.props.toggleRegisterAction("register");
                }}
              >
                Kaydol
              </Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default withRouter(
  connect(mapStateToProps, {
    toggleRegisterAction,
    setUserAction,
  })(Login)
);
