import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Item } from "semantic-ui-react";

export class Profile extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              <Item.Group>
                <Item>
                  <Item.Image size="medium" src="user-thumbnail.png" />

                  <Item.Content>
                    <Item.Header as="a">
                      {this.props.userDetails.user.fullName}
                    </Item.Header>
                    <Item.Meta>
                      {this.props.userDetails.user.username}
                    </Item.Meta>

                    <Item.Extra>
                      <Button negative>Şifre Değiştir</Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
        </Grid>
        <h1>{this.props.userDetails.user.id}</h1>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(Profile);
