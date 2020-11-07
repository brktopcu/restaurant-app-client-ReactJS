import React, { Component } from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Comment,
  Form,
} from "semantic-ui-react";

export class Comments extends Component {
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
    );
  }
}

export default Comments;
