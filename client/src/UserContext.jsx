import React, { createContext, useState, useEffect } from 'react';
import HttpClient from './Http/HttpClient';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [currentUserDetails, setCurrentUserDetails] = useState({});
    
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await HttpClient.getData("/auth/get_current_user_details")
                if (response.payload && response.payload.current_user_id) {
                    setCurrentUserDetails(response.payload);
                }
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };
        console.log("Fetching user details")
        fetchUserDetails();
    }, []);

  return (
    <UserContext.Provider value={{ currentUserDetails, setCurrentUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};