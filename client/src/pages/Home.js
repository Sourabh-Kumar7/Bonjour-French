import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap'; // Added NavDropdown
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';




const Home = () => {
    const selectBox = (boxId) => {
        console.log(`Box ${boxId} selected.`);
      };
  const events = [
    {
      title: 'French Cooking Event',
      category: 'Cooking',
      location: '53 Marlborough St, Boston, MA 02116',
      applicants: '100+',
      image: 'https://www.institutescoffier.com/wp-content/uploads/2023/12/mastering-the-art-of-french-cooking.webp',
      posted: '1 day ago',
    },
    {
      title: 'Conversation Club French',
      category: 'Learning',
      location: 'Online Event via Zoom',
      applicants: '400+',
      image: 'https://frenchtogether.com/wp-content/uploads/2020/11/conversation-jolopes-depositphotos.jpg',
      posted: '2 days ago',
    },
    {
      title: 'Apéro Boston French Community',
      category: 'Halloween Party',
      location: 'French Library, Boston, MA, United States',
      applicants: '50+',
      image: 'https://frenchlibrary.org/wp-content/uploads/2020/04/cheers-1024x768.jpg',
      posted: '3 days ago',
    },
  ];

  return (
    <div>
      {/* Navbar Section */}
      <Navbar bg="black" variant="dark" expand="lg" className="px-3">
        <Container fluid>
          <Navbar.Brand href="index.html" className="logo-text">
            Bonjour French
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarSupportedContent" />

          <Navbar.Collapse id="navbarSupportedContent" className="justify-content-end">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="#about-section" className="text-white">
                About
              </Nav.Link>
              <Nav.Link href="#events_french" className="text-white">
                Events
              </Nav.Link>
              <Nav.Link href="#carouselExampleControls" className="text-white">
                Success Stories
              </Nav.Link>
              <Nav.Link href="#plans" className="text-white">
                Subscribe
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <NavDropdown title="ENGLISH" id="languageDropdown" className="text-white me-3 btn btn-outline-light">
                <NavDropdown.Item href="#">Spanish</NavDropdown.Item>
                <NavDropdown.Item href="#">French</NavDropdown.Item>
                <NavDropdown.Item href="#">German</NavDropdown.Item>
              </NavDropdown>
              <Link to="/login">
              <Button variant="outline-light">
                Login
              </Button>
              </Link>

              <Link to="/login">
              <Button variant="outline-light" className="ms-3" >
                Sign Up
              </Button>
              </Link>
              
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.globallingua.ca/hubfs/learn-french-fast.jpg" 
            alt="First slide"
            style={{ width: '1920px', height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Learn French with Experts</h3>
            <p>Join our classes to master French fluently.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://neuro-marseille.org/wp-content/uploads/2021/12/learning-french-vweb780-780x483.jpg"
            alt="Second slide"
            style={{ width: '1920px', height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Engaging Community Events</h3>
            <p>Practice French at exciting cultural events.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Events Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Upcoming French Events</h2>
        <Row>
          {events.map((event, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Img variant="top" src={event.image} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    <strong>Category:</strong> {event.category} <br />
                    <strong>Posted:</strong> {event.posted} <br />
                    <strong>Location:</strong> {event.location} <br />
                    <strong>Applicants:</strong> {event.applicants}
                  </Card.Text>
                  <Button variant="primary">Register Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="container mt-5" id="about-section" style={{ backgroundColor: 'black' }}>
  <h2 className="text-center text-white">Why Learn French Here?</h2>
  <div className="row mt-4">
    <div className="col-lg-8 offset-lg-2">
      <div className="border rounded p-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 col-12 mb-3">
            <div className="col-12">
              <div
                className="box text-center p-3 border rounded"
                onClick={() => selectBox('A')}
                id="boxA"
              >
                <h5 className="box-heading text-white">
                  Comprehensive French Language Program Management
                </h5>
                <div className="box-content">
                  <p className="text-white">
                    Easily track your progress, allocate lessons, and receive support
                    whenever you need it.
                  </p>
                  <img
                    src="https://i0.wp.com/thegoodlifefrance.com/wp-content/uploads/2022/07/learn-French-bonjour.jpg"
                    alt="Image for Box A"
                    className="box-img img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div
                className="box text-center p-3 border rounded"
                onClick={() => selectBox('B')}
                id="boxB"
              >
                <h5 className="box-heading text-white">Flexible Online French Training</h5>
                <div className="box-content">
                  <p className="text-white">
                    With tutors in various time zones, you can always find a lesson time
                    that fits your schedule.
                  </p>
                  <img
                    src="https://vibe.us/blog/10-positive-aspects-to-distance-learning/cover_hu3d03a01dcc18bc5be0e67db3d8d209a6_184197_640x0_resize_q90_lanczos.ea326e175ea41a8a8013658ca8ec88b43ed1a14e0e9902f5ab052f97182095a2.jpg"
                    alt="Image for Box B"
                    className="box-img img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6 col-12">
            <div className="col-12">
              <div
                className="box text-center p-3 border rounded"
                onClick={() => selectBox('C')}
                id="boxC"
              >
                <h5 className="box-heading text-white">
                  Precise Tracking of Your French Learning Progress
                </h5>
                <div className="box-content">
                  <p className="text-white">
                    Measure your improvement through regular assessments and see how
                    quickly your French skills are advancing.
                  </p>
                  <img
                    src="https://www.teachermagazine.com/assets/images/teacher/Geoffs_blog.jpg"
                    alt="Image for Box C"
                    className="box-img img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div
                className="box text-center p-3 border rounded"
                onClick={() => selectBox('D')}
                id="boxD"
              >
                <h5 className="box-heading text-white">Expert 1-on-1 French Tutors</h5>
                <div className="box-content">
                  <p className="text-white">
                    We handpick professional tutors to help you master both spoken and
                    written French, ensuring you achieve fluency with confidence.
                  </p>
                  <img
                    src="https://www.frenchwithagnes.com/wp-content/uploads/2020/07/private-french-tutoring.jpg"
                    alt="Image for Box D"
                    className="box-img img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 <br></br>
 <div className="col-lg-12">
  <h1 className="text-center">Testimonials</h1>
  <Carousel id="carouselExampleControls" indicators={false}>
    {/* First Testimonial */}
    <Carousel.Item>
      <div className="d-flex justify-content-center">
        <img
          className="rounded-circle shadow-1-strong mb-4"
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
          alt="Maria Kate"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 text-center">
          <h5 className="mb-3">Maria Kate</h5>
          <p>Photographer</p>
          <p className="text-muted">
            <i className="fas fa-quote-left pe-2"></i>
            This website made learning French so easy and fun—I saw progress within weeks!
          </p>
        </div>
      </div>
      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="far fa-star fa-sm"></i></li>
      </ul>
    </Carousel.Item>

    {/* Second Testimonial */}
    <Carousel.Item>
      <div className="d-flex justify-content-center">
        <img
          className="rounded-circle shadow-1-strong mb-4"
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
          alt="John Doe"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 text-center">
          <h5 className="mb-3">John Doe</h5>
          <p>Web Developer</p>
          <p className="text-muted">
            <i className="fas fa-quote-left pe-2"></i>
            The lessons are super engaging and practical, perfect for beginners like me!
          </p>
        </div>
      </div>
      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="far fa-star fa-sm"></i></li>
      </ul>
    </Carousel.Item>

    {/* Third Testimonial */}
    <Carousel.Item>
      <div className="d-flex justify-content-center">
        <img
          className="rounded-circle shadow-1-strong mb-4"
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
          alt="Anna Deynah"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 text-center">
          <h5 className="mb-3">Anna Deynah</h5>
          <p>UX Designer</p>
          <p className="text-muted">
            <i className="fas fa-quote-left pe-2"></i>
            I love how interactive and simple the platform is; it keeps me motivated every day!
          </p>
        </div>
      </div>
      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="fas fa-star fa-sm"></i></li>
        <li><i className="far fa-star fa-sm"></i></li>
      </ul>
    </Carousel.Item>
  </Carousel>
</div>




      <footer className="footer p-5" style={{ backgroundColor: 'black', color: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h2 style={{ marginLeft: '100px', color: 'white' }}>Bonjour French</h2>
            </div>
            <div className="col-md-3">
              <h5>About Us</h5>
              <p>
                Bonjour French is a leading platform that offers a
                wide range of French learning resources and speaking
                challenges.
              </p>
            </div>
            <div className="col-md-3">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>Email: info@example.com</li>
                <li>Phone: +1233567890</li>
                <li>Address: 123 Street, City, Country</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Follow Us</h5>
              <ul className="list-inline footer-links">
                <li className="list-inline-item">
                  <a href="#" style={{ color: 'white' }}>
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" style={{ color: 'white' }}>
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" style={{ color: 'white' }}>
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" style={{ color: 'white' }}>
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <p>&copy; 2024 Bonjour French. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-end">
              <ul className="list-inline footer-links">
                <li className="list-inline-item">
                  <a href="#" className="text-white">
                    Privacy Policy
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white">
                    Terms of Service
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default Home;