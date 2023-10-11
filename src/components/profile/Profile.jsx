import React, { useContext } from 'react';
import { Navbar, Button, Form, Image, Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';



function Profile() {
   const { user } = useContext(UserContext);
   const maskPassword = (password) => {
    return password.replace(/./g, '*');
   }
  return (
    
    <div>
      
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/main">Get back to Main</Navbar.Brand>
      </Navbar>

      
      <Row className="mt-4">
        <Col md={6} className="text-center d-flex flex-column align-items-center">
          <Image src="/ValhallaArticle.jpg" width='400px' height='200px' />
          <label  className="btn btn-primary mt-2">Upload New Picture <input type="file" style={{ display: 'none'}}/></label>
          
        </Col>
        <Col md={6} className="text-center">
          <Image src="/logo.jpg" width="400px" height='200px'/>
        </Col>
      </Row>

    <Row className="mt-4">
        <Col md={6} className="text-center d-flex flex-column align-items-center">
            <Card style={{width: '400px', margin: '0 auto'}}>
            <Card.Body>
    <Card.Title>Current Info</Card.Title>
    <div className="row">
        <div className="col-md-8">
            <strong>Username:</strong> {user.accName}
        </div>
    </div>
    <div className="row">
        <div className="col-md-8">
            <strong>Email:</strong> {user.email}
        </div>
    </div>
    <div className="row">
        <div className="col-md-8">
            <strong>Phone Number:</strong> {user.phone}
        </div>
    </div>
    <div className="row">
        <div className="col-md-8">
            <strong>Zipcode:</strong> {user.zipCode}
        </div>
    </div>
    <div className="row">
        <div className="col-md-8">
            <strong>Date of Birth:</strong> {user.dob}
        </div>
    </div>
    <div className="row">
        <div className="col-md-8">
            <strong>Password:</strong> {maskPassword(user.dob)}
        </div>
    </div>
</Card.Body>

            </Card>
        </Col>

        <Col md={6} className="text-center d-flex flex-column align-items-center">
            <Card style={{width: '400px', margin: '0 auto'}}>
                <Card.Body>
                    <Card.Title>Update Info</Card.Title>
                    <Form>
            <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="text" placeholder="User name" style={{ width: '150px', margin: '10px' }} />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="text" placeholder="Phone Number" style={{ width: '150px' , margin: '10px' }} />
                </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="text" placeholder="Date of Birth" style={{ width: '150px' , margin: '10px' }} />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="text" placeholder="ZipCode" style={{ width: '150px' , margin: '10px' }} />
                </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="password" placeholder="User Password" style={{ width: '150px' , margin: '10px' }} />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="password" placeholder="Confirm Password" style={{ width: '150px' , margin: '10px' }} />
                </Form.Group>
                </div>
            </div>
            <Button className="btn btn-primary mt-3">Update</Button>
            
            </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>        

      
    </div>
  );
}

export default Profile;
