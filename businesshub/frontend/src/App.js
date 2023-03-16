import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './Components/Header';
import Accounts from './pages/accounts';
import Dashboard from './pages/dashboard'
import { Navigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./animations.css";
import UserSettings from './pages/userSettings';

function App() {
  var [authenticated,setAuthenticated] = useState(false);

  const username = localStorage.getItem("ID")
  if(username===null){
  }
  const containers = document.querySelectorAll('.bodyAnimation');
  containers.forEach((container) => {
    const randomTranslate = Math.floor(Math.random() * 500) + 1;
    const randomDelay = Math.floor(Math.random() * 10) + 's';
    container.style.transform = `translateY(${randomTranslate}%)`;
    container.style.animationDelay = randomDelay;
  });
  return (
    <>

    <Router>
        <Header />
        <div className="m-12">
          
        <Routes>
          <Route path='/Login' element={<Login />} /> 
          <Route path='/Register' element={<Registration/>} />
          <Route path='/Accounts' element={<Accounts/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/UserSettings' element={<UserSettings/>} />
          <Route path="/" exact element={<Navigate replace to="/Login" />} /> 
        </Routes>
        </div>
    {/* <Footer /> */}
    </Router>
    <div className='animationContainer'>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>
      <div className="bodyAnimation"> </div>

    </div>
    </>
    );
}


export default App;
