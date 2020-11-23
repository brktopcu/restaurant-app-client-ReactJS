import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { color, registerUserUrl } from "./Constants";
import { connect } from "react-redux";
import { toggleRegisterAction } from "../actions/toggleRegisterAction";
import axios from "axios";

export class Register extends Component {
  state = {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    error: {},
    redirect: false,
  };

  handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(registerUserUrl, {
        username: this.state.username,
        fullName: this.state.fullName,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        phoneNumber: this.state.phoneNumber,
      })
      .then((response) => {
        this.props.toggleRegisterAction("login");
      })
      .catch((error) => {
        this.setState({ error: error.response.data });
      });
  };

  renderErrorMessages = () => {
    let errorArray = [];

    if (Object.keys(this.state.error).length !== 0) {
      Object.keys(this.state.error).forEach((i) =>
        errorArray.push(this.state.error[i])
      );

      return (
        <Message
          error
          header="Lütfen aşağıdaki hataları düzeltin"
          list={errorArray}
        />
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
              Yeni hesap açın
            </Header>
            <Form size="large" onSubmit={this.handleRegister}>
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
                  icon="user"
                  iconPosition="left"
                  placeholder="Tam Adınız"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre tekrarı"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
                <Form.Input
                  fluid
                  icon="phone"
                  iconPosition="left"
                  placeholder="Telefon numarası"
                  value={this.state.phoneNumber}
                  onChange={(e) =>
                    this.setState({ phoneNumber: e.target.value })
                  }
                />

                <Button type="submit" color={color} fluid size="large">
                  Kaydol
                </Button>
              </Segment>
            </Form>
            {this.renderErrorMessages()}
            <Message>
              Zaten üye misiniz?{" "}
              <Button
                basic
                color="red"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  this.props.toggleRegisterAction("login");
                }}
              >
                Giriş Yap
              </Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(null, { toggleRegisterAction })(Register);
