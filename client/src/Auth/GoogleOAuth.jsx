import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import HttpClient from '../Http/HttpClient'
import { useNavigate } from 'react-router-dom';


const GoogleOAuth = () => {
    
    const [clientID, setClientID] = React.useState('')
  
    const navigate = useNavigate();

    const getClientId = async () =>{

      try{
        
        const data = await HttpClient.getData('auth/getClientID')
        setClientID(data.clientID)

      }catch(error){
        console.error('Error fetching clientID :', error);
      }

    }

    React.useEffect(() => {
      getClientId()
    }, [])

    const handleLoginSuccess = async (credentialResponse) => {
      
      try{
        const response = await HttpClient.postData(
          'auth/google_oauth2',
          {
            credential: credentialResponse.credential
          }
        )

        if( response.status == "success"){
          navigate('/profile_registration')
        }

        console.log('Server response:', response);
      }
      catch(error){
        console.error('Error sending credential to server:', error);
      }

    }

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


