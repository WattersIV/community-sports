import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import './Navigation.scss'
import field from './field.jpeg'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ActionAlerts from './MuiAlert'

export default function Navigation(props) {
  const [show, setShow] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const eventId = props.eventId
  //Blue is Team 1 Red is Team 2
  let teamId
  if (props.team === 'Blue') {
    teamId = 1
  } else {
    teamId = 2
  }

  const leaveEvent = () => {
    axios.delete(`http://localhost:8001/api/users/events/${eventId}/delete`, { data: { id: props.user.id } })
      .then(() => {
        setRedirect(true)
      })
    }
    if (redirect === true) {
      return <Redirect to="/events" />
    }

  function counter(position) { //--> maybe we need current user name ?
    axios.post(`http://localhost:8001/api/users/events/${eventId}/create`, { teamNumber: teamId, position: position, id: props.user.id })
      .then(() => {
        return axios.get(`http://localhost:8001/api/events/${eventId}/teams`)
      })
      .then((res) => {
        //Sorting players by team
        const goalies = []
        const midfielders = []
        const strikers = []
        const defenders = []
        for (const player of res.data) {
          if (player.team_number === teamId) {
            if (player.position === 'Goalie') {
              goalies.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Striker') {
              strikers.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Defender') {
              defenders.push(`${player.first_name} ${player.last_name}`)
            }
            else if (player.position === 'Midfielder') {
              midfielders.push(`${player.first_name} ${player.last_name}`)
            }
          }
        }
        props.setTeam(prev => ({ ...prev, goalies: goalies, strikers: strikers, defenders: defenders, midfielders: midfielders }))
      })
  }
  for (const positionGroup in props.team1) {
    const positionPlayers = props.team1[positionGroup]
    if (positionPlayers.includes(`${props.user.first_name} ${props.user.last_name}`)) {
      props.setUserJoined(true)
      return (
        <button type="button" class="btn btn-danger" onClick={() => leaveEvent()}>Danger</button>
      )
    }
    for (const positionGroup in props.team2) {
      const positionPlayers = props.team1[positionGroup]
      if (positionPlayers.includes(`${props.user.first_name} ${props.user.last_name}`)) {
        props.setUserJoined(true)
        return (
          <button type="button" class="btn btn-danger">Leave Event</button>
        )
      }
    }
    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          Join Team {props.team}
        </Button>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-lg"
          aria-labelledby="title">
          <Modal.Header closeButton>
            <Modal.Title id="title">Choose your position on the {props.team.toLowerCase()} team!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id='alert' className={`${confirm ? 'alert-show' : 'alert-hide'}`} >
              <ActionAlerts hideAlert={setConfirm} />
            </div>
            <Button id="position-goalie" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Goalie');
              setConfirm(true)
            }}> goalie </Button>
            <Button id="position-defender_1" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Defender')
              setConfirm(true)
            }}> defender 1 </Button>
            <Button id="position-defender_2" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Defender')
              setConfirm(true)
            }}> defender 2 </Button>
            <Button id="position-defender_3" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Defender')
              setConfirm(true)
            }}> defender 3 </Button>
            <Button id="position-defender_4" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Defender')
              setConfirm(true)
            }}> defender 4 </Button>
            <Button id="position-midfield_1" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Midfielder')
              setConfirm(true)
            }}> midfield 1 </Button>
            <Button id="position-midfield_2" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Midfielder')
              setConfirm(true)
            }}> midfield 2 </Button>
            <Button id="position-midfield_3" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Midfielder')
              setConfirm(true)
            }}> midfield 3 </Button>
            <Button id="position-midfield_4" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Midfielder')
              setConfirm(true)
            }}> midfield 4 </Button>
            <Button id="position-striker_1" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Striker')
              setConfirm(true)
            }}> striker 1 </Button>
            <Button id="position-striker_2" size="sm" onClick={(event) => {
              event.preventDefault();
              counter('Striker')
              setConfirm(true)
            }}> striker 2 </Button>
            <img src={field} alt="field" className="img-fluid" />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

