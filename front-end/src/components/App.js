import './App.scss';
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
import Main from './Main/Main';
import EditEvent from './Events/EditEvent'
import CreateEvent from './Events/CreateEvent'
import { useState, useEffect } from 'react';
import './App.scss';

export default function App(props) {
  const [islogin, setisLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const checkAuthenticated = async () => {
    try {
      //Checking if token sent is valid
      const res = await fetch("http://localhost:8001/api/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();
      //Check if access is granted
      parseRes === true ? setisLogin(true) : setisLogin(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUser = async () => {
    try {
      //Getting users information with their credientials
      const response = await fetch("http://localhost:8001/api/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      })
      const parseData = await response.json()
      //Set user data in state
      setCurrentUser(parseData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    //Get and save jwt key first then get user info with it
    const authAndInfo = async () => {
      await checkAuthenticated();
      getUser()
    }
    authAndInfo()
  }, [islogin]);

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
                  setCurrentUser={setCurrentUser}
                />
              ) : (
                  <Redirect to={{
                    pathname: "/events",
                    state: { currentUser: currentUser }
                  }} />
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
