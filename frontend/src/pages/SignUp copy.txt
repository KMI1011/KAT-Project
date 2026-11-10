import React, { useState } from 'react';
import './SignUp.css';
import Navigation from '../Components/Navigation';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, SetProfileImage] = useState(null);
    const [bio, setBio] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username || !password || !profileImage) {
            alert('Please fill in all required fields!');
            return;
        }


      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('profileImage', profileImage);
      formData.append('bio', bio);

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

              const data = await response.json();
              console.log('Signup successful:', data);
              

              //reset signup form
              setUsername('');
              setPassword('');
              SetProfileImage(null);
              setBio('');

              // Navigate to login page after successful signup
              navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
      <div className="signup-container">
        <form onSubmit={handleSignUp} className="signup-form">
          <h2><FontAwesomeIcon icon={faSpider} /> Sign Up</h2>
          <div>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="profile-image">Profile Image:</label>
            <input
              type="file"
              id="profile-image"
              placeholder="Profile Image"
              required
              accept="image/*"
              onChange={(e) => SetProfileImage(e.target.files[0])}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <p>Already have an account? <a href="/">Login</a></p>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
};

export default SignUp;