import "./App.css";
import Navbar from "./components/Navbar";
import AllRestaurants from "./components/AllRestaurants";
import RestaurantDetails from "./components/RestaurantDetails";
import MyReservations from "./components/MyReservations";
import { Container, Grid } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import LandingPage from "./components/LandingPage";
import Favourites from "./components/Favourites";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Switch>
                  <Route path="/" exact />
                  <Route path="/allRestaurants" component={Navbar} />
                  <Route path="/restaurant/:restaurantId" component={Navbar} />
                  <Route path="/myreservations" component={Navbar} />
                  <Route path="/favourites" component={Navbar} />
                </Switch>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <Switch>
                  <Route path="/" component={LandingPage} exact />
                  <Route path="/allRestaurants" component={AllRestaurants} />
                  <Route
                    path="/restaurant/:restaurantId"
                    component={RestaurantDetails}
                  />
                  <Route path="/myreservations" component={MyReservations} />
                  <Route path="/favourites" component={Favourites} />
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
