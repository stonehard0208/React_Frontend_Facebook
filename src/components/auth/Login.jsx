import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserContext from './UserContext';


function Login() {
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
 const passwordRef = useRef(null);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserResponse = async() => {
      try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const user = await response.json();
          // console.log("response", response);
          // console.log(user);
          
          setUsers(user);
          setLoading(false);
      } catch (error) {
          console.error("There was an error fetching the users", error);
          setLoading(false);
      }
  }
  
    fetchUserResponse();
}, []);


  const handleSubmit = () => {
    const registeredUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    // console.log(username);
    // console.log(passwordRef.current.value);
    
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

    // console.log("users", users);
    const placeholderUser = users.find(u => u.username === username);
    // console.log("placeholderUser",placeholderUser);
    if (placeholderUser) {
        if (placeholderUser.address && placeholderUser.address.street === passwordRef.current.value) { 
            const newUser = {
                id: placeholderUser.id,
                username: placeholderUser.username,
                email: placeholderUser.email,
                phone: placeholderUser.phone,
                zipCode: placeholderUser.address.zipcode,
                password1: placeholderUser.address.street,
                password2: placeholderUser.address.street,
                status:placeholderUser.company.catchPhrase,
                company: {
                  catchPhrase:placeholderUser.company.catchPhrase
                }
            };
            // console.log("newuwer", newUser);
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser)); 
            navigate('/main');
            return;
        } else {
            alert('Wrong password');
            return;
        }
    }
    else{
      alert('User not found');
    }

    
}

if(loading){
  return <div>Loading...</div>
}


  return (
    <Card>
            <Card.Body>
                <Card.Title>Login Here</Card.Title>
                <Form>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3">
                            <Form.Group>
                              <Form.Label>Username</Form.Label>
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
                              <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-100" 
                                    required 
                                    ref={passwordRef} />
                            </Form.Group>
                        </div>
                    </div>
                    <Button onClick={handleSubmit} className="btn btn-primary mt-3" type='button'>Login</Button>
                </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
