import { useState, React } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import './Login.scss';
import logo from './logo.png';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const userLoggedin = async e => {
    e.preventDefault()
    if (email === "") {
      setError("Email cannot be blank")
      return;
    }
    if (password === "") {
      setError("Password cannot be blank")
      return;
    }
    await axios.post('http://localhost:8001/api/login', { email, password }, { withCredentials: true })
      .then((res) => {
        if (res.data === "Invalid email or password") {
          setError(res.data)
          props.setisLogin(false)
        } else {
          props.setisLogin(true);
          localStorage.setItem("token", res.data.token)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  

  return (
    <>
      {/* <div className="Login"> */}
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
      <div className="Login">
        <Form
          id="login-form"
          onSubmit={userLoggedin}>
          <Form.Group size="lg" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button id="btn_login" block size="lg" type="submit">
            Login
      </Button>
        </Form>
        <h2>{error}</h2>
      </div>
    </>
  );

};


