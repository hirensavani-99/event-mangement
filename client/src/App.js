import { CssBaseline } from '@material-ui/core';
import {

  Switch,
  Route
} from "react-router-dom";

import classes from './App.module.css'

import HomePage from './Components/HomePage/HomePage';
import LandingPage from './Components/LandingPage/LandingPage';
import SignInPage from './Components/SignInPage/SignInPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import EventPage from './Components/EventPage/EventPage';
import RegisterYourEvent from './Components/RegisterYourEvent/RegisterYourEvent';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import  { EventDataProvider } from './store/event-Context'

function App() {
  return (

    <div className={classes.root}>
      <CssBaseline />
      <Switch>

        <Route path="/Signin">
          <SignInPage />
        </Route>
        <Route path="/SignUp">
          <SignUpPage />
        </Route>
        <Route path="/contactUs">
          <HomePage />
        </Route>
        <Route path="/payment">
          <PaymentPage />
        </Route>
        <Route path='/event_near_you'>
          <EventPage />
        </Route>
        <Route path="/Register_your_event_Now">
          <EventDataProvider>
            <RegisterYourEvent />
          </EventDataProvider>
        </Route>

        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>



    </div>

  );
}

export default App;
