import React, { useContext } from 'react';
import GoogleOAuth from './GoogleOAuth'
import './Login.css'
import HttpClient from '../Http/HttpClient'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {

  const [clientID, setClientID] = React.useState('')
  const { setCurrentUserDetails } = useContext(UserContext);
  
  const navigate = useNavigate();

  const getClientId = async () =>{

    try{
      
      const data = await HttpClient.getData('auth/client_id')
      setClientID(data.clientID)

    }catch(error){
      console.error('Error fetching clientID :', error);
    }

  }

  React.useEffect(() => {
    getClientId()
  }, [])

  const handleLoginSuccess = async (credentialResponse) => {
    
    console.log("Creds:", credentialResponse.credential)
    try{
      const response = await HttpClient.postData(
        'auth/google_oauth2',
        {
          credential: credentialResponse.credential
        }
      )

      if( response.status == "success" && !response.userExists){
        navigate('/profile_registration', {state: {payload: response.payload}})
      }else if(response.status == "success" && response.userExists){
        let payload = response.payload
        setCurrentUserDetails({current_user_id: payload.current_user_id, current_user_name: payload.current_user_name, current_unity_id: payload.current_unity_id, current_unity_name: payload.current_unity_name})
        navigate('/dashboard')
      }

      console.log('Server response:', response);
    }
    catch(error){
      console.error('Error sending credential to server:', error);
    }

  }

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

            <GoogleOAuth clientID={clientID} handleLoginSuccess={handleLoginSuccess}/>
        </div>
      </div>
    </div>
  );
};

export default Login;