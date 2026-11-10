
import React, { useEffect, useState } from 'react';
import './Login.css';

function LoginSignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const loginText = document.querySelector('.title.login');
    const signupText = document.querySelector('.title.signup');

    if (loginText && signupText) {
      if (isLogin) {
        loginText.style.marginLeft = '0%';
        signupText.style.marginLeft = '0%';
      } else {
        loginText.style.marginLeft = '-50%';
        signupText.style.marginLeft = '0%';
      }
    }
  }, [isLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:8080/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        // Store basic user information for the frontend
        const currentUser = {
          username: username,
          profile: null,
        };

        localStorage.setItem(
          'currentUser',
          JSON.stringify(currentUser)
        );

        window.location.replace('/home');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Unable to connect to the server.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:8080/api/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (response.ok) {
        alert('Signup successful! You can now log in.');
        setIsLogin(true);
        setPassword('');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Unable to connect to the server.');
    }
  };

  return (
    <div className="login-background">
      <div className="container login-page">

        <div className="title-text">
          <div className="title login">Login</div>
          <div className="title signup">Signup</div>
        </div>

        <div className="form-container">

          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={() => setIsLogin(true)}
            />

            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={() => setIsLogin(false)}
            />

            <label htmlFor="login" className="slide login">
              Login
            </label>

            <label htmlFor="signup" className="slide signup">
              Signup
            </label>

            <div className="slider-tab"></div>
          </div>

          <div className="form-inner">

            {isLogin ? (
              <form className="login" onSubmit={handleLogin}>

                <div className="field">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="pass-link">
                  <a href="#">Forgot password?</a>
                </div>

                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>

                <div className="signup-link">
                  Not a member?{' '}
                  <a
                    href="#signup"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLogin(false);
                    }}
                  >
                    Signup now
                  </a>
                </div>

              </form>
            ) : (
              <form className="signup" onSubmit={handleSignup}>

                <div className="field">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>

              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;