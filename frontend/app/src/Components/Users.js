import React from 'react';
import './Users.css';

const Users = ({ users }) => {

    return (
      <div className="image-icons-container">
      <div className="image-icon"><img src={require('../images/1.jpg')} alt="Icon 1" /></div>
      <div className="image-icon"><img src={require('../images/7.jpg')} alt="Icon 2" /></div>
      <div className="image-icon"><img src={require('../images/2.jpg')} alt="Icon 3" /></div>
      <div className="image-icon"><img src={require('../images/6.jpg')} alt="Icon 4" /></div>
      <div className="image-icon"><img src={require('../images/3.jpg')} alt="Icon 5" /></div>
      </div>

    );
}

export default Users;