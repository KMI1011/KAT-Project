import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Explore from './Pages/Explore';
import Login from './Pages/Login';
import HelloWorld from './Components/HelloWorld';
import Button from './Components/Button';
import Users from './Components/Users';
import Posts from './Components/Posts';
import AddPost from './Pages/AddPost';
import SignUp from './Pages/SignUp';

import './App.css';

const AuthLayout = ({ children }) => (
  <div>
    <Navigation />
    {children}
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;



/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

