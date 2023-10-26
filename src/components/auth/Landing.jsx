import React, { useState, useEffect } from 'react';
import Registration from './Registration';
import { Image } from 'react-bootstrap';
import Login from './Login';
import UserContext from './UserContext';
import axios from 'axios'

function Landing() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchUserResponse = async() => {
          try {
              const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
              console.log(response);
              // Check if response is undefined before accessing its properties
              if (response && !response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
  
              const user = await response.json();
              localStorage.setItem("userList", JSON.stringify(user));
              setUser(user);
          } catch (error) {
              console.error("There was an error fetching the users", error);
          }
      }
  
      fetchUserResponse();
  }, []);
  
  
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div className="container mt-5">

                <div className="d-flex justify-content-center mb-4">
                    <Image src="/logo.jpg" className="img-fluid" alt="Logo" />
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-md-5 mb-4">
                        <Registration />
                    </div>
                    <div className="col-md-5 mb-4">
                        <Login />
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default Landing;
