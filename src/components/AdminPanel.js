import axios from "axios";
import React, { Component } from "react";
import {
  Grid,
  Item,
  Button,
  Label,
  Modal,
  Step,
  Form,
} from "semantic-ui-react";
import {
  getRestaurantUrl,
  newRestaurantUrl,
  saveMultipleTablesUrl,
  saveRestaurantThumbnail,
} from "./Constants";

export class AdminPanel extends Component {
  state = {
    loading: false,
    restaurants: [],
    addRestaurantModalOpen: false,
    step: 1,
    savedRestaurant: {},
    steps: [
      {
        key: "Restoran Bilgileri",
        title: "Restoran Bilgileri",
        active: true,
      },
      {
        key: "Masa Bilgileri",
        title: "Masa Bilgileri",
        active: false,
      },
      { key: "Restoran Resmi", title: "Restoran Resmi", active: false },
    ],
    restaurantName: "",
    restaurantCity: "",
    restaurantAddress: "",
    restaurantCategory: "",
    restaurantPhone: "",
    tableCount: 0,
    tableCapacity: 0,
    imageFile: null,
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get(getRestaurantUrl).then(
        (response) => {
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

  renderRestaurants = () => {
    return (
      <>
        {this.state.restaurants.map((restaurant) => (
          <Item key={restaurant.restaurantId}>
            <Item.Image
              src={
                restaurant.thumbnail
                  ? `data:image/jpeg;base64,${restaurant.thumbnail}`
                  : "no-image.jpg"
              }
            />

            <Item.Content>
              <Item.Header>{restaurant.restaurantName}</Item.Header>
              <Item.Meta>
                <span className="cinema">{restaurant.restaurantCategory}</span>
              </Item.Meta>
              <Item.Description>
                {restaurant.restaurantAddress}
              </Item.Description>
              <Item.Extra>
                <Button color="red" floated="right">
                  Restoranı Sil
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </>
    );
  };

  renderRestaurantForm = () => {
    if (this.state.step === 1) {
      return (
        <Form>
          <Form.Field>
            <label>Restoran Adı</label>
            <input
              value={this.state.restaurantName}
              onChange={(e) =>
                this.setState({ restaurantName: e.target.value })
              }
              placeholder="Restoran Adı"
            />
          </Form.Field>
          <Form.Field>
            <label>Şehir</label>
            <input
              value={this.state.restaurantCity}
              onChange={(e) =>
                this.setState({ restaurantCity: e.target.value })
              }
              placeholder="Şehir"
            />
          </Form.Field>
          <Form.Field>
            <label>Tam Adres</label>
            <input
              value={this.state.restaurantAddress}
              onChange={(e) =>
                this.setState({ restaurantAddress: e.target.value })
              }
              placeholder="Tam Adres"
            />
          </Form.Field>
          <Form.Field>
            <label>Kategori</label>
            <input
              value={this.state.restaurantCategory}
              onChange={(e) =>
                this.setState({ restaurantCategory: e.target.value })
              }
              placeholder="Kategori"
            />
          </Form.Field>
          <Form.Field>
            <label>Telefon No</label>
            <input
              value={this.state.restaurantPhone}
              onChange={(e) =>
                this.setState({ restaurantPhone: e.target.value })
              }
              placeholder="Telefon No"
            />
          </Form.Field>

          <Button
            type="submit"
            onClick={() => {
              axios
                .post(newRestaurantUrl, {
                  restaurantName: this.state.restaurantName,
                  restaurantCity: this.state.restaurantCity,
                  restaurantAddress: this.state.restaurantAddress,
                  restaurantCategory: this.state.restaurantCategory,
                  phoneNumber: this.state.restaurantPhone,
                })
                .then((response) =>
                  this.setState({ step: 2, savedRestaurant: response.data })
                )
                .catch((error) => console.log(error));
            }}
          >
            Restoranı Oluştur
          </Button>
        </Form>
      );
    }
  };

  renderTableForm = () => {
    if (this.state.step === 2) {
      return (
        <Form>
          <Form.Field>
            <label>Masa Sayısı</label>
            <input
              value={this.state.tableCount}
              onChange={(e) => this.setState({ tableCount: e.target.value })}
              placeholder="Masa Sayısı"
            />
          </Form.Field>
          <Form.Field>
            <label>Masa Kapasitesi</label>
            <input
              value={this.state.tableCapacity}
              onChange={(e) => this.setState({ tableCapacity: e.target.value })}
              placeholder="Masa Kapasitesi"
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={() => {
              axios
                .post(
                  saveMultipleTablesUrl +
                    this.state.tableCount +
                    "/" +
                    this.state.tableCapacity +
                    "/" +
                    this.state.savedRestaurant.restaurantId
                )
                .then(() => this.setState({ step: 3 }))
                .catch((error) => console.log(error));
            }}
          >
            Masaları Ekle
          </Button>
        </Form>
      );
    }
  };

  renderThumbnailForm = () => {
    const data = new FormData();
    data.append("imageFile", this.state.imageFile);

    if (this.state.step === 3) {
      return (
        <Form encType="multipart/form-data">
          <Form.Field>
            <label>Fotoğraf</label>
            <input
              name="imageFile"
              onChange={(e) => this.setState({ imageFile: e.target.files[0] })}
              type="file"
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={() => {
              axios
                .post(
                  saveRestaurantThumbnail +
                    this.state.savedRestaurant.restaurantId,
                  data
                )
                .then(() =>
                  this.setState({ addRestaurantModalOpen: false, step: 1 })
                )
                .catch((error) => console.log(error));
            }}
          >
            Ekle
          </Button>
        </Form>
      );
    }
  };

  renderAddRestaurantModal = () => {
    let steps = this.state.steps;
    if (this.state.step === 1) {
      steps[0].active = true;
      steps[1].active = false;
      steps[2].active = false;
    } else if (this.state.step === 2) {
      steps[0].active = false;
      steps[1].active = true;
      steps[2].active = false;
    } else if (this.state.step === 3) {
      steps[0].active = false;
      steps[1].active = false;
      steps[2].active = true;
    }

    return (
      <Modal
        onClose={() =>
          this.setState({ addRestaurantModalOpen: false, step: 1 })
        }
        open={this.state.addRestaurantModalOpen}
      >
        <Modal.Header>
          <Step.Group items={steps} />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.renderRestaurantForm()}
            {this.renderTableForm()}
            {this.renderThumbnailForm()}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Yep, that's me" labelPosition="right" positive />
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Item.Group divided>{this.renderRestaurants()}</Item.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Label
              as="a"
              color="green"
              size="large"
              content="Yeni Restoran Ekle"
              icon="plus"
              onClick={() => this.setState({ addRestaurantModalOpen: true })}
            />
          </Grid.Column>
          {this.renderAddRestaurantModal()}
        </Grid.Row>
      </Grid>
    );
  }
}

export default AdminPanel;
