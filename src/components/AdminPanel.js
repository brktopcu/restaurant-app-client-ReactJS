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
import { getRestaurantUrl } from "./Constants";

export class AdminPanel extends Component {
  state = {
    loading: false,
    restaurants: [],
    addRestaurantModalOpen: false,
    step: 1,
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
            <input placeholder="Restoran Adı" />
          </Form.Field>
          <Form.Field>
            <label>Şehir</label>
            <input placeholder="Şehir" />
          </Form.Field>
          <Form.Field>
            <label>Tam Adres</label>
            <input placeholder="Tam Adres" />
          </Form.Field>
          <Form.Field>
            <label>Kategori</label>
            <input placeholder="Kategori" />
          </Form.Field>
          <Form.Field>
            <label>Telefon No</label>
            <input placeholder="Telefon No" />
          </Form.Field>

          <Button type="submit" onClick={() => this.setState({ step: 2 })}>
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
            <input placeholder="Masa Sayısı" />
          </Form.Field>
          <Form.Field>
            <label>Masa Kapasitesi</label>
            <input placeholder="Masa Kapasitesi" />
          </Form.Field>
          <Button type="submit" onClick={() => this.setState({ step: 3 })}>
            Masaları Ekle
          </Button>
        </Form>
      );
    }
  };

  renderThumbnailForm = () => {
    if (this.state.step === 3) {
      return (
        <Form encType="multipart/form-data">
          <Form.Field>
            <label>Fotoğraf</label>
            <input name="imageFile" type="file" />
          </Form.Field>
          <Button
            type="submit"
            onClick={() =>
              this.setState({ addRestaurantModalOpen: false, step: 1 })
            }
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
