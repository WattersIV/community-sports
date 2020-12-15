import { Form, Button } from 'react-bootstrap';
import './Forms.scss';
export default function EventForm({ newEvent, setnewEvent, newEventfunction, cancel }) {
  return (
    <div className="newEvent">
      <Form
        onSubmit={event => {
          event.preventDefault();
          newEventfunction()
        }}>
        <Form.Group size="lg" controlId="dob">
          <Form.Label id="event-form">Date</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={newEvent.date && newEvent.date.slice(0, 10)}
            onChange={(event) => {

              setnewEvent({ ...newEvent, date: event.target.value })
            }}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="appt">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            name="appt"
            placeholder="Start Time"
            value={newEvent.start_time}
            onChange={(event) => {
              setnewEvent({ ...newEvent, start_time: event.target.value })
            }}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="appt">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="End Time"
            value={newEvent.end_time}
            onChange={(event) => {
              setnewEvent({ ...newEvent, end_time: event.target.value })
            }}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={newEvent.title}
            placeholder="Give a Title"
            onChange={(event) => {
              event.preventDefault();
              setnewEvent({ ...newEvent, title: event.target.value })
            }}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="formGroupAddress">
          <Form.Label>Event Address</Form.Label>
          <Form.Control
            value={newEvent.address}
            placeholder="Address"
            onChange={(event) => {
              event.preventDefault();
              setnewEvent({ ...newEvent, address: event.target.value })
            }}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupCity" >
          <Form.Label>City</Form.Label>
          <Form.Control
            value={newEvent.city}
            placeholder="City"
            onChange={(event) => {
              event.preventDefault();
              setnewEvent({ ...newEvent, city: event.target.value })
            }}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupProvince" >
          <Form.Label>Province</Form.Label>
          <Form.Control
            value={newEvent.province}
            placeholder="Province"
            onChange={(event) => {
              event.preventDefault();
              setnewEvent({ ...newEvent, province: event.target.value })
            }}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupMaximumParticipants" >
          <Form.Label>Maximum Participants</Form.Label>
          <Form.Control
            value={newEvent.max_participants}
            placeholder="Maximum Participants"
            onChange={(event) =>
              setnewEvent({ ...newEvent, max_participants: event.target.value })}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupSkillLevel">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            as="select"
            value={newEvent.skill_level}
            placeholder="Level"
            onChange={(event) => {
              setnewEvent({ ...newEvent, skill_level: event.target.value })
            }}

          > <option> Choose Skill Level </option>
            <option> Beginner </option>
            <option> Intermediate </option>
            <option> Advanced </option>
            <option> Open </option>
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupGenderRestriction">
          <Form.Label>Gender Restriction</Form.Label>
          <Form.Control
            as="select"
            value={newEvent.gender_restriction}
            placeholder="Gender"
            onChange={(event) => setnewEvent({ ...newEvent, gender_restriction: event.target.value })}
          > <option> Choose Gender Restriction</option>
            <option> Male only</option>
            <option> Female Only</option>
            <option> Other Only</option>
            <option> None</option>
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupReferee">
          <Form.Label>Referee</Form.Label>
          <Form.Control
            as="select"
            value={newEvent.referee}
            placeholder="Referee?"
            onChange={(event) => setnewEvent({ ...newEvent, referee: event.target.value })}
          > <option> Referee </option>
            <option> TRUE </option>
            <option> FALSE</option>
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupTeams">
          <Form.Label>Team</Form.Label>
          <Form.Control
            as="select"
            value={newEvent.team}
            placeholder="Choose your team"
            onChange={(event) => setnewEvent({ ...newEvent, team: event.target.value })}
          > <option> Choose Your Team </option>
            <option> Team1 </option>
            <option> Team2 </option>
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupPosition">
          <Form.Label>Position</Form.Label>
          <Form.Control
            as="select"
            value={newEvent.position}
            placeholder="Choose you position"
            onChange={(event) => setnewEvent({ ...newEvent, position: event.target.value })}
          > <option> Choose Your Position </option>
            <option> Goalie </option>
            <option> Striker </option>
            <option> Midfield </option>
            <option> Defender </option>
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="formGroupInfo" >
          <Form.Label>Additional Info</Form.Label>
          <Form.Control
            value={newEvent.additional_info}
            placeholder="Additional Info"
            onChange={(event) =>
              setnewEvent({ ...newEvent, additional_info: event.target.value })}
          />
        </Form.Group>
        <div div="event-buttons">
          <Button id="save-button" type="submit" size="m"> Save </Button>
          <Button size="m" onClick={cancel} > Cancel </Button>
        </div>
      </Form>
    </div>
  );

}