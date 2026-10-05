import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Components/Navigation';



const Settings = () =>{
  return(
    <div>
      <Navigation />
      <h1>Settings</h1>
    </div>
  )
}


export default Settings;