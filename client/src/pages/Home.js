import React from "react";
import { Button, Container, Row, Col, Accordion, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer/Footer";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import EventCard from "../components/Card/EventCard";
import CustomCarousel from "../components/Carousel/CustomCarousel";

const Home = () => {
  const events = [
    {
      title: "French Cooking Event",
      category: "Cooking",
      location: "53 Marlborough St, Boston, MA 02116",
      applicants: "100+",
      image: "https://www.institutescoffier.com/wp-content/uploads/2023/12/mastering-the-art-of-french-cooking.webp",
      posted: "1 day ago",
    },
    {
      title: "Conversation Club French",
      category: "Learning",
      location: "Online Event via Zoom",
      applicants: "400+",
      image: "https://frenchtogether.com/wp-content/uploads/2020/11/conversation-jolopes-depositphotos.jpg",
      posted: "2 days ago",
    },
    {
      title: "French Grammar Workshop",
      category: "Learning",
      location: "Online Event via Zoom",
      applicants: "200+",
      image: "image21.jpg", // You can replace this image URL with any other related one
      posted: "5 days ago",
    },
  ];
  

  const slides = [
    {
      image: "/image5.jpg",
    },
    {
      image: "/image14.jpg",
    },
    {
      image: "/image3.jpg",
    },
    {
      image: "/image16.png",
    },
  ];

    // Inline styles for bold and small text
    const boldTextStyle = {
      fontWeight: 'bold',
      fontSize: '2.5rem',
      color: '#333',
    };
  
    const smallTextStyle = {
      fontSize: '1.7rem',
      color: '#666',
    };

    // Inline style for container
    const containerStyle = {
      marginTop: '5rem',
      paddingTop: '15px',  // Corrected 'padding top' to 'paddingTop'
    };

  return (
    <div>
      <HomeNavbar />
      
      <div className="container mt-5" style={containerStyle}>
        {/* Bold Text Section with inline styles */}
        <div className="text-center">
          <p style={boldTextStyle}>The free, fun, and effective way to learn French!</p>
          <p style={smallTextStyle}>La manière gratuite, amusante et efficace d'apprendre le français !</p>
        </div>
      </div>

      <CustomCarousel slides={slides} />

      <Container className="my-5">
        <h2 className="text-center mb-4">Upcoming French Events</h2>
        <Row>
          {events.map((event, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <EventCard {...event} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is Bonjour French?</Accordion.Header>
            <Accordion.Body>
              Bonjour French is an interactive platform for learning French...
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How can I participate in events?</Accordion.Header>
            <Accordion.Body>
              You can register directly via our events page...
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container className="my-5 text-center">
        <h2>Subscribe to Our Newsletter</h2>
        <Form className="mt-3">
          <Form.Control type="email" placeholder="Enter your email" className="mb-3" />
          <Button variant="primary">Subscribe</Button>
        </Form>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
