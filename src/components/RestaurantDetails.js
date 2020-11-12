import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Image,
  Grid,
  Segment,
  Label,
  Header,
  Rating,
  Button,
  Divider,
  Modal,
} from "semantic-ui-react";
import axios from "axios";
import { color, getRestaurantByIdUrl } from "./Constants";
import Comments from "./Comments";
import Reservation from "./Reservation";

export class RestaurantDetails extends Component {
  state = {
    selectedRestaurant: {},
    loading: false,
    notFound: false,
    reservationModalOpen: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios
        .get(getRestaurantByIdUrl + this.props.match.params.restaurantId)
        .then(
          (response) => {
            this.setState({
              selectedRestaurant: response.data,
              loading: false,
              notFound: false,
            });
          },
          (error) => {
            this.setState({ loading: false, notFound: true });
          }
        );
    });
  }

  render() {
    return (
      <div>
        <Segment raised>
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="10">
                <Image src="/no-image.jpg" />
              </Grid.Column>

              <Grid.Column width="6">
                <Image src="/no-image.jpg" />
                <br />
                <Image src="/no-image.jpg" />
                <Label
                  color="red"
                  attached="bottom right"
                  as="a"
                  onClick={() => {
                    console.log("Label clicked.");
                  }}
                >
                  Diğer fotoğrafları görüntüle...
                </Label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment basic textAlign="left">
          <Grid>
            <Grid.Row>
              <Grid.Column width="4">
                <Header as="h2" textAlign="left">
                  <Header.Content>
                    {this.state.selectedRestaurant.restaurantName}
                  </Header.Content>
                  <Header.Subheader>
                    {this.state.selectedRestaurant.restaurantCity}
                  </Header.Subheader>
                  <Header.Subheader>
                    {this.state.selectedRestaurant.restaurantAddress}
                  </Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width="12">
                <Rating
                  icon="star"
                  rating={this.state.selectedRestaurant.restaurantRating}
                  maxRating={5}
                  disabled
                />
                <span style={{ marginLeft: "10px" }}>
                  ({this.state.selectedRestaurant.restaurantRating})
                </span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button
                style={{ marginLeft: "10px" }}
                color={color}
                onClick={() => {
                  this.setState({ reservationModalOpen: true });
                }}
              >
                Rezervasyon Yap...
              </Button>
              <Modal
                closeIcon
                onClose={() => this.setState({ reservationModalOpen: false })}
                onOpen={() => this.setState({ reservationModalOpen: true })}
                open={this.state.reservationModalOpen}
                size="large"
              >
                <Modal.Header>Rezervasyon Yap</Modal.Header>
                <Modal.Content>
                  <Reservation restaurant={this.state.selectedRestaurant} />
                </Modal.Content>
              </Modal>
            </Grid.Row>
          </Grid>
        </Segment>

        <Divider />

        <Comments restaurantId={this.props.match.params.restaurantId} />
      </div>
    );
  }
}

export default withRouter(RestaurantDetails);
