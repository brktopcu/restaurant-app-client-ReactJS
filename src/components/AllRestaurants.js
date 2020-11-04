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
    } else if (this.state.cityFilter.length !== 0) {
      restaurantsShown = this.state.restaurants.filter((item) => {
        return this.state.cityFilter.includes(item.restaurantCity);
      });
    } else if (this.state.categoryFilter.length !== 0) {
      restaurantsShown = this.state.restaurants.filter((item) => {
        return this.state.categoryFilter.includes(item.restaurantCategory);
      });
    } else if (
      this.state.searchResults.length === 0 &&
      this.state.searchTerm === ""
    ) {
      restaurantsShown = this.state.restaurants;
    }

    return (
      <>
        {restaurantsShown.map((restaurant) => (
          <div className="card" key={restaurant.restaurantId}>
            <Link to={`/restaurant/${restaurant.restaurantId}`}>
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
            placeholder="Search..."
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
        <Menu.Item header>Filters</Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid
            clearable
            multiple
            placeholder="Select a city"
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
            placeholder="Select cuisine"
            options={this.state.categoryOptions}
            selection
            onChange={this.handleCategoryFilterChange}
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
