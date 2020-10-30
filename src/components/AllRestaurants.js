import React, { Component } from "react";
import { Card, Icon, Loader } from "semantic-ui-react";
import { color, getRestaurantUrl } from "./Constants";
import axios from "axios";

export class AllRestaurants extends Component {
  state = {
    restaurants: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get(getRestaurantUrl).then(
        (response) => {
          console.log("Response:", response);
          this.setState({
            restaurants: response.data,
            loading: false,
          });
        },
        (error) => {
          this.setState({
            loading: false,
          });
        }
      );
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

  renderNotFound = () => {
    if (this.state.restaurants.length === 0 && !this.state.loading) {
      return (
        <h3 style={{ marginTop: "10%", paddingRight: "20%" }}>
          No restaurants to display!
        </h3>
      );
    } else if (this.state.loading) {
      return <Loader style={{ marginTop: "10%" }} active />;
    } else {
      return <p></p>;
    }
  };

  render() {
    return (
      <>
        <Card.Group stackable>{this.renderCards()}</Card.Group>
        {this.renderNotFound()}
      </>
    );
  }
}
export default AllRestaurants;
