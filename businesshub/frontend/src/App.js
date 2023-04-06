import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './Components/Header';
import Ledgers from './pages/Ledgers';
import Dashboard from './pages/dashboard'
import Legislation from './pages/legislation';
import Marketing from './pages/marketing'
import Inventory from './pages/inventory'
import { Navigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import { useEffect, useState, CSSProperties } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/animations.css";
import UserSettings from './pages/userSettings';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isDarkMode, setDarkMode] = useState(Boolean(localStorage.getItem("isDarkMode")))
  const [isLoading, setLoading] = useState(true)
  const unpackCookie = () => {
    const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (authCookie !== undefined) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  
  useEffect(() => {
    
    unpackCookie();
  }, []);

  const animationContainer = document.querySelectorAll('.animationContainer li');
  const contentContainers = document.querySelectorAll('div')

  useEffect(() => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    if (isDarkMode) {
      body.classList.add('darkMode');
      animationContainer.forEach(container => container.classList.add('darkMode'))
      contentContainers.forEach(container => container.classList.add("darkmode"))
    } else {
      body.classList.remove('darkMode');
      animationContainer.forEach(container => container.classList.remove('darkMode'))
      contentContainers.forEach(container => container.classList.remove("darkmode"))
    }
  }, [isDarkMode]);
  //When isDarkMode is changed in any way, the above useEffect takes place.

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  }

  const handleLogin = () => {
    setAuthenticated(true);
  }
  const handleIsLoading = () => {
    setLoading(isLoading)
  }
  

  animationContainer.forEach((container) => {
    const randomDelay = Math.floor(Math.random() * 25) + 1;
    const randomLeft = Math.floor(Math.random() * 100) + 1;
    const randomHeight = Math.floor(Math.random() * 100) + 1
    const randomDuration = Math.floor(Math.random() * 30) + 1;
    container.style.animationDelay = `${randomDelay}s`;
    container.style.left = `${randomLeft}%`;
    container.style.height = `${randomHeight}px`;
    container.style.width = `${randomHeight}px`;
    container.style.animationDuration = `${randomDuration}s`;
  });
  return (
    <>
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDarkMode ? "light" : "dark"}
          />
      <Router>
        {authenticated ? (
        <Header authenticated={authenticated} onLogout={handleLogout} onToggleDarkMode={toggleDarkMode} isLoading={isLoading}/>
        ): 
        <div className="border bg-white h-20 shadow-md"></div>
        }
        <div className="m-8 mt-32 appMQ">
          <Routes>
            {authenticated ? (
              <>
                <Route path="/Ledgers" element={<Ledgers isLoading={handleIsLoading}/>} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/UserSettings" element={<UserSettings />} />
                <Route path="/Legislation" element={<Legislation />} />
                <Route path="/Marketing" element={<Marketing />} />
                <Route path="/Inventory" element={<Inventory />} />
              </>
            ) : (<Route path="/" exact element={<Navigate replace to="/Login"></Navigate>} />)}
            <Route path="/Login" element={<Login onLogin={handleLogin}/>} />
            <Route path="/Register" element={<Registration />} />
          </Routes>
             
        </div>
        <Footer />
      </Router>
      <ul className="animationContainer">
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
        <li className=""> </li>
    </ul>
    </>
  );
}


export default App;
