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
import jwt_decode from "jwt-decode";
import setJwtToken from "./securityUtils/setJwtToken";
import { setUserAction } from "./actions/setUserAction";
import { logoutAction } from "./actions/logoutAction";
import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJwtToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch(setUserAction(decodedToken));

  const currentTime = Date.now();
  const firstTenDigits = Number(currentTime.toString().substr(0, 10));

  if (decodedToken.exp < firstTenDigits) {
    store.dispatch(logoutAction());
    window.location.href = "/";
  }
}

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
                  <SecuredRoute
                    path="/allRestaurants"
                    component={AllRestaurants}
                  />
                  <SecuredRoute
                    path="/restaurant/:restaurantId"
                    component={RestaurantDetails}
                  />
                  <SecuredRoute
                    path="/myreservations"
                    component={MyReservations}
                  />
                  <SecuredRoute path="/favourites" component={Favourites} />
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
