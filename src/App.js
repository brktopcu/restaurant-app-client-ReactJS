import "./App.css";
import Navbar from "./components/Navbar";
import { Container, Grid } from "semantic-ui-react";
import AllRestaurants from "./components/AllRestaurants";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Navbar />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <AllRestaurants />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
