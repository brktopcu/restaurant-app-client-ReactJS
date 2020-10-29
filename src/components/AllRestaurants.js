import React, { Component } from "react";
import { Card, Icon } from "semantic-ui-react";
import { color, getRestaurantUrl } from "./Constants";
import axios from "axios";

export class AllRestaurants extends Component {
  state = {
    restaurants: [],
  };

  componentDidMount() {
    axios.get(getRestaurantUrl).then((response) => {
      console.log("Response:", response);
      this.setState({
        restaurants: response.data,
      });
    });
  }

  renderCards = () => {
    return (
      <>
        {this.state.restaurants.map((restaurant) => (
          <div className="card" key={restaurant.restaurantId}>
            <Card
              image="no-image.jpg"
              header={restaurant.restaurantName}
              meta={restaurant.restaurantCategory}
              extra={
                <p>
                  <Icon name="globe" /> {restaurant.restaurantCity}
                </p>
              }
              color={color}
            />
          </div>
        ))}
      </>
    );
  };

  render() {
    return (
      <>
        <Card.Group stackable>{this.renderCards()}</Card.Group>
      </>
    );
  }
}
export default AllRestaurants;
