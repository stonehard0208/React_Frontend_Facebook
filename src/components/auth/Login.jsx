import React, { useState, useEffect, useContext, useRef } from 'react';
// import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserContext from './UserContext';


function Login() {
  const history = useNavigate();

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');

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
    const registered = localStorage.getItem('user');
    const user = users.find(user => user.email === email);
    if (!user && !registered) {
      alert('User not found');
      return;
    }
    else{
      if (registered){
        if (JSON.parse(registered).password1 === passwordRef.current.value){
          history('/main');
      }
      else{
        console.log(registered)
        console.log(registered.password1, passwordRef.current.value)
        alert('Incorrect password');
        return;
      }
      
    }
    else{
      localStorage.setItem('userId', user.id);
      console.log(
        "user", user
      )
      setUser({
        name: user.name,
        email: user.email,
        phone: user.phone,
        zipCode: user.address.zipcode,

      });
      history('/main');
    }
  }
    

  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form>
        <div className="row">
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="email" placeholder="User email" style={{ width: '150px', margin: '10px' }} required onChange={e => (setEmail(e.target.value))}/>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" style={{ width: '150px' , margin: '10px' }} required ref={passwordRef}/>
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
