import "./App.css";
import Navbar from "./components/Navbar";
import { Container, Grid } from "semantic-ui-react";
import AllRestaurants from "./components/AllRestaurants";
import { Switch, Route } from "react-router-dom";

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
              <Switch>
                <Route path="/" component={AllRestaurants} exact />
                <Route path="/about" component={Navbar} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
