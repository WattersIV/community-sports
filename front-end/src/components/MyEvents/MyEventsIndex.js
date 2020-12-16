import { Redirect, useRouteMatch, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import EventFilter from '../Events/EventFilter';

import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/';
import Card from 'react-bootstrap/Card'

export default function MyEventsIndex(props) {
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    axios.get(`/events/users/${props.currentUser.id}`)
      .then(res =>
        setEvents(res.data)
      )
  }, [])


  return (
    <h1>hello</h1>
  )
}

// const { path } = useRouteMatch();
// const [isLogout, setisLogout] = useState(false)
// function logout_validation() {
//   axios.post('http://localhost:8001/api/logout', {}).then((res) => setisLogout(true))
// };

// const [state, setState] = useState({users : [], events: [], pastEvents:[]});
// const [filter, setFilter] = useState({}); 

// useEffect(() => {
//   const first = axios.get('http://localhost:8001/api/events')
//   const second = axios.get('http://localhost:8001/api/checkdb/users')
//   Promise.all([
//     first,
//     second
//   ]).then(all => {
//      return setState(prev => ({...prev, events : all[0].data, users: all[1].data}))
//   })
// },[])
// // console.log('in event', props.currentUser)
// if (isLogout) {
//   return <Redirect to="/"/>
// };

// function getOwnerNames(state, owner_id) {
//     const ownerUser = state.users && (state.users.find((user) => {
//     return (user.id === owner_id) 
//   })
//   )
//   return ownerUser ? ownerUser.first_name : 'not exist'
// }

// const filterEvents = () => {
//   let filteredEvents = state.events;
//   for (let category in filter) {
//     filteredEvents = filter[category] ? filteredEvents.filter(event => event[category] === filter[category]) : filteredEvents;
//   }
//   return filteredEvents;
// }

// const makeEventsByDateObj = (events) => {
//   let dates = [...new Set(events.map(event => event.date).sort())];
//   const eventsByDate = {};
//   for (let date of dates) {
//       eventsByDate[date] = events.filter(item => item.date === date)
//   }
//   return eventsByDate;
// }

// let filteredEvents = filterEvents();
// let eventsByDate = makeEventsByDateObj(filteredEvents);
// // 
// const eventElements = Object.keys(eventsByDate).map((date) => {
//   return (
//     <div key={date}>
//     <h3>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
//     {
//       eventsByDate[date].map(event => {
//         return (
//           <div className="events">
//           <Card >
//             {/* <Link to={`${path}/${event.id}`} >{event.title}</Link> */}
//             <Card.Link href={`/events/${event.id}`}>
//             <div id="card-top">
//             <Card.Header > {event.start_time.slice(0,5)} - {event.end_time.slice(0,5)}</Card.Header>
//             <Card.Header>{getOwnerNames(state,event.owner_id)}</Card.Header>
//             </div>
//             <Card.Body >
//               <Card.Title>{event.title}</Card.Title>
//               <Card.Text>
//                 <small className="text-muted">{event.province}</small>
//               </Card.Text>
//               <div id="card-bottom">
//                 <Card.Text>
//                   {event.skill_level}
//                 </Card.Text>
//                 <Card.Text>
//                 {event.current_participants}/{event.max_participants}
//                 </Card.Text>
//               </div>
//             </Card.Body>
//             </Card.Link>
//           </Card>

//           </div>
//         )
//       }) 
//     }
//     </div>
//   ) 
// });  
// return (
//   <>
//   <Navbar bg="light" expand="lg">
//   <Navbar.Brand href="/events">Sports</Navbar.Brand>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav>
//         <NavDropdown title="Events" id="basic-nav-dropdown">
//           <NavDropdown.Item href="/register"  onSelect={e => console.log('event: ', e)}>Upcoming Events</NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.2">Past Events</NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.3">My Events</NavDropdown.Item>
//         </NavDropdown>

//     </Nav> 
//     {props.currentUser &&
//     <Nav className="justify-content-end">
//         <Nav.Link href="/profile">My Profile<span>{props.currentUser.first_name} {props.currentUser.last_name}</span></Nav.Link>
//         <Button size="sm" onClick={(event) => {event.preventDefault();
//                         logout_validation()}}>Logout</Button>
//     </Nav>   }
//   </Navbar.Collapse>
// </Navbar>
// <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
//   <div className="sidebar-sticky"></div>
//     <EventFilter setFilter={setFilter} />
// </Nav>
//   {eventElements.length ? eventElements : <p>There's no event with your criteria.</p>}
// </>
// )