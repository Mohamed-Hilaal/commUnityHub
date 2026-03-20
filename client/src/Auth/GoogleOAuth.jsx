import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './../config';

const GoogleOAuth = ({handleLoginSuccess}) => {
    console.log("CLient id : ", GOOGLE_CLIENT_ID)   
  return (
    
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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


