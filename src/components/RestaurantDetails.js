import React, { Component } from "react";
import { withRouter } from "react-router";

export class RestaurantDetails extends Component {
  render() {
    return <div>{this.props.match.params.restaurantId}</div>;
  }
}

export default withRouter(RestaurantDetails);
