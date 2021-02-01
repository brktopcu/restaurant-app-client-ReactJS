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
import { getAllPicturesUrl, getRestaurantByIdUrl } from "./Constants";
import Comments from "./Comments";
import Reservation from "./Reservation";

export class RestaurantDetails extends Component {
  state = {
    selectedRestaurant: {},
    loading: false,
    notFound: false,
    reservationModalOpen: false,
    pictures: [],
    picturesModalOpen: false,
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
            axios
              .get(
                getAllPicturesUrl + this.state.selectedRestaurant.restaurantId
              )
              .then((response) => this.setState({ pictures: response.data }))
              .catch((error) => console.log(error));
          },
          (error) => {
            this.setState({ loading: false, notFound: true });
          }
        );
    });
  }

  renderPicturesModal = () => {
    if (this.state.pictures.length > 0) {
      return (
        <Modal
          basic
          onClose={() => this.setState({ picturesModalOpen: false })}
          open={this.state.picturesModalOpen}
          size="small"
        >
          <Modal.Content>
            {this.state.pictures.map((picture) => (
              <>
                <Image src={`data:image/jpeg;base64,${picture}`} />
                <Divider />
              </>
            ))}
          </Modal.Content>
        </Modal>
      );
    }
  };

  render() {
    return (
      <div>
        <Segment raised>
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="10">
                <Image
                  src={
                    this.state.pictures[0]
                      ? `data:image/jpeg;base64,${this.state.pictures[0]}`
                      : "/no-image.jpg"
                  }
                />
              </Grid.Column>

              <Grid.Column width="6">
                <Image
                  src={
                    this.state.pictures[1]
                      ? `data:image/jpeg;base64,${this.state.pictures[1]}`
                      : "/no-image.jpg"
                  }
                />
                <br />
                <Image
                  src={
                    this.state.pictures[2]
                      ? `data:image/jpeg;base64,${this.state.pictures[2]}`
                      : "/no-image.jpg"
                  }
                />
                <Label
                  color="red"
                  attached="bottom right"
                  as="a"
                  onClick={() => {
                    this.setState({ picturesModalOpen: true });
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
                primary
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
        {this.renderPicturesModal()}
      </div>
    );
  }
}

export default withRouter(RestaurantDetails);
