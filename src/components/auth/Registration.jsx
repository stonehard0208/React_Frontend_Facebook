import React, { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import UserContext from './UserContext';



function Registration() {

 const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    accName: '',
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

//
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
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="User name" 
                    style={{ width: '150px', margin: '10px' }}
                    name = "accName"
                    value = {formData.accName}
                    onChange={handleChange}
                    pattern="[a-zA-Z][a-zA-Z0-9]*" 
                    title="Account name can only be upper or lower case letters and numbers, but may not start with a number." 
                    required 
                     />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    style={{ width: '150px', margin: '10px' }}
                    name = "email"
                    value = {formData.email}
                    onChange={handleChange}
                    required 
                     />
                </Form.Group>
                </div>
            
               
            </div>
            <div className="row">
            <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="Display Name(optional)" 
                    style={{ width: '150px' , margin: '10px' }}
                    name="disName"
                    value={formData.disName}
                    onChange={handleChange}
                     />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="Phone Number" 
                    style={{ width: '150px' , margin: '10px' }}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="^\d{3}-\d{3}-\d{4}$" 
                    title="Format is xxx-xxx-xxxx"
                    required
                     />
                </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                    type="date" 
                    placeholder="Date of Birth"
                    name = "dob"
                    value = {formData.dob}
                    onChange={handleChange}
                    style={{ width: '150px' , margin: '10px' }}
                    required />
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="ZipCode" 
                    style={{ width: '150px' , margin: '10px' }}
                    name = "zipCode"
                    value = {formData.zipCode}
                    onChange={handleChange}
                    required 
                    pattern="[0-9]{5}" 
                    title="Format is 5 digit numbers"
                     />
                </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control 
                    type="password" 
                    placeholder="User Password" 
                    style={{ width: '150px' , margin: '10px' }} 
                    value = {formData.password1}
                    onChange={handleChange}
                    name="password1" 
                    required/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                <Form.Control 
                    type="password" 
                    placeholder="User Password" 
                    style={{ width: '150px' , margin: '10px' }} 
                    value = {formData.password2}
                    onChange={handleChange}
                    name="password2" 
                    required/>
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
