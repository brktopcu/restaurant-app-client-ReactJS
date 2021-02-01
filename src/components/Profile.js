import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Grid,
  Item,
  Modal,
  Form,
  Message,
  Divider,
} from "semantic-ui-react";
import { registerUserUrl } from "./Constants";

export class Profile extends Component {
  state = {
    modalOpen: false,
    password: "",
    confirmPassword: "",
  };

  handleChangePassword = () => {
    const { password, confirmPassword } = this.state;

    axios
      .post(registerUserUrl, {
        userId: this.props.userDetails.user.id,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: this.props.userDetails.user.phoneNumber,
        fullName: this.props.userDetails.user.fullName,
        username: this.props.userDetails.user.username,
      })
      .then(() => {
        this.setState({
          modalOpen: false,
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => console.log(error));
  };

  renderModal = () => {
    return (
      <Modal
        size="mini"
        dimmer="blurring"
        open={this.state.modalOpen}
        onClose={() =>
          this.setState({
            modalOpen: false,
            password: "",
            confirmPassword: "",
          })
        }
      >
        <Modal.Header>Şifre Değiştir</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              type="password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({
                  password: event.target.value,
                })
              }
              label="Yeni Şifre"
              placeholder="Yeni şifrenizi giriniz"
            />
            <Form.Input
              type="password"
              value={this.state.confirmPassword}
              onChange={(event) =>
                this.setState({
                  confirmPassword: event.target.value,
                })
              }
              label="Yeni Şifre (Tekrar)"
              placeholder="Yeni şifrenizi tekrar giriniz"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleChangePassword}>
            Şifre Değiştir
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              <Message color="olive">
                <Item.Group>
                  <Item>
                    <Item.Image size="medium" src="user-thumbnail.png" />

                    <Item.Content>
                      <Item.Header className="profileHeader" as="a">
                        {this.props.userDetails.user.fullName}
                      </Item.Header>
                      <Divider clearing />

                      <Item.Meta className="metaClass">
                        <h5>Mail :</h5>
                        {this.props.userDetails.user.username}
                      </Item.Meta>

                      <Item.Meta className="metaClass">
                        <h5>Telefon :</h5>
                        {this.props.userDetails.user.phoneNumber}
                      </Item.Meta>

                      <Item.Extra>
                        <Button
                          className="metaClass"
                          onClick={() => this.setState({ modalOpen: true })}
                          negative
                        >
                          Şifre Değiştir
                        </Button>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Message>
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
        </Grid>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(Profile);
