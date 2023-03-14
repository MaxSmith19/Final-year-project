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

function App() {
  var [authenticated,setAuthenticated] = useState(false);

  const username = localStorage.getItem("ID")
  if(username===null){
    //TODO MAKE IT ONLY LOAD HEADER WHEN LOGGED IN
  }
  return (
    <>

    <Router>
      <div></div>
        <Header />
        <div className="justify-center flex ">
          
        <Routes>
          <Route path='/Login' element={<Login />} /> 
          <Route path='/Register' element={<Registration/>} />
          <Route path='/Accounts' element={<Accounts/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path="/" exact element={<Navigate replace to="/Login" />} /> 
        </Routes>
        </div>
    {/* <Footer /> */}
    </Router>

    
    </>
    );
}


export default App;
