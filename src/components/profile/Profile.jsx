import React, { useContext, useState } from 'react';
import { Navbar, Button, Form, Image, Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';



function Profile() {
   const { user, setUser } = useContext(UserContext);
   const [localUser, setLocalUser] = useState(user);

   const maskPassword = (password) => {
    return password.replace(/./g, '*');
   }

   const isAdult = (dob) => {
    
    const currentTime = new Date();
    const [birthYear, birthMonth, birthDate] = dob.split("-").map(Number);

    let age = currentTime.getFullYear() - birthYear;

    if (currentTime.getMonth() + 1 < birthMonth || 
        (currentTime.getMonth() + 1 === birthMonth && currentTime.getDate() < birthDate)) {
        age -= 1;
    }

    return age >= 18;
};

const isPasswordEqual = () => {
    const { password1, password2 } = localUser;
    return password1 === password2;
};

const handleLocalUserChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value)
  
    if (name === 'name' && !/^[a-zA-Z][a-zA-Z0-9]*$/.test(value)) {
        alert("Username can only be upper or lower case letters and numbers, but may not start with a number.");
        return;
    }

    if (name === 'email' && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
        alert("Email format error.");
        return;
    }

    if (name === 'phone' && !/^\d{3}-\d{3}-\d{4}$/.test(value)) {
        alert("Phone format wrong, should be xxx-xxx-xxxx.");
        return;
    }

    if (name === 'zipCode' && !/^[0-9]{5}$/.test(value)) {
        alert("Zip code format is 5 digit number.");
        return;
    }

    setLocalUser(prevUser => ({
                ...prevUser,
                [name] : value
            }));

    


    
}


const handleUpdate = () => {
    // if (!isAdult()) {
    //     alert("User must be 18 years or older to register");
    //     return;
    // }
    
    // if (!isPasswordEqual()) {
    //     alert("Confirmation password does not match the input password");
    //     return;
    // }

    setUser(localUser);
    
};

  return (
    <UserContext.Provider value = {{ user }} >
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
            <strong>Username:</strong> {user.name}
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
            <strong>Password:</strong> {maskPassword(user.password1)}
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
                    <Form.Control 
                        type="text"  
                        style={{ width: '150px', margin: '10px' }} 
                        name = "name"
                        value = {localUser.name} 
                        onChange={handleLocalUserChange}
                        title="Account name can only be upper or lower case letters and numbers, but may not start with a number." />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                        type="email"
                        name="email"
                        style={{ width: '150px' , margin: '10px' }} 
                        value = {localUser.email} 
                        onChange={handleLocalUserChange}/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        name='phone'
                        style={{ width: '150px' , margin: '10px' }} 
                        value = {localUser.phone} 
                        onChange={handleLocalUserChange}/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                        type="date" 
                        style={{ width: '150px' , margin: '10px' }} 
                        name="dob"
                        value = {localUser.dob} 
                        onChange={handleLocalUserChange}/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                        type="text"
                        name = "zipCode" 
                        style={{ width: '150px' , margin: '10px' }} 
                        value = {localUser.zipCode} 
                        onChange={handleLocalUserChange} />
                </Form.Group>
                </div>

            </div>
            <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                        type="password"
                        name="password1"
                        style={{ width: '150px' , margin: '10px' }} 
                        value = {localUser.password1} 
                        onChange={handleLocalUserChange}/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                        type="password" 
                        name="password2"
                        style={{ width: '150px' , margin: '10px' }} 
                        value = {localUser.password2} 
                        onChange={handleLocalUserChange}/>
                </Form.Group>
                </div>
            </div>
            <Button className="btn btn-primary mt-3" onClick={handleUpdate}>Update</Button>
            
            </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>        

      
    </div>
     </UserContext.Provider>
    
  );
}

export default Profile;
