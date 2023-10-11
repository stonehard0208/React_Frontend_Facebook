// src/Login.jsx

import React from 'react';
// import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const history = useNavigate();

  const handleSubmit = () => {
    history('/main');

  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form>
        <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="text" placeholder="User name" style={{ width: '150px', margin: '10px' }} required/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" style={{ width: '150px' , margin: '10px' }} required/>
                </Form.Group>
                </div>
            </div>
            <Button onClick = {handleSubmit}className="btn btn-primary mt-3">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
