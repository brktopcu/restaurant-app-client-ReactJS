import axios from "axios";
import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import { getTablesUrl, postReservationUrl } from "./Constants";
import { Redirect } from "react-router-dom";

export class Reservation extends Component {
  state = {
    redirect: false,
    messageVisible: false,
    transitionVisible: true,
    guestCountOptions: [
      { key: "1", text: "1", value: "1" },
      { key: "2", text: "2", value: "2" },
      { key: "3", text: "3", value: "3" },
      { key: "4", text: "4", value: "4" },
      { key: "5", text: "5", value: "5" },
      { key: "6", text: "6", value: "6" },
      { key: "7", text: "7", value: "7" },
      { key: "8", text: "8", value: "8" },
    ],
    timePeriodOptions: [
      { key: "9:00-12:00", text: "9:00-12:00", value: "9:00-12:00" },
      { key: "12:00-16:00", text: "12:00-16:00", value: "12:00-16:00" },
      { key: "16:00-19:00", text: "16:00-19:00", value: "16:00-19:00" },
      { key: "19:00-...", text: "19:00-...", value: "19:00-..." },
    ],
    tableData: [],
    tableOptions: [],
    reservationName: "",
    reservationLastName: "",
    reservationDate: "",
    reservationPeriod: "",
    reservationNote: "",
    guestCount: "",
    rtableId: "",
  };

  componentDidMount() {
    let tableOptionsList = [];

    axios.get(getTablesUrl + this.props.restaurant.restaurantId).then(
      (response) => {
        this.setState({ tableData: response.data }, () => {
          this.state.tableData.map((table) => {
            return tableOptionsList.push({
              key: table.tableId,
              text: table.tableName,
              value: table.tableId,
            });
          });
        });
      },
      (error) => {
        console.log("Recieving table options data failed");
      }
    );

    this.setState({
      tableOptions: tableOptionsList,
    });
  }

  handleReservationFormSubmit = () => {
    axios
      .post(postReservationUrl + this.state.rtableId, {
        reservationName: this.state.reservationName,
        reservationLastName: this.state.reservationLastName,
        reservationDate: this.state.reservationDate,
        reservationPeriod: this.state.reservationPeriod,
        reservationNote: this.state.reservationNote,
        guestCount: this.state.guestCount,
      })
      .then((response) => {
        console.log("Reservation sent");
        this.setState({ messageVisible: true, redirect: true });
      })
      .catch((error) => console.log("Failed to send"));
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/myreservations" />;
    }
  };

  renderMessage = () => {
    if (this.state.messageVisible) {
      return (
        <Message
          success
          onDismiss={this.handleDismiss}
          header="Rezervasyon başarılı!"
          content="Rezervasyonunuz başarıyla gerçekleştirildi."
        />
      );
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleReservationFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Ad"
              placeholder="Adınızı girin"
              value={this.state.reservationName}
              onChange={(e) =>
                this.setState({ reservationName: e.target.value })
              }
            />
            <Form.Input
              fluid
              label="Soyad"
              placeholder="Soyadınızı girin"
              value={this.state.reservationLastName}
              onChange={(e) =>
                this.setState({ reservationLastName: e.target.value })
              }
            />
            <Form.Select
              fluid
              label="Kişi sayısı"
              options={this.state.guestCountOptions}
              placeholder="Kişi sayısını girin"
              value={this.state.guestCount}
              onChange={(e, data) => this.setState({ guestCount: data.value })}
            />
            <Form.Select
              fluid
              label="Masa numarası"
              options={this.state.tableOptions}
              placeholder="Masa numarasını seçin"
              value={this.state.rtableId}
              onChange={(e, data) => this.setState({ rtableId: data.value })}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Tarih"
              type="date"
              value={this.state.reservationDate}
              onChange={(event, data) => {
                this.setState({ reservationDate: data.value });
              }}
            />
            <Form.Select
              fluid
              label="Saat Aralığı"
              options={this.state.timePeriodOptions}
              placeholder="Saat aralığını girin"
              value={this.state.reservationPeriod}
              onChange={(event, data) => {
                this.setState({ reservationPeriod: data.value });
              }}
            />
          </Form.Group>
          <Form.TextArea
            label="Notunuz"
            placeholder="Eklemek istediğiniz bir şey varsa lütfen bu alana girin."
            value={this.state.reservationNote}
            onChange={(event, data) => {
              this.setState({ reservationNote: data.value });
            }}
          />

          <Form.Button type="submit">Gönder</Form.Button>
        </Form>
        {this.renderMessage()}
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Reservation;
