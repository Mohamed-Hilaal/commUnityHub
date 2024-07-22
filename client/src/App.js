import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login'
import Registration from './Profile/Registration'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />}/>
          <Route path="/profile_registration" element={<Registration />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
