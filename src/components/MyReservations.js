import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { deleteReservationUrl, getUserReservationsUrl } from "./Constants";
import { Button, Card, Icon, Message, Loader } from "semantic-ui-react";

export class MyReservations extends Component {
  state = {
    reservations: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      axios
        .get(getUserReservationsUrl + this.props.userDetails.user.id)
        .then((response) => {
          this.setState({ reservations: response.data, isLoading: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
        });
    });
  }

  deleteReservation = (event, data) => {
    axios.delete(deleteReservationUrl + data.reservationid).then(() => {
      let filteredReservations = [];
      filteredReservations = this.state.reservations.filter((reservation) => {
        return reservation.reservationId !== data.reservationid;
      });
      this.setState({ reservations: filteredReservations });
    });
  };

  renderReservationCards = (reservation) => {
    return (
      <Card key={reservation.reservationId}>
        <Card.Content>
          <Card.Header>{reservation.restaurantName}</Card.Header>
          <Card.Meta>{this.props.userDetails.user.fullName}</Card.Meta>
          <Card.Description>
            <strong>Ad Soyad:</strong> {reservation.reservationName}{" "}
            {reservation.reservationLastName}
          </Card.Description>
          <Card.Description>
            <strong>Rezervasyon Tarihi:</strong> {reservation.reservationDate}
          </Card.Description>
          <Card.Description>
            <strong>Masa:</strong> {reservation.reservationTable}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            onClick={this.deleteReservation}
            basic
            color="red"
            reservationid={reservation.reservationId}
          >
            İptal Et
          </Button>
        </Card.Content>
      </Card>
    );
  };

  renderNoReservation = () => {
    if (this.state.reservations.length === 0 && !this.state.isLoading) {
      return (
        <Message style={{ marginLeft: "5%", width: "50%" }} warning icon>
          <Icon name="address card" />
          <p>Rezervasyonunuz bulunmamaktadır.</p>
        </Message>
      );
    } else if (this.state.isLoading) {
      return <Loader style={{ marginTop: "10%" }} active />;
    }
  };

  render() {
    return (
      <div>
        <Card.Group>
          {this.state.reservations.map((reservation) => {
            return this.renderReservationCards(reservation);
          })}
          {this.renderNoReservation()}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(MyReservations);
