import "./App.css";
import Navbar from "./Navbar";
import { Container, Grid } from "semantic-ui-react";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Navbar></Navbar>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <p>Hello!</p>
      </Container>
    </div>
  );
}

export default App;
