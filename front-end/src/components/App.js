
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
import { useState , useEffect} from 'react';
import './App.scss';

export default function App(props) {


  const [islogin, setisLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem('userData')));

  //console.log('before useEffect', currentUser)

  useEffect(() => {
      axios.get('http://localhost:8001/api/cookies', {withCredentials:true}).then((res) => 
      { 
        
        return setCurrentUser(res.data)        
      })
    },[islogin])
    
//console.log('after useEffect', currentUser)
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/login'>
            <Login 
            islogin ={islogin}
            setisLogin = {setisLogin} />
          </Route>
          <Route path='/register'>
            <Register islogin={islogin} setisLogin={setisLogin} />
          </Route> 
          <Route exact path='/events' > 
           <EventsIndex  
            currentUser = {currentUser}/> 
          </Route>
          <Route exact path='/owners/events/new' >
            <CreateEvent currentUser={currentUser}/>
          </Route>
          <Route exact path='/messages' >
          <Message />
          </Route>
          {/* <Route exact path='/test' >
          <Test />
        </Route> */}
          
        <Route exact path='/my-events/:screen' > 
          < MyEventsIndex currentUser = {currentUser}/>
        </Route > 
        
          <Route exact path='/events/:eventId' render={(props) => <EventId eventId={props.match.params.eventId} user={currentUser}/>} /> 

          <Route exact path='/owners/events/:eventId/edit' render= {(props) => <EditEvent 
          eventId={props.match.params.eventId}
          currentUser = {currentUser}
          />} />
        </Switch>
      </Router>
    </div>
  );
}
