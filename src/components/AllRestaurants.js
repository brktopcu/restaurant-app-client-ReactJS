import React, { Component } from "react";
import {
  Card,
  Grid,
  Icon,
  Loader,
  Form,
  FormField,
  Input,
  Menu,
  Dropdown,
  Rating,
} from "semantic-ui-react";
import {
  color,
  getRestaurantCategoriesUrl,
  getRestaurantCitiesUrl,
  getRestaurantUrl,
  getSearchRestaurantUrl,
} from "./Constants";
import axios from "axios";
import { Link } from "react-router-dom";

export class AllRestaurants extends Component {
  state = {
    restaurants: [],
    loading: false,
    searchTerm: "",
    searchResults: [],
    cityOptions: [],
    cityFilter: [],
    categoryOptions: [],
    categoryFilter: [],
    ratingFilter: 0,
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get(getRestaurantUrl).then(
        (response) => {
          console.log("Restaurants:", response);
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

    axios.get(getRestaurantCitiesUrl).then((response) => {
      console.log("Cities:", response);
      let cityOptions = response.data.map((city) => {
        return {
          key: city,
          text: city,
          value: city,
        };
      });
      console.log("cityOptions:", cityOptions);
      this.setState({
        cityOptions: cityOptions,
      });
    });

    axios.get(getRestaurantCategoriesUrl).then((response) => {
      console.log("Categories:", response);
      let categoryOptions = response.data.map((category) => {
        return {
          key: category,
          text: category,
          value: category,
        };
      });
      console.log("categoryOptions:", categoryOptions);
      this.setState({
        categoryOptions: categoryOptions,
      });
    });
  }

  renderCards = () => {
    let restaurantsShown = [];

    if (this.state.searchResults.length !== 0) {
      restaurantsShown = this.state.searchResults;
    } else if (
      this.state.cityFilter.length !== 0 &&
      this.state.categoryFilter.length === 0
    ) {
      restaurantsShown = this.state.restaurants.filter((item) => {
        return this.state.cityFilter.includes(item.restaurantCity);
      });
    } else if (
      this.state.categoryFilter.length !== 0 &&
      this.state.cityFilter.length === 0
    ) {
      restaurantsShown = this.state.restaurants.filter((item) => {
        return this.state.categoryFilter.includes(item.restaurantCategory);
      });
    } else if (
      this.state.categoryFilter.length !== 0 &&
      this.state.cityFilter.length !== 0
    ) {
      restaurantsShown = this.state.restaurants.filter((item) => {
        return (
          this.state.categoryFilter.includes(item.restaurantCategory) &&
          this.state.cityFilter.includes(item.restaurantCity)
        );
      });
    } else if (this.state.ratingFilter !== 0) {
      restaurantsShown = this.state.restaurants.filter((item) => {
        return this.state.ratingFilter <= item.restaurantRating;
      });
    } else {
      restaurantsShown = this.state.restaurants;
    }

    return (
      <>
        {restaurantsShown.map((restaurant) => (
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

  renderNotFound = () => {
    if (this.state.restaurants.length === 0 && !this.state.loading) {
      return (
        <h3 style={{ marginTop: "10%", paddingRight: "20%" }}>
          No restaurants to display!
        </h3>
      );
    } else if (this.state.loading) {
      return <Loader style={{ marginTop: "10%" }} active />;
    }
  };

  handleSearchInputChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
      searchResults: [],
    });
  };

  handleCityFilterChange = (event, data) => {
    console.log(data.value);
    this.setState({
      cityFilter: data.value,
    });
  };

  handleCategoryFilterChange = (event, data) => {
    console.log(data.value);
    this.setState({
      categoryFilter: data.value,
    });
  };

  handleRate = (event, data) => {
    console.log("Rating:", data.rating);
    this.setState({ ratingFilter: data.rating });
  };

  handleRatingInputChange = (e) => {
    this.setState({ ratingFilter: e.target.value / 10 });
  };

  renderSearchForm = () => {
    return (
      <Form
        style={{ width: "85%" }}
        onSubmit={() => {
          console.log("Hello from search form!");

          this.setState({ loading: true }, () => {
            axios.get(getSearchRestaurantUrl + this.state.searchTerm).then(
              (response) => {
                console.log("Response:", response);
                this.setState({
                  searchResults: response.data,
                  loading: false,
                });
              },
              (error) => {
                this.setState({
                  loading: false,
                  searchResults: [],
                });
              }
            );
          });
        }}
      >
        <FormField>
          <Input
            placeholder="Ara..."
            action={{
              icon: "search",
              className: "searchIconButton",
            }}
            value={this.state.searchTerm}
            onChange={this.handleSearchInputChange}
          />
        </FormField>
      </Form>
    );
  };

  renderSubMenu = () => {
    return (
      <Menu fluid style={{ width: "105%" }} vertical>
        <Menu.Item header>Filtrele</Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid
            clearable
            multiple
            placeholder="Bir şehir seçin"
            options={this.state.cityOptions}
            selection
            onChange={this.handleCityFilterChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid
            clearable
            multiple
            placeholder="Bir kategori seçin"
            options={this.state.categoryOptions}
            selection
            onChange={this.handleCategoryFilterChange}
          />
        </Menu.Item>
        <Menu.Item>
          <h5>En düşük puan: {this.state.ratingFilter}</h5>
          <input
            type="range"
            min={0}
            max={50}
            value={this.state.ratingFilter * 10}
            onChange={this.handleRatingInputChange}
          />
          <br />
          <Rating
            style={{ display: "flex", marginTop: "10px" }}
            icon="star"
            maxRating={5}
            rating={this.state.ratingFilter}
            onRate={this.handleRate}
            clearable
          />
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Grid.Row>{this.renderSearchForm()}</Grid.Row>
              {this.renderSubMenu()}
            </Grid.Column>
            <Grid.Column width={13}>
              <Card.Group stackable>{this.renderCards()}</Card.Group>
              {this.renderNotFound()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
export default AllRestaurants;
