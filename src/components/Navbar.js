import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { color } from "./Constants";

export class Navbar extends Component {
  state = { activeItem: "tüm restoranlar" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu color={color} pointing secondary>
          <Link to="/">
            <Menu.Item
              name="tüm restoranlar"
              active={activeItem === "tüm restoranlar"}
              onClick={this.handleItemClick}
              as="div"
            >
              Tüm Restoranlar
            </Menu.Item>
          </Link>

          <Menu.Item
            name="rezervasyonlarım"
            active={activeItem === "rezervasyonlarım"}
            onClick={this.handleItemClick}
          >
            Rezervasyonlarım
          </Menu.Item>
          <Menu.Item
            name="favorilerim"
            active={activeItem === "favorilerim"}
            onClick={this.handleItemClick}
          >
            Favorilerim
          </Menu.Item>
          <Menu.Item
            name="çıkış yap"
            active={activeItem === "çıkış yap"}
            onClick={this.handleItemClick}
            position="right"
          >
            Çıkış Yap
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
