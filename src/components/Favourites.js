import React, { Component } from "react";
import axios from "axios";
import { getFavouriteRestaurantsUrl } from "./Constants";
import { Card, Icon, Rating, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { color } from "./Constants";

export class Favourites extends Component {
  state = {
    favouriteRestaurants: [],
  };

  componentDidMount() {
    axios
      .get(getFavouriteRestaurantsUrl)
      .then((response) =>
        this.setState({ favouriteRestaurants: response.data })
      )
      .catch((error) => console.log(error));
  }

  renderNoFavouriteMsg = () => {
    if (this.state.favouriteRestaurants.length === 0) {
      return (
        <Message style={{ marginLeft: "5%", width: "50%" }} warning icon>
          <Icon name="heart" />
          <p>Favori restoranınız bulunmamaktadır.</p>
        </Message>
      );
    }
  };

  renderCards = () => {
    return (
      <>
        {this.state.favouriteRestaurants.map((restaurant) => (
          <div className="card" key={restaurant.restaurantId}>
            <Link to={`/restaurant/${restaurant.restaurantId}`}>
              <Card
                className="customCard"
                image="/no-image.jpg"
                header={restaurant.restaurantName}
                meta={restaurant.restaurantCategory}
                extra={
                  <div>
                    <Rating
                      icon="star"
                      defaultRating={restaurant.restaurantRating}
                      maxRating={5}
                      disabled
                    />
                    <span style={{ marginLeft: "10px" }}>
                      ({restaurant.restaurantRating})
                    </span>
                    <br></br>
                    <Icon name="globe" /> {restaurant.restaurantCity}
                  </div>
                }
                color={color}
              />
            </Link>
          </div>
        ))}
      </>
    );
  };

  render() {
    return (
      <div>
        <Card.Group stackable>
          {this.renderCards()}
          {this.renderNoFavouriteMsg()}
        </Card.Group>
      </div>
    );
  }
}

export default Favourites;
