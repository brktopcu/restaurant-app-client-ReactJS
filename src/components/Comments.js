import React, { Component } from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Comment,
  Form,
  Rating,
  Modal,
} from "semantic-ui-react";
import axios from "axios";
import { color, getAllCommentsUrl, postCommentUrl } from "./Constants";

export class Comments extends Component {
  state = {
    comments: [],
    loading: false,
    notFound: false,
    commentText: "",
    commentScore: 0,
    ratingModalOpen: false,
  };

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
            <Comment key={comment.commentId}>
              <Comment.Avatar as="a" src="/user-thumbnail.png" />
              <Comment.Content>
                <Comment.Author>Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.commentDate}</div>
                  <div>
                    <Rating
                      style={{ marginLeft: "10px" }}
                      size="mini"
                      icon="star"
                      defaultRating={comment.commentScore}
                      maxRating={5}
                      disabled
                    />
                  </div>
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

  renderNoRatingModal = () => {
    let text = "";

    if (this.state.commentScore === 0) text = "Lütfen puan verin.";
    if (this.state.commentText.length === 0) text = "Lütfen bir yorum yazın.";

    return (
      <Modal
        closeIcon
        onClose={() => this.setState({ ratingModalOpen: false })}
        onOpen={() => this.setState({ ratingModalOpen: true })}
        open={this.state.ratingModalOpen}
        size="tiny"
      >
        <Modal.Header>Uyarı</Modal.Header>
        <Modal.Content>
          <p>{text}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => this.setState({ ratingModalOpen: false })}
          >
            Tamam
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  handleTextAreaChange = (event, data) => {
    this.setState({
      commentText: data.value,
    });
  };

  handleCommentFormSubmit = () => {
    if (this.state.commentScore === 0 || this.state.commentText.length === 0) {
      this.setState({ ratingModalOpen: true });
    } else {
      axios
        .post(postCommentUrl + this.props.restaurantId, {
          commentText: this.state.commentText,
          commentScore: this.state.commentScore,
        })
        .then((response) => {
          this.setState({
            comments: [...this.state.comments, response.data],
            commentText: "",
            commentScore: 0,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleCommentRate = (event, data) => {
    this.setState({
      commentScore: data.rating,
    });
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
            <Rating
              style={{ marginTop: "30px" }}
              icon="star"
              size="massive"
              maxRating={5}
              rating={this.state.commentScore}
              onRate={this.handleCommentRate}
            />
            <Form reply onSubmit={this.handleCommentFormSubmit}>
              <Form.TextArea
                value={this.state.commentText}
                onChange={this.handleTextAreaChange}
              />
              <Button
                type="submit"
                content="Yorum Yap"
                labelPosition="right"
                icon="edit"
                color={color}
              />
            </Form>
          </Comment.Group>
          {this.renderNoRatingModal()}
        </Grid.Row>
      </Segment>
    );
  }
}

export default Comments;
