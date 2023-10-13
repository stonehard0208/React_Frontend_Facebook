import React, { useState, useEffect } from 'react';
import { Navbar, Button, Form, Image, Col, Row, Card } from 'react-bootstrap';
import Post from './Post';
import { Link, useNavigate } from 'react-router-dom';

function Main({ user, onLogout }) {
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        history('/');
    }

    const handleRedirectProfile = () => {
        history('/profile');
    }
    
    return (
        <div>
    <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand as={Link} to="/main">Rice Social Network</Navbar.Brand>
        <div className='d-flex justify-content-end'>
        <Button variant="outline-light" className="mr-2" onClick={handleRedirectProfile}>Profile</Button>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        
        </div>
            
    </Navbar>
    <Post></Post>
</div>

    )
}
export default Main;