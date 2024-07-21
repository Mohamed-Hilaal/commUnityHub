import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login'
import Registration from './Profile/Registration'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />}/>
          <Route path="/profile_registration" element={<Registration />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
