import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { color } from "./Constants";
import { connect } from "react-redux";
import { toggleRegisterAction } from "../actions/toggleRegisterAction";
//import axios from "axios";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleLogin = () => {};

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
                  icon="user"
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

export default connect(null, { toggleRegisterAction })(Login);
