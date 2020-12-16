import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import EventForm from './EventForm'

export default function EditEvent(props) {
  const [newEvent, setnewEvent] = useState({})
  const [edited, setnewEdited] = useState(false)

  //On page load load all event data into state
  useEffect(() => {
    axios.get(`http://localhost:8001/api/events/${props.eventId}`)
      .then((res) => {
        setnewEvent(res.data[0])
      })
  }, [])

  //Edit information in the db with the new values
  function editEvent() {
    axios.put(`http://localhost:8001/api/owners/events/${props.eventId}/edit`, { ...newEvent, owner_id: props.currentUser.id }).then((res) => {
      setnewEdited(true)
    })
  }
  const history = useHistory();
  const cancel = () => {
    history.push('/events');
  }
  if (edited === true) {
    return <Redirect to="/events" />
  }
  return (
    <EventForm newEvent={newEvent}
      setnewEvent={setnewEvent}
      newEventfunction={editEvent}
      cancel={cancel}
    />
  );

}

