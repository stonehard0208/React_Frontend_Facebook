import React, { useState } from 'react';
import Registration from './Registration';
import { Image } from 'react-bootstrap';
import Login from './Login';
import UserContext from './UserContext';

function Landing() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value = {{ user, setUser}} >
      <div className="container mt-5">
      
      <div className="d-flex justify-content-center mb-4">
        <Image src="/logo.jpg" width="400px" height='200px' />
      </div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <Registration />
        </div>
        <div className="col-md-5">
          <Login />
        </div>
      </div>
    </div>
    </UserContext.Provider>
    
  );
}

export default Landing;
