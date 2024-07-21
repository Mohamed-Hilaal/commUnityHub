import React from 'react';
import GoogleOAuth from './GoogleOAuth'
import './Login.css'
import axios from 'axios';

const Login = () => {
  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
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

            <GoogleOAuth/>
        </div>
      </div>
    </div>
  );
};

export default Login;