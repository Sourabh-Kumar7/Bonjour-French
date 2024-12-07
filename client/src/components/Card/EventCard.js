import React from "react";
import { Card, Button } from "react-bootstrap";
import "./EventCard.css";

const EventCard = ({ title, category, location, image, applicants, posted }) => {
  return (
    <Card className="event-card shadow-sm">
      <Card.Img variant="top" src={image} className="event-card-img" />
      <Card.Body>
        <Card.Title className="event-card-title">{title}</Card.Title>
        <Card.Text className="event-card-text">
          <strong>Category:</strong> {category} <br />
          <strong>Posted:</strong> {posted} <br />
          <strong>Location:</strong> {location} <br />
          <strong>Applicants:</strong> {applicants}
        </Card.Text>
        <Button variant="primary" className="event-card-btn">
          Register Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
