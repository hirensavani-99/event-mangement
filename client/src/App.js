import { useContext } from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import classes from './App.module.css'

import HomePage from './Components/HomePage/HomePage';
import LandingPage from './Components/LandingPage/LandingPage';
import SignInPage from './Components/SignInPage/SignInPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import EventPage from './Components/EventPage/EventPage';
import RegisterYourEvent from './Components/RegisterYourEvent/RegisterYourEvent';
import Partner from './Components/Partner/Partner'
import LetUsManage from './Components/LetUsManage/LetUsManage';
import Conversation from './Components/Conversation/Conversation';

import { EventDataProvider } from './store/event-Context'
import AuthContex from './store/auth-context';


function App() {

  const authctx = useContext(AuthContex)

  const isLoggedIn = authctx.isLogedIn;

  return (

    <div className={classes.root}>
      <CssBaseline />
      <Switch>



        {!isLoggedIn && (<Route path="/Signin">
          {!isLoggedIn && <SignInPage />}
          {isLoggedIn && <Redirect to="/Home" />}
        </Route>)}

        {!isLoggedIn && (<Route path="/SignUp">
          {!isLoggedIn && <SignUpPage />}
          {isLoggedIn && <Redirect to="/Home" />}
        </Route>)}
        {isLoggedIn && (<Route path="/Home">
          {isLoggedIn && <HomePage />}
          {!isLoggedIn && <Redirect to="/Signin" />}
        </Route>)}
        {!isLoggedIn && (<Route path="/Partner">
          {!isLoggedIn && <EventDataProvider>
            <Partner />
          </EventDataProvider>}
          {isLoggedIn && <Redirect to="/Signin" />}
        </Route>)}

        {!isLoggedIn && (<Route path="/">
          <LandingPage />
        </Route>
        )}

        {isLoggedIn && (<Route path="/conversation">
          {isLoggedIn && <Conversation />}
          {!isLoggedIn && <Redirect to="/Signin" />}
        </Route>)}
        {isLoggedIn && (<Route path='/event_near_you'>
          {isLoggedIn && <EventPage />}
          {!isLoggedIn && <Redirect to="/Signin" />}
        </Route>)}
        {isLoggedIn && (<Route path='/Let_us_Manage_your_event'>
          {isLoggedIn && <LetUsManage />}
          {!isLoggedIn && <Redirect to="/Signin" />}
        </Route>)}
        {isLoggedIn && (<Route path="/Register_your_event_Now">
          {isLoggedIn && <EventDataProvider>
            <RegisterYourEvent />
          </EventDataProvider>}
          {!isLoggedIn && <Redirect to="/Signin" />}
        </Route>)}
        {isLoggedIn && (<Route path='*'>
          <Redirect to="/Home" />
        </Route>)}

        {!isLoggedIn && (<Route path='*'>
          <Redirect to="/Signin" />
        </Route>)}










      </Switch>

    </div>

  );
}

export default App;
