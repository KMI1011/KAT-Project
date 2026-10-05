import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try{
        const response = await fetch('/users.json');
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const users = await response.json();
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
      if (user) {
        alert('Login successful!');
        navigate('/Home');
          setError("");
      } else {
        setError("Invalid username or password");
      }
      } catch (err) {
        console.error("Error fetching users data:", err);
        setError('There was an error with the log in process.');
      }
    }; 

    return (
      <div>
        <div className="login-container">

          <form className="login-form" onSubmit={handleLogin}>
            <h2>Log In</h2> 
          
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          </form>
        {error &&<p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div> //Final wrapper div  
    );
    
};


    export default Login; 
