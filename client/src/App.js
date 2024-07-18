import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
