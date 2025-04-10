import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext';
import { useState, useEffect   } from 'react';
import Login from './Auth/Login'
import Registration from './Profile/Registration'
import Dashboard from './Dashboard'
import UnityBoard from './Unity/UnityBoard'
import './App.css'

function App() {

  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Login/>}/>
            <Route path="/profile_registration" element={<Registration/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/unityBoard" element={<UnityBoard/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
