import React, { Component } from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Comment,
  Form,
} from "semantic-ui-react";
import axios from "axios";
import { color, getAllCommentsUrl } from "./Constants";

export class Comments extends Component {
  state = { comments: [], loading: false, notFound: false };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get(getAllCommentsUrl + this.props.restaurantId).then(
        (response) => {
          this.setState({
            comments: response.data,
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

  renderComments = () => {
    if (this.state.comments.length === 0) {
      return (
        <>
          <p>Bu restoran için henüz bir yorum yapılmamış.</p>
        </>
      );
    }
    return (
      <>
        {this.state.comments.map((comment) => {
          return (
            <Comment>
              <Comment.Avatar as="a" src="/user-thumbnail.png" />
              <Comment.Content>
                <Comment.Author>Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.commentDate}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{comment.commentText}</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          );
        })}
      </>
    );
  };

  render() {
    return (
      <Segment textAlign="left" basic>
        <Grid.Row>
          <Header as="h2" textAlign="left" style={{ marginBottom: "30px" }}>
            <Header.Content>Yorumlar</Header.Content>
          </Header>
        </Grid.Row>

        <Grid.Row>
          <Comment.Group>
            {this.renderComments()}
            <Form reply>
              <Form.TextArea />
              <Button
                type="submit"
                content="Yorum Yaz"
                labelPosition="right"
                icon="edit"
                color={color}
              />
            </Form>
          </Comment.Group>
        </Grid.Row>
      </Segment>
    );
  }
}

export default Comments;
