import React, { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import UserContext from './UserContext';



function Registration() {

 const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    id: 11,
    username: '',
    disName: '',
    email: '',
    phone: '',
    dob: '',
    zipCode: '',
    password1: '',
    password2: '',
    timeStamp: Date.now()
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevstate => ({
        ...prevstate,
        [name] : value
    }))

  }
const isAdult = () => {
    const { dob } = formData;
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
        const { password1, password2 } = formData;
        return password1 === password2;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isAdult()) {
            alert("User must be 18 years or older to register");
            return;
        }
        
        if (!isPasswordEqual()) {
            alert("Confirmation password does not match the input password");
            return;
        }

        let existingUsers = JSON.parse(localStorage.getItem('userList') || "[]");
        localStorage.setItem('userList', JSON.stringify([...existingUsers, formData]));


        setUser(formData);
        localStorage.setItem('user', JSON.stringify(formData));

        history('/main');


    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Register</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="User name" 
                                    className="w-100"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    pattern="[a-zA-Z][a-zA-Z0-9]*" 
                                    title="Account name can only be upper or lower case letters and numbers, but may not start with a number." 
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Email" 
                                    className="w-100"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Display Name(optional)" 
                                    className="w-100"
                                    name="disName"
                                    value={formData.disName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Phone Number" 
                                    className="w-100"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    pattern="^\d{3}-\d{3}-\d{4}$" 
                                    title="Format is xxx-xxx-xxxx"
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="date" 
                                    placeholder="Date of Birth"
                                    className="w-100"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="ZipCode" 
                                    className="w-100"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required 
                                    pattern="[0-9]{5}" 
                                    title="Format is 5 digit numbers"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="password" 
                                    placeholder="User Password" 
                                    className="w-100"
                                    value={formData.password1}
                                    onChange={handleChange}
                                    name="password1" 
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="password" 
                                    placeholder="User Password" 
                                    className="w-100"
                                    value={formData.password2}
                                    onChange={handleChange}
                                    name="password2" 
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Button type='submit' className="btn btn-primary mt-3">Register</Button>
                </Form>
            </Card.Body>
        </Card>
    );
    
}

export default Registration;
