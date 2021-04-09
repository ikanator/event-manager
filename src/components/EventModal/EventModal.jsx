import React from "react";
import { Modal, ListGroup, Button } from "react-bootstrap";

export const EventModal = ({ onClose, event }) => {
  return (
    <Modal show={typeof event === "object"} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Хто приймає участь</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {event?.participants?.map((participant) => (
            <ListGroup.Item key={participant._id}>
              {participant.firstName} {participant.lastName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Закрити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
