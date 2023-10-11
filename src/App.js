import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

import Main from './components/main/Main';
import Profile from './components/profile/Profile';
import Landing from './components/auth/Landing';
import UserContext from './components/auth/UserContext';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <>
    <UserContext.Provider value = {{ user, setUser }}>
    <Router>
      <Routes>
        <Route path = "/" element = {<Landing />}></Route>
        <Route path = "/main" element = {<Main />}></Route>
        <Route path = "/profile" element = {<Profile />} ></Route>
    </Routes>
    </Router>
    </UserContext.Provider>
    

    </>
    
    
  );
}

export default App;
