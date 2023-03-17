import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './Components/Header';
import Accounts from './pages/accounts';
import Dashboard from './pages/dashboard'
import { Navigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./animations.css";
import UserSettings from './pages/userSettings';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const unpackCookie = () => {
    const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (authCookie !== undefined) {
      setAuthenticated(true);
      console.log("Authenticated");
    } else {
      setAuthenticated(false);
      console.log("Not Authenticated");
    }
  };

  useEffect(() => {
    unpackCookie();
  }, []);

  const handleLogout = () => {
    setAuthenticated(false);
    console.log(authenticated)
  }

  const handleLogin = () => {
    setAuthenticated(true);
    console.log(authenticated)
  }

  return (
    <>
      <Router>
        {authenticated ? (
        <Header authenticated={authenticated} onLogout={handleLogout}/>
        ): null}
        <div className="m-12">
          <Routes>
            {authenticated ? (
              <>
                <Route path="/Accounts" element={<Accounts />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/UserSettings" element={<UserSettings />} />
              </>
            ) : (<Route path="/" exact element={<Navigate replace to="/Login"></Navigate>} />)}
            <Route path="/Login" element={<Login onLogin={handleLogin}/>} />
            <Route path="/Register" element={<Registration />} />
          </Routes>
        </div>
      </Router>
      <div className="animationContainer">
      </div>
    </>
  );
}


export default App;
