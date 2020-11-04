import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { color } from "./Constants";

export class Navbar extends Component {
  state = { activeItem: "all restaurants" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu color={color} pointing secondary>
          <Link to="/">
            <Menu.Item
              name="all restaurants"
              active={activeItem === "all restaurants"}
              onClick={this.handleItemClick}
              as="div"
            />
          </Link>

          <Menu.Item
            name="my reservations"
            active={activeItem === "my reservations"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="favourites"
            active={activeItem === "favourites"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
            position="right"
          />
        </Menu>
      </div>
    );
  }
}

export default Navbar;
