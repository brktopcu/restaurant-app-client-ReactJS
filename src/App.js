import "./App.css";
import Navbar from "./components/Navbar";
import AllRestaurants from "./components/AllRestaurants";
import RestaurantDetails from "./components/RestaurantDetails";
import { Container, Grid } from "semantic-ui-react";
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
                <Route
                  path="/restaurant/:restaurantId"
                  component={RestaurantDetails}
                />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
