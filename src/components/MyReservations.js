import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getUserReservationsUrl } from "./Constants";
import { Button, Card } from "semantic-ui-react";

export class MyReservations extends Component {
  state = {
    reservations: [],
  };

  componentDidMount() {
    axios
      .get(getUserReservationsUrl + this.props.userDetails.user.id)
      .then((response) => {
        this.setState({ reservations: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderReservationCards = (reservation) => {
    return (
      <Card key={reservation.reservationId}>
        <Card.Content>
          <Card.Header>Restoran Adı</Card.Header>
          <Card.Meta>{this.props.userDetails.user.fullName}</Card.Meta>
          <Card.Description>
            <strong>Ad Soyad:</strong> {reservation.reservationName}{" "}
            {reservation.reservationLastName}
          </Card.Description>
          <Card.Description>
            <strong>Rezervasyon Tarihi:</strong> {reservation.reservationDate}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="red">
            İptal Et
          </Button>
        </Card.Content>
      </Card>
    );
  };

  render() {
    return (
      <div>
        <Card.Group>
          {this.state.reservations.map((reservation) => {
            return this.renderReservationCards(reservation);
          })}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(MyReservations);
