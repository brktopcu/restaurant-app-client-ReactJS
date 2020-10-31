import React, { Component } from "react";
import {
  Card,
  Grid,
  Icon,
  Loader,
  Form,
  FormField,
  Input,
} from "semantic-ui-react";
import { color, getRestaurantUrl } from "./Constants";
import axios from "axios";
import SubMenu from "./SubMenu";

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
    }
  };

  renderSearchForm = () => {
    return (
      <Form
        style={{ width: "85%" }}
        onSubmit={() => {
          console.log("Hello from search form!");
        }}
      >
        <FormField>
          <Input
            placeholder="Search..."
            action={{
              icon: "search",
              className: "searchIconButton",
            }}
          />
        </FormField>
      </Form>
    );
  };

  render() {
    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Grid.Row>{this.renderSearchForm()}</Grid.Row>
              <SubMenu />
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
