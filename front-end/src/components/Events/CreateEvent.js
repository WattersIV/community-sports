import axios from 'axios';
import { useState } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import EventForm from './EventForm'

export default function CreateEvent(props) {
  const [newEvent, setnewEvent] = useState({})
  const [created, setCreated] = useState(false)

  function newEventfunction() {
    //Adding newly made event to the db
    axios.post('http://localhost:8001/api/owners/events/new', { ...newEvent, owner_id: props.currentUser.id }).then((res) => {
      setCreated(true)
    })
  }

  const history = useHistory();

  const cancel = () => {
    history.push('/events');
  }
  if (created === true) {
    return <Redirect to="/events" />
  }

  return (
    <EventForm newEvent={newEvent}
      setnewEvent={setnewEvent}
      newEventfunction={newEventfunction}
      cancel={cancel}
    />
  );
}