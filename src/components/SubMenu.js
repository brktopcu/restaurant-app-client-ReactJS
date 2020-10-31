import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
//import { color } from "./Constants";

export class SubMenu extends Component {
  render() {
    return (
      <Menu style={{ width: "105%" }} vertical>
        <Menu.Item>Home</Menu.Item>
        <Menu.Item>Filter</Menu.Item>
        <Menu.Item>SSS</Menu.Item>
      </Menu>
    );
  }
}

export default SubMenu;
