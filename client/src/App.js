
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import List from './components/List';
import React, { useState, useEffect } from "react";
import Owned from './components/Owned';
import BuyList from './components/BuyList';

function App() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (sessionStorage.getItem("User")) {
      setUserData(JSON.parse(sessionStorage.getItem("User")));
    }
  }, []);
  return (



    <Router>
      <Nav />



      <Routes>
        <Route exact path="/" element={<List />} />
        <Route exact path="/profile" element={<Dashboard
          user={userData} />} />

        <Route exact path="/stocks" element={<List />} />
        <Route exact path="/buylist" element={<BuyList
          userId={userData.id} />} />

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/ownstocks" element={<Owned
          user={userData.id} />} />


      </Routes>
    </Router>



  );
}

export default App;
