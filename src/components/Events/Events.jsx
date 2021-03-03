import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../../providers/UserProvider";

const getCount = (event) => event.participants.length;
const getLeftCount = (event) => 12 - getCount(event);

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetch("https://stark-garden-96861.herokuapp.com/events")
        .then((res) => res.json())
        .then((responseJson) => setEvents(responseJson))
        .catch((error) => console.error(error));
    }
  }, [user]);

  const handleClose = () => setCurrentEvent(undefined);
  const handleShow = (event) => setCurrentEvent(event);

  const getMe = (event) =>
    event.participants.find((participant) => participant._id === user._id);

  const removeMe = async (event) => {
    const eventId = event._id;

    const { data } = await axios({
      method: "POST",
      url: `https://stark-garden-96861.herokuapp.com/events/${eventId}/removeMe`,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    setEvents(data);
  };

  const addMe = async (event) => {
    const eventId = event._id;

    const { data } = await axios({
      method: "POST",
      url: `https://stark-garden-96861.herokuapp.com/events/${eventId}/addMe`,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    setEvents(data);
  };

  if (!events.length) return null;

  return (
    <>
      <div className="bg-info h-100">
        <Container className="h-100 p-3">
          {events.map((event) => (
            <Card key={event._id}>
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  {new Date(event.time).toLocaleString("uk-UA")}
                </Card.Text>
                <Card.Text>
                  Йдуть:{" "}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleShow(event)}
                  >
                    {getCount(event)}{" "}
                    {getCount(event) === 1 ? "людина" : "чоловік"}
                  </Button>
                </Card.Text>
                <Card.Text>
                  {getLeftCount(event) === 0
                    ? "Вільних місць не залишилось"
                    : `Залишилось ${getLeftCount(event)} місц${
                        getLeftCount(event) === 1 ? "е" : "ь"
                      }`}
                </Card.Text>
                <Button
                  variant={getMe(event) ? "danger" : "primary"}
                  onClick={() =>
                    getMe(event) ? removeMe(event) : addMe(event)
                  }
                >
                  {getMe(event) ? "Атмєна" : "Вітьок, запиши мене"}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
      <Modal show={typeof currentEvent === "object"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Хто приймає участь</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {currentEvent?.participants?.map((participant) => (
              <ListGroup.Item key={participant._id}>
                {participant.firstName} {participant.lastName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
