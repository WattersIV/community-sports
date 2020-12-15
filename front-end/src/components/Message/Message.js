import { useState, useEffect } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ListGroup, Form, Button, Nav, Navbar } from 'react-bootstrap';
import './Message.scss';
import logo from './logo.png'
export default function Messages(props) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('userData')));
  const [messages, setMessages] = useState([]);
  const [messageObj, setMessageObj] = useState({});
  const [contactList, setContactList] = useState(null);
  const [currentContact, setCurrentContact] = useState({});
  const [isLogout, setisLogout] = useState(false)
  const [newMessageText, setNewMessageText] = useState('');


  useEffect(() => {
    //Getting conversations specific to the user
    axios.get(`http://localhost:8001/api/messages/${currentUser.id}`)
      .then((res) => {
        setMessages(() => res.data);
      })
  }, [])

  useEffect(() => {
    const obj = createMessageObj(currentUser.id, messages);
    setMessageObj(() => obj);
    const list = createContactList(currentUser.id, messages);
    setContactList(prev => list);
  }, [messages])

  useEffect(() => {
    //useEffect 0
    if (location.state) {
      setCurrentContact(() => location.state);
    }
  }, [])

  useEffect(() => {
    if (currentContact.id && contactList && !contactList.find(contact => contact.id === currentContact.id)) {
      setContactList(prev => [currentContact, ...prev])
    }
  }, [currentContact, contactList])

  useEffect(() => {
    if (!currentContact.id && contactList && contactList.length > 0) {
      setCurrentContact(() => contactList[0]);
    }
  }, [contactList])

  function createMessageObj(user_id, messages) {
    const result = {};
    messages.forEach((message, index) => {
      if (message.sender_id !== user_id) {
        if (result[message.sender_id]) {
          result[message.sender_id].push(message);
        } else {
          result[message.sender_id] = [message];
        }
      } else {
        if (result[message.recipient_id]) {
          result[message.recipient_id].push(message);
        } else {
          result[message.recipient_id] = [message];
        }
      }
    })
    return result;
  }

  function createContactList(user_id, messages) {
    const contactList = [];
    messages.reverse().forEach(message => {
      const newContact = {};
      if (message.sender_id !== user_id) {
        newContact.id = message.sender_id;
        newContact.first_name = message.sender_first_name;
        newContact.last_name = message.sender_last_name;
      } else {
        newContact.id = message.recipient_id;
        newContact.first_name = message.recipient_first_name;
        newContact.last_name = message.recipient_last_name;
      }
      if (!contactList.find(contact => contact.id === newContact.id)) {
        contactList.push(newContact)
      }
    })
    return contactList;
  }

  function handleClick(obj) {
    setCurrentContact(() => obj);
  }

  function handleChange(e) {
    setNewMessageText(e.target.value)
  }

  function handleSubmit(e) {

    if (!currentContact.id) {
      return;
    }

    const reqBody = {
      senderId: currentUser.id,
      recipientId: currentContact.id,
      body: newMessageText
    }
    e.preventDefault();
    axios.post("http://localhost:8001/api/messages", reqBody)
      .then(res => {
        const messageId = res.data.message_id;
        const sentMessage = {
          id: messageId,
          sender_id: currentUser.id,
          sender_first_name: currentUser.first_name,
          sender_last_name: currentUser.last_name,
          recipient_id: currentContact.id,
          recipient_first_name: currentContact.first_name,
          recipient_last_name: currentContact.last_name,
          body: newMessageText
        };
        const newMessageList = [...messages.reverse(), sentMessage];
        setMessages(() => newMessageList);
      })
    setNewMessageText('');
  }

  function compareObjectsById(a, b) {
    return a.id > b.id ? 1 : -1;
  }

  const conversation = messageObj[currentContact.id] || [];
  function logout_validation() {
    axios.post('http://localhost:8001/api/logout', {}).then((res) => setisLogout(true))
  };
  if (isLogout) {
    return <Redirect to="/" />
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/events"><img src={logo} alt="logo" /></Navbar.Brand>
        {currentUser && <h3 className='display-name'> {currentUser.first_name} {currentUser.last_name} </h3>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {currentUser &&
            <>
              <Link to="/owners/events/new">
                <Button size="m"> Create New Event </Button></Link>
              <Nav className="justify-content-end">
                <Button size="m" onClick={(event) => {
                  event.preventDefault();
                  logout_validation()
                }}>Logout</Button>
              </Nav>
            </>
          }
        </Navbar.Collapse>
      </Navbar>

      <div className="message-page">
        <div className="message-page-left">
          <ListGroup>
            {contactList && contactList.map(({ id, first_name, last_name }) => {
              return (
                <ListGroup.Item
                  active={currentContact.id === id}
                  key={id}
                  onClick={() => handleClick({ id, first_name, last_name })}
                >
                  {first_name} {last_name}
                </ListGroup.Item>
              )
            })
            }
          </ListGroup>
        </div>
        <div className="message-page-right flex-column">

          <div className="conversation">
            {conversation.sort(compareObjectsById).map((message, index) => {
              const messageClass = message.sender_id === currentUser.id ? "message-user" : "message-contact";
              const messageContainerClass = message.sender_id === currentUser.id ? "message-container-user" : "message-container-contact";
              return (
                <div className={messageContainerClass}>
                  <div key={index} className={messageClass}>
                    {message.body}
                  </div>
                </div>
              )
            })
            }
          </div>
          <div>
            <Form onSubmit={handleSubmit} className="new-message-form">
              <Form.Control
                as="textarea"
                required value={newMessageText}
                onChange={handleChange}
                style={{ height: '20vh', margin: '2vh 0vh', resize: 'none' }}
              >
              </Form.Control>
              <Button id="message-submit" type="submit" variant="primary" block>Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  )

} 