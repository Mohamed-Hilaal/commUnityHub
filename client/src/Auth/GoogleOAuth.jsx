import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'

const GoogleOAuth = ({clientID, handleLoginSuccess}) => {
       
  return (

    <GoogleOAuthProvider clientId={clientID}>
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuth;


