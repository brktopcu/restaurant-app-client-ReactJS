import React, { Component } from "react";
import { Form } from "semantic-ui-react";

export class Reservation extends Component {
  state = {
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
    formResult: {
      reservationDate: "",
      reservationPeriod: "",
      guestCount: "",
      rtableId: "",
    },
  };
  render() {
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Ad" placeholder="Adınızı girin" />
            <Form.Input fluid label="Soyad" placeholder="Soyadınızı girin" />
            <Form.Select
              fluid
              label="Kişi sayısı"
              options={this.state.guestCountOptions}
              placeholder="Kişi sayısını girin"
            />
            <Form.Select
              fluid
              label="Masa numarası"
              options={this.state.guestCountOptions}
              placeholder="Masa numarasını seçin"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Tarih"
              type="date"
              value={this.state.reservationDate}
              onChange={(event) => {
                this.setState({ reservationDate: event.target.value });
              }}
            />
            <Form.Select
              fluid
              label="Saat Aralığı"
              options={this.state.guestCountOptions}
              placeholder="Kişi sayısını girin"
            />
          </Form.Group>
          <Form.TextArea
            label="Notunuz"
            placeholder="Eklemek istediğiniz bir şey varsa lütfen bu alana girin."
          />

          <Form.Button>Gönder</Form.Button>
        </Form>
      </div>
    );
  }
}

export default Reservation;
