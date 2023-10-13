import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserContext from './UserContext';


function Login() {
  const history = useNavigate();

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
 const passwordRef = useRef(null);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserResponse = async() => {
      try{
        const response = await axios(`https://jsonplaceholder.typicode.com/users`);
        setUsers(response.data);
      }
      catch(error){
        console.log('Error: ', error)
      }

    }

    fetchUserResponse();
    
  }, []);

  const handleSubmit = () => {
    const registeredUser = JSON.parse(localStorage.getItem('user'));

    
    if (registeredUser && registeredUser.username === username) {
        if (registeredUser.password1 === passwordRef.current.value) {
            setUser(registeredUser);
            history('/main');
            return;
        } else {
            alert('Wrong password');
            return;
        }
    }

    
    const placeholderUser = users.find(u => u.username === username);
    if (placeholderUser) {
        if (placeholderUser.address && placeholderUser.address.street === passwordRef.current.value) { 
            const newUser = {
                id: placeholderUser.id,
                username: placeholderUser.username,
                email: placeholderUser.email,
                phone: placeholderUser.phone,
                zipCode: placeholderUser.address.zipcode,
                password1: placeholderUser.address.street 
            };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser)); 
            history('/main');
            return;
        } else {
            alert('Wrong password');
            return;
        }
    }

    alert('User not found');
}


  return (
    <Card>
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="User name" 
                                    className="w-100" 
                                    required 
                                    onChange={e => (setUsername(e.target.value))} />
                            </Form.Group>
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-100" 
                                    required 
                                    ref={passwordRef} />
                            </Form.Group>
                        </div>
                    </div>
                    <Button onClick={handleSubmit} className="btn btn-primary mt-3">Login</Button>
                </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
