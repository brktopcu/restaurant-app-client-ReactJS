import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import { color } from "./Constants";

export class Navbar extends Component {
  state = { activeItem: "restoranlar" };

  render() {
    return (
      <div style={{ marginBottom: "20px" }}>
        <Menu borderless color={color} stackable>
          <Menu.Item as="a" header>
            <Image size="mini" src="/logo.png" style={{ marginRight: "3em" }} />
            Project Name
          </Menu.Item>
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
      </div>
    );
  }
}

export default Navbar;
