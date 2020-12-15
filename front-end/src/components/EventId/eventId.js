import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from '../MapContainer/MapContainer'
import { GetPosition } from '../../hooks/usePosition'
import {  Nav, Navbar, Button,  Card} from 'react-bootstrap/';
import { Link,Redirect, useHistory } from 'react-router-dom'
import './eventId.scss';
import soccerIconwhite from './soccerIconwhite.png'
import Navigation from '../Navigation/Navigation'
import CommentBox from './CommentBox'
import logo from './logo.png'
require('dotenv').config()

export default function EventId(props) {
  const history = useHistory();
  const [position, setPosition] = useState([])
  const [team1, setTeam1] = useState({ goalies: [], strikers: [], midfielders: [], defenders: [] })
  const [event, setEvent] = useState({
    id: 0, owner_id: 0, date: '', start_time: '', end_time: '', additional_info: '', address: '', city: '', current_participants: 0, gender_restriction: '', location: '', max_participants: 0,
    province: '', referee: false, skill_level: '', title: ''
  })
  const [team2, setTeam2] = useState({ goalies: [], strikers: [], midfielders: [], defenders: [] })
  const [comments, setComments] = useState([{}])
  const [distance, setDistance] = useState({})
  const [comment, setComment] = useState()
  const [userJoined, setUserJoined] = useState(false)
  const [isLogout, setisLogout] = useState(false)
  const [isOwner, setisOwner] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const eventId = props.eventId

  const distanceApi = (coords, location) => {
    //Distance Matrix API
    const proxyurl = "https://limitless-headland-00064.herokuapp.com/";
    const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${coords[0]},${coords[1]}&destinations=${location.x}%2C${location.y}&key=${process.env.REACT_APP_geocodeKey}`
    const myInit = {
      method: 'GET',
      mode: 'no-cors',
    }
    fetch(proxyurl + URL)
      .then(response => response.text())
      .then(data => {
        return data ? JSON.parse(data) : {}
      })
      .then(data => {
        setDistance({ ...distance, distance: data.rows[0].elements[0].distance.text, time: data.rows[0].elements[0].duration.text })
      })
  }

  const eventData = () => {
    //URLS to query
    const eventInfo = `http://localhost:8001/api/events/${props.eventId}`
    const team = `http://localhost:8001/api/events/${props.eventId}/teams`
    const comment = `http://localhost:8001/api/events/${props.eventId}/comments`
    //Request to plug in to axios.all
    const eventRequest = axios.get(eventInfo)
    const teamRequest = axios.get(team)
    const commentRequest = axios.get(comment)
    //Making all 3 requests
    Promise.all([eventRequest, teamRequest, commentRequest])
    .then((responses) => {
      //Request data
      const eventData = responses[0]
      const teamData = responses[1]
      const commentData = responses[2]
      console.log(commentData)
        //Destructuring data from request
        const { id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants,
          province, referee, skill_level, title, first_name, last_name } = eventData.data[0]
        //Adding data to the setstate
        setEvent(prev => ({
          ...prev, id, owner_id, date, start_time, end_time, additional_info, address, city, current_participants, gender_restriction, location, max_participants,
          province, referee, skill_level, title, first_name, last_name
        }))

        //Sorting players by team
        const goalies1 = []
        const goalies2 = []
        const midfielders1 = []
        const midfielders2 = []
        const strikers1 = []
        const strikers2 = []
        const defenders1 = []
        const defenders2 = []
        for (const player of teamData.data) {
          if (player.team_number === 1) {
            if (player.position === 'Goalie') {
              goalies1.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Striker') {
              strikers1.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Defender') {
              defenders1.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Midfielder') {
              midfielders1.push(`${player.first_name} ${player.last_name}`)
            }
          } else {
            if (player.position === 'Goalie') {
              goalies2.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Striker') {
              strikers2.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Defender') {
              defenders2.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Midfielder') {
              midfielders2.push(`${player.first_name} ${player.last_name}`)
            }

          }
        }
        setTeam1(prev => ({ ...prev, goalies: goalies1, strikers: strikers1, defenders: defenders1, midfielders: midfielders1 }))
        setTeam2(prev => ({ ...prev, goalies: goalies2, strikers: strikers2, defenders: defenders2, midfielders: midfielders2 }))

        //Formatting Comments
        const commentFormatted = commentData.data.map((comment, index) => ({
          ...comment,
          fullName: `${comment.first_name} ${comment.last_name}`
        }))
        setComments(commentFormatted)

        //Request users position
        navigator.geolocation.getCurrentPosition(async success => {
          const pos = [
            success.coords.latitude,
            success.coords.longitude
          ];
          if (location) {
            //Set user position
            setPosition(pos)
            if (pos) {
              //Get distance from user to event
              distanceApi(pos, location)
            }
          }
          if (owner_id === props.user.id) {
            setisOwner(true)
          }
        })
        return eventData.data[0]
      })
  }

  useEffect(() => {
    eventData()
  }, [setComments])

  //function trigered by logout button
  const logout_validation = () => {
    try {
      localStorage.removeItem("token")
      setisLogout(true)
    } catch (err) {
      console.error(err.message)
    }
   };
   
  if (isLogout) {
    return <Redirect to="/" />
  }; 

  const deleteEvent = (id) => {
    axios.delete(`http://localhost:8001/api/owners/events/${id}/delete`)
    setRedirect(true)
  }
  
  // redirect to messages page to chat with owner
  const handleContactOwner = () => {
    history.push({
      pathname: "/messages",
      state: {
        id: event.owner_id,
        first_name: event.first_name,
        last_name: event.last_name
      }
    })
  }

  return (
    <>
    <div className="eventID">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/events"><img src={logo} alt="logo"/></Navbar.Brand>
        {props.user &&  <h3 className='display-name'> {props.user.first_name} {props.user.last_name} </h3>}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          {props.user &&
           <>
            <Link to="/owners/events/new">
              <Button size="m"> Create New Event </Button></Link>
              <Link to="/messages">
              <Button size="m"> Message </Button></Link>
                <Nav className="justify-content-end">
                  <Button size="m" onClick={(event) => { event.preventDefault();
                                                      logout_validation()}}>Logout</Button>
               </Nav>
          </>
          }    
        </Navbar.Collapse>
      </Navbar>

      <section>
        <div id="title">
          <h1> {event.title} </h1>
            <h3 id="hostname"> Hosted By: {event.first_name} {event.last_name}</h3></div>
            <div className='midpage'>
              <div className='additional-info'>
                <div className="info">i</div>
                <h5 id="info-text"> {event.additional_info} </h5>
              </div>
            </div>
          <div className='map-container'>
            <div className="map-container_text">
              <p> This location is {distance.distance} away</p>
              <p> It will take you {distance.time} to get there</p>
            </div>
            <div className="map-container_smallMap">
            {event.location && (<MapContainer location={event.location} title={event.title} />)}</div>
          </div>
        
         {/* <aside className='right-column'> */}
         <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
          <div className="card-text">
            <h4> Event Details </h4>
            <h5> {event.current_participants}/{event.max_participants} <img src={soccerIconwhite}   alt="soccer icon"/></h5>
            <p> {event.start_time}-{event.end_time}</p>
            <p> {event.address}, {event.city}</p>
            {/* <p> From Your Location: {distance.distance} | {distance.time}</p> */}
            <p> Gender Restriction: {event.gender_restriction}</p> 
            <p> Skill Level: {event.skill_level}</p>
            <div id="button-group">
            {!isOwner && <Navigation eventId={eventId} team1={team1} team2={team2} team='Blue' user={props.user} setUserJoined={setUserJoined} teamState={team1} setTeam={setTeam1} />}
          {!isOwner && !userJoined && <Navigation eventId={eventId} team1={team1} team2={team2} team='Red' user={props.user} setUserJoined={setUserJoined} teamState={team2} setTeam={setTeam2} />}
          {isOwner && <Card.Link  href={`http://localhost:3000/owners/events/${eventId}/edit`} >
            <Button id="edit-event"> Edit Event </Button>
          </Card.Link>}
          {isOwner && <Button onClick={() => deleteEvent(eventId)}> Delete Event
          </Button>}
          {!isOwner && <Button onClick={handleContactOwner}>Contact Owner</Button>}
          </div>
          </div>
        </Nav>
          <div className='game-container'>
            <div className='team1-container'>
              <div><h2 id="teams">TEAM BLUE</h2></div> 
                <div className="teamblue">
                 <div className='position-container'>
                   <h4> <bold>Goalies</bold></h4>
                    {team1.goalies.map(player => (
                      <p className='player-info-blue'> {player} </p>
                     ))}
                  </div>
                  <div className='position-container'>
                    <h4> Defenders</h4>
                      {team1.defenders.map(player => (
                      <p className='player-info-blue'> {player} </p>
                    ))}
                  </div>
                  <div className='position-container'>
                    <h4> Midfielders</h4>
                      {team1.midfielders.map(player => (
                      <p className='player-info-blue'> {player} </p>
                      ))}
                  </div>
                  <div className='position-container'>
                    <h4> Strikers</h4>
                      {team1.strikers.map(player => (
                      <p className='player-info-blue'> {player} </p>
                      ))}
                  </div>
                  </div>
              </div>
  
          <div className='team2-container'>
            <div id="teams"><h2><bold>TEAM RED</bold></h2></div> 
              <div className="teamred">
                <div className='position-container'>
                  <h4> Goalies</h4>
                    {team2.goalies.map(player => (
                    <p className='player-info-red'> {player} </p>
                    ))}
                  </div>
                <div className='position-container'>
                  <h4> Defenders</h4>
                    {team2.defenders.map(player => (
                    <p className='player-info-red'> {player} </p>
                    ))}
                </div>
                 <div className='position-container'>
                    <h4> Midfielders</h4>
                    {team2.midfielders.map(player => (
                     <p className='player-info-red'> {player} </p>
                    ))}
                  </div>
                <div className='position-container'>
                  <h4> Strikers</h4>
                  {team2.strikers.map(player => (
                    <p className='player-info-red'> {player} </p>
                  ))}
                </div>
              </div>
          </div>
        </div>

        <div className='comments-container'>
          <CommentBox user={props.user} eventId={eventId} setComments={setComments} comments={comments} />
          {comments.map(comment => (
            <div className='comment'>
              <h5 id="user-comment"> {comment.fullName} </h5>
              {/* <h5 id="user-comment">  {date} </h5> */}
              <p className="p-comment"> {comment.comment} </p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </>
    )
}
