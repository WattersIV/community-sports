import './App.scss';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './Login/LoginForm'
import EventId from './EventId/eventId'
import Register from './Register/RegisterForm'
import EventsIndex from './Events/EventsIndex';
import MyEventsIndex from './MyEvents/MyEventsIndex';
import Message from './Message/Message';
// import Test from './Test/Test';
import Main from './Main/Main';
import EditEvent from './Events/EditEvent'
import CreateEvent from './Events/CreateEvent'
import { useState, useEffect } from 'react';
import './App.scss';

export default function App(props) {
  const [islogin, setisLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState({})//JSON.parse(window.localStorage.getItem('userData')));

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:8001/api/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setisLogin(true) : setisLogin(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  //console.log('after useEffect', currentUser)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/login'
            render={props =>
              !islogin ? (
                <Login
                  {...props}
                  islogin={islogin}
                  setisLogin={setisLogin}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser} />
              ) : (
                  <Redirect to="/events" />
                )}
          />
          <Route path='/register'>
            <Register islogin={islogin} setisLogin={setisLogin} />
          </Route>
          <Route exact path='/events' >
            <EventsIndex
              currentUser={currentUser} />
          </Route>
          <Route exact path='/owners/events/new' >
            <CreateEvent currentUser={currentUser} />
          </Route>
          <Route exact path='/messages' >
            <Message />
          </Route>
          {/* <Route exact path='/test' >
          <Test />
        </Route> */}

          <Route exact path='/my-events/:screen' >
            < MyEventsIndex currentUser={currentUser} />
          </Route >

          <Route exact path='/events/:eventId' render={(props) => <EventId eventId={props.match.params.eventId} user={currentUser} />} />

          <Route exact path='/owners/events/:eventId/edit' render={(props) => <EditEvent
            eventId={props.match.params.eventId}
            currentUser={currentUser}
          />} />
        </Switch>
      </Router>
    </div>
  );
}
