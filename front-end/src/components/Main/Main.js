import { Navbar, Nav, Card, Image, Container, Col, Row } from 'react-bootstrap/';
import './Main.scss'
import CarouselComponent from '../CarouselComponent/CarouselComponent'
import player from './player.jpeg'
import referee from './referee.jpeg'
import logo from './logo.png'
export default function Main(props) {

  return (
    <>
      <div id="homepage" >
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
        <CarouselComponent />

        <Container>
          <Row className='my-3'>
            <Col xs={6} md={4}>
              <div className="homepage-image-container">
                <Image src={player} rounded fluid />
              </div>
            </Col>
            <Col xs={6} md={4}>
              <Card style={{ width: "48rem", height: "auto" }}>
                <Card.Body>
                  <Card.Title className='text-left'>Players</Card.Title>
                  <ul className='text-left'>
                    <li>Create, search and join soccer games in your  community</li>
                    <li>Enjoy a casual kick around, or show off your skills   in competitive games </li>
                    <li>Meet some fellow soccer lovers and have fun!</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <div className="homepage-image-container">
                <Image src={referee} rounded fluid />
              </div>
            </Col>
            <Col xs={6} md={4}>
              <Card style={{ width: '48rem', height: 'auto' }}>
                <Card.Body>
                  <Card.Title className='text-left'>Referees</Card.Title>
                  <Card.Text>
                    <ul className='text-left'>
                      <li>Serve the soccer community by referring competitive games</li>
                      <li>Have fun and potentially make some money!</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}