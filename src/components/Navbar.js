import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Grid } from "semantic-ui-react";
import { color } from "./Constants";

export class Navbar extends Component {
  state = { activeItem: "restoranlar" };

  render() {
    return (
      <div style={{ marginBottom: "20px" }}>
        <Grid.Column width={14}>
          <Menu borderless color={color} stackable>
            <Link className="menuItem" to="/allRestaurants">
              <Menu.Item
                name="restoranlar"
                onClick={this.handleItemClick}
                as="div"
              >
                Restoranlar
              </Menu.Item>
            </Link>

            <Link className="menuItem" to="/myreservations">
              <Menu.Item name="rezervasyonlarım" onClick={this.handleItemClick}>
                Rezervasyonlarım
              </Menu.Item>
            </Link>

            <Link className="menuItem" to="/favourites">
              <Menu.Item name="favorilerim" onClick={this.handleItemClick}>
                Favorilerim
              </Menu.Item>
            </Link>

            <Menu.Item
              name="çıkış yap"
              className="menuItem"
              onClick={this.handleItemClick}
              position="right"
            >
              <Link style={{ color: "black" }} to="/">
                Çıkış Yap
              </Link>
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </div>
    );
  }
}

export default Navbar;
