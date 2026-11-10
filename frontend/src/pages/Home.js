
import React from 'react';
import Users from '../components/Users';
import Navigation from '../components/Navigation';
import Posts from '../components/Posts';

const Home = () => {
  return (
    <div className="home-page">
      <Navigation />

      <main className="home-content">
        <h1>Welcome to the Home Page</h1>

        <Users />
        <Posts />
      </main>
    </div>
  );
};

export default Home;