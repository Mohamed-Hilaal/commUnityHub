import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import HttpClient from '../Http/HttpClient'
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '857121110130-puk3i7e1pv77ri5jqsmrumkp12add22c.apps.googleusercontent.com';

const GoogleOAuth = () => {

    const navigate = useNavigate();

    const handleLoginSuccess = async (credentialResponse) => {
      
      try{
        const response = await HttpClient.postData(
          'auth/google_oauth2',
          {
            credential: credentialResponse.credential
          }
        )

        if( response.status == 200){
          navigate('/profile_registration')
        }

        console.log('Server response:', response);
      }
      catch(error){
        console.error('Error sending credential to server:', error);
      }

    }

  return (

    <GoogleOAuthProvider clientId={CLIENT_ID}>
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


