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
  Comment,
  Form,
} from "semantic-ui-react";
import axios from "axios";
import { color, getRestaurantByIdUrl } from "./Constants";

export class RestaurantDetails extends Component {
  state = {
    selectedRestaurant: {},
    loading: false,
    notFound: false,
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
                  See other photos...
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
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button style={{ marginLeft: "10px" }} color={color}>
                Make Reservation
              </Button>
            </Grid.Row>
          </Grid>
        </Segment>

        <Divider />

        <Segment textAlign="left" basic>
          <Grid.Row>
            <Header as="h2" textAlign="left" style={{ marginBottom: "30px" }}>
              <Header.Content>Comments</Header.Content>
            </Header>
          </Grid.Row>

          <Grid.Row>
            <Comment.Group>
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://randomuser.me/api/portraits/thumb/men/77.jpg"
                />
                <Comment.Content>
                  <Comment.Author>Joe Henderson</Comment.Author>
                  <Comment.Metadata>
                    <div>1 day ago</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <p>
                      The hours, minutes and seconds stand as visible reminders
                      that your effort put them all there.
                    </p>
                    <p>
                      Preserve until your next run, when the watch lets you see
                      how Impermanent your efforts are.
                    </p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                />
                <Comment.Content>
                  <Comment.Author>Christian Rocha</Comment.Author>
                  <Comment.Metadata>
                    <div>2 days ago</div>
                  </Comment.Metadata>
                  <Comment.Text>I re-tweeted this.</Comment.Text>
                </Comment.Content>
              </Comment>

              <Form reply>
                <Form.TextArea />
                <Button
                  content="Add Comment"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            </Comment.Group>
          </Grid.Row>
        </Segment>
      </div>
    );
  }
}

export default withRouter(RestaurantDetails);
