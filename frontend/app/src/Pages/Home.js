import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from '../Components/Users'
import Navigation from "../Components/Navigation";
import Posts from '../Components/Posts';


const Home = () => {
  return (
    <div>
      <Navigation />
      <h1>Welcome to the Home Page</h1>
      <Users />
      <Posts />
    </div>
  );
};

export default Home;
