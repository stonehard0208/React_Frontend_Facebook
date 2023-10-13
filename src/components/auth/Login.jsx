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
    let user = users.find(u => u.username === username); // Declare user here

    const registered = localStorage.getItem('user');
    if (registered) {
        if (JSON.parse(registered).password1 === passwordRef.current.value) {
            localStorage.setItem('user', JSON.stringify({
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                zipCode: user.address.zipcode,
                password1: JSON.parse(registered).password1
            }));

            setUser({
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                zipCode: user.address.zipcode,
                password1: JSON.parse(registered).password1
            });
            history('/main');
        } else {
            alert('Wrong password');
            return;
        }
    } else if (user) {
        if (user.address.street !== passwordRef.current.value) {
            alert('Wrong password');
            return;
        }
        localStorage.setItem('user', JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            zipCode: user.address.zipcode,
            password1: user.address.street
        }));

        setUser({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            zipCode: user.address.zipcode,
            password1: user.address.street
        });
        history('/main');
    } else {
        alert('User not found');
    }
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
