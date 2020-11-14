import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { color } from "./Constants";

export class Navbar extends Component {
  state = { activeItem: "restoranlar" };

  render() {
    return (
      <div>
        <Menu color={color} stackable>
          <Link to="/">
            <Menu.Item
              name="restoranlar"
              onClick={this.handleItemClick}
              className="menuItem"
              as="div"
            >
              Restoranlar
            </Menu.Item>
          </Link>

          <Link>
            <Menu.Item
              name="rezervasyonlarım"
              className="menuItem"
              onClick={this.handleItemClick}
            >
              Rezervasyonlarım
            </Menu.Item>
          </Link>

          <Link>
            <Menu.Item
              name="favorilerim"
              className="menuItem"
              onClick={this.handleItemClick}
            >
              Favorilerim
            </Menu.Item>
          </Link>

          <Menu.Item
            name="çıkış yap"
            className="menuItem"
            onClick={this.handleItemClick}
            position="right"
          >
            <Link style={{ color: "black" }}>Çıkış Yap</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
