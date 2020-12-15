import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import './Register.scss'
import logo from './logo.png';

export default function Register(props) {
  const [error, setError] = useState("")
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
  })

  //Event handler for register
  const registration = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8001/api/register', user)
      .then((res) => {
        if (res.data === "Email already in use") {
          setError(res.data)
          props.setisLogin(false)
        } else {
          localStorage.setItem("token", res.data.token)
          props.setisLogin(true)
        }
      })
  }



  return (
    <>
      <div className="register" >
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/"><img src={logo} alt="logo" /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="Register">
        <Form onSubmit={registration}>
          <Form.Group size="lg" controlId="formGroupFirstName">
            <Form.Control
              type="first_name"
              placeholder="First Name"
              value={user.first_name}
              onChange={(event) => setUser({ ...user, first_name: event.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="formGroupLastName">
            <Form.Control
              type="last_name"
              placeholder="Last Name"
              value={user.last_name}
              onChange={(event) => setUser({ ...user, last_name: event.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="formGroupEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(event) => setUser({ ...user, email: event.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="formGroupPassword">
            <Form.Control
              type="Password"
              value={user.password}
              placeholder="Password"
              onChange={(event) => setUser({ ...user, password: event.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="formGroupPhone">
            <Form.Control
              value={user.phone}
              placeholder="Phone"
              onChange={(event) => setUser({ ...user, phone: event.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="formGroupAge" >
            <Form.Control
              value={user.age}
              placeholder="Age"
              onChange={(event) => setUser({ ...user, age: event.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="formGroupGender">
            <Form.Control
              as="select" defaultValue="Choose..."
              value={user.gender}
              placeholder="Gender"
              onChange={(event) => setUser({ ...user, gender: event.target.value })}
            > <option> Gender...</option>
              <option> Male</option>
              <option> Female</option>
              <option> Other</option>
            </Form.Control>
          </Form.Group>
          <Button id="btn-register" size="lg" type="submit"> Register </Button>
        </Form>
        <h2>{error}</h2>
      </div>
    </>
  );
}