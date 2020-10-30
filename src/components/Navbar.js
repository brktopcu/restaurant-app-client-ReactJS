import React, { Component } from "react";
import { Menu, Input, Button, Icon } from "semantic-ui-react";
import { color } from "./Constants";

export class Navbar extends Component {
  state = { activeItem: "restaurants" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu color={color} pointing secondary>
          <Menu.Item
            name="restaurants"
            active={activeItem === "restaurants"}
            onClick={this.handleItemClick}
          />
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
          <Menu.Item position="right">
            <Input placeholder="Search..." />
            <Button icon color={color}>
              <Icon name="search" />
            </Button>
          </Menu.Item>
          <Menu.Menu>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
