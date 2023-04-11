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
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/animations.css";
import UserSettings from './pages/userSettings';
import ChangePassword from './pages/changePassword';
import Animation from './Components/Animation';
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isDarkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem("isDarkMode");
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });
  

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
  const handleIsLoading = (value) => {
    setLoading(value);
  };
  
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
        <div className="shadow-md"></div>
        }
        <div className="m-8 mt-32 appMQ">
          <Routes>
            {authenticated ? (
              <>
                <Route path="/Ledgers" element={<Ledgers handleIsLoading={handleIsLoading}/>} />
                <Route path="/Dashboard" element={<Dashboard handleIsLoading={handleIsLoading} />} />
                <Route path="/UserSettings" element={<UserSettings handleIsLoading={handleIsLoading} />} />
                <Route path="/Legislation" element={<Legislation handleIsLoading={handleIsLoading} />} />
                <Route path="/Marketing" element={<Marketing handleIsLoading={handleIsLoading} />} />
                <Route path="/Inventory" element={<Inventory handleIsLoading={handleIsLoading} />} />
              </>
            ) : (<Route path="/" exact element={<Navigate replace to="/Login"></Navigate>} />)}
            <Route path="/Login" element={<Login onLogin={handleLogin} handleIsLoading={handleIsLoading}/>} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Routes>
             
        </div>
        <Footer />
      </Router>
    <Animation isDarkMode={isDarkMode}/>
    </>
  );
}


export default App;
