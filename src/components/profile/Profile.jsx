import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Button, Form, Image, Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';



function Profile() {
//    const { user, setUser } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem('user') || "[]");
   const [localUser, setLocalUser] = useState({ ...user, password2: '' });
   const [updateAttempted, setUpdateAttempted] = useState(false);
   const setUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setLocalUser({...updatedUser, password2: ''});
};

useEffect(() => {
    const handleStorageChange = (e) => {
        if (e.key === 'user') {
            const updatedUser = JSON.parse(e.newValue || "[]");
            setLocalUser({...updatedUser, password2: ''});
        }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, []);


   


   const maskPassword = () => {
    const passwordToMask = updateAttempted ? localUser.password2 : user.password1;
    const finalPassword = passwordToMask ? passwordToMask : '';
    return finalPassword.replace(/./g, '*');
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

    setLocalUser(prevUser => ({
        ...prevUser,
        [name] : value
    }));

    if (name === 'password1') {
        setUpdateAttempted(false);
    }
}


const handleUpdate = () => {
    
    const { username, email, phone, zipCode, dob, password1, password2 } = localUser;
    if (username && !/^[a-zA-Z][a-zA-Z0-9]*$/.test(username)) {
        alert("Username can only be upper or lower case letters and numbers, but may not start with a number.");
        return;
    }

    if (email && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
        alert("Email format error.");
        return;
    }

    if (phone && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        alert("Phone format wrong, should be xxx-xxx-xxxx.");
        return;
    }

    if (zipCode && !/^[0-9]{5}$/.test(zipCode)) {
        alert("Zip code format is 5 digit number.");
        return;
    }

    if (dob && !isAdult(dob)) {
        alert("User must be 18 years or older to register");
        return;
    }

    if(!password1){
        alert("Original password cannot be empty.");
        return;
    }

    if (user.password1 != localUser.password1) {
        alert("Your input original password is wrong.");
        return;
    }
    const updatedUser = { ...localUser, password1: password2 ? password2 : password1 };

    setUser(updatedUser);
    setUpdateAttempted(true);
    
};
if (!user) {
    return <div>Loading user data...</div>;
}

return (
    <div>
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/main">Get back to Main</Navbar.Brand>
            </Navbar>
        <div className="container mt-4">
            


            <Row className="mt-4">
            <Col md={6} className="text-center d-flex flex-column align-items-center mb-4">
    <div style={{height: '200px', width: '100%', overflow: 'hidden'}}>
        <Image src="/ValhallaArticle.jpg" style={{height: '100%', objectFit: 'cover'}} className="img-fluid mb-3" alt="Profile" />
    </div>
    <p></p>
    <label className="btn btn-primary">
        Upload New Picture 
        <input type="file" style={{ display: 'none' }} />
    </label>
</Col>

<Col md={6} className="text-center d-flex flex-column align-items-center mb-4">
    <div style={{height: '200px', width: '100%', overflow: 'hidden'}}>
        <Image src="/logo.jpg" style={{height: '100%', objectFit: 'cover'}} className="img-fluid mb-3" alt="Profile" />
    </div>
</Col>

            </Row>

            <Row className="mt-4">
    <Col md={6} className="d-flex flex-column align-items-center mb-4">
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>Current Info</Card.Title>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Username:</strong> {user.username ? user.username : "Unknown"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Email:</strong> {user.email ? user.email : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Phone Number:</strong> {user.phone ? user.phone : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        
                        <strong>Zipcode:</strong> {user?.address?.zipcode ?? null}

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Date of Birth:</strong> {user.dob ? user.dob : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <strong>Password:</strong> {user ? maskPassword() : null}
                    </div>
                </div>
            </Card.Body>
        </Card>
    </Col>

    <Col md={5} className="text-center d-flex flex-column align-items-center">
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>Update Info</Card.Title>
                <Form>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Control 
                                    type="text"  
                                    style={{ width: '150px', margin: '10px' }} 
                                    name = "username"
                                    value = {localUser.username} 
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
                                    // value = {localUser.password2} 
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
  </div>
);

}

export default Profile;
