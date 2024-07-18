import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css'
import axios from 'axios';

const Login = () => {
  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/google_oauth2', {}, { withCredentials: true });
      window.location.href = response.request.responseURL;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="title">
        <h1 className="community">
          CommUnity<span className="hub">Hub</span>
          <span className="dot">.</span>
        </h1>
      </div>

      <div className="content-wrapper">
        <h2 className="motto">
          Where Mentors <span>Inspire</span>, Creators <span>Innovate</span>, Learners <span>Thrive</span>, Investors{' '}
          <span>Invest</span> and Entrepreneurs <span>Grow.</span>
        </h2>

        <div className="google-signin-container">
          <form onSubmit={handleGoogleSignIn} className="google-signin-form">
            <button type="submit" className="btn btn-primary google-signin-btn" id="signIn">
              <FontAwesomeIcon icon="fa-brands fa-google" />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
