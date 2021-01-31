import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Grid, Dropdown } from "semantic-ui-react";
import { color } from "./Constants";
import { connect } from "react-redux";
import { logoutAction } from "../actions/logoutAction";

export class Navbar extends Component {
  state = { isLoggedIn: false };

  logout = () => {
    this.props.logoutAction();
    window.location.href = "/";
  };

  renderAdminPanel = () => {
    if (this.props.userDetails.user.role === "ADMIN") {
      return (
        <Link to="/admin">
          <Dropdown.Item>Admin</Dropdown.Item>
        </Link>
      );
    }
  };

  render() {
    return (
      <div style={{ marginBottom: "20px" }}>
        <Grid.Column width={14}>
          <Menu borderless color={color} stackable>
            <Link className="menuItem" to="/allRestaurants">
              <Menu.Item name="restoranlar" as="div">
                Restoranlar
              </Menu.Item>
            </Link>

            <Link className="menuItem" to="/myreservations">
              <Menu.Item name="rezervasyonlarım">Rezervasyonlarım</Menu.Item>
            </Link>

            <Link className="menuItem" to="/favourites">
              <Menu.Item name="favorilerim">Favorilerim</Menu.Item>
            </Link>

            <Menu.Item name="çıkış yap" position="right">
              <h5>Merhaba, {this.props.userDetails.user.fullName}</h5>
            </Menu.Item>

            <Menu.Item>
              <Dropdown icon="user">
                <Dropdown.Menu>
                  {this.renderAdminPanel()}
                  <Link to="/profile">
                    <Dropdown.Item>Profilim</Dropdown.Item>
                  </Link>
                  <Dropdown.Item>Yorumlarım</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout}>Çıkış Yap</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps, { logoutAction })(Navbar);
