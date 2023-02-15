import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './Components/Header';
import Accounts from './pages/accounts';
import { Navigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import { useState } from 'react';

function App() {
  var [isLoggedIn,setIsLoggedIn] = useState(false);

  const username = localStorage.getItem("ID")
  console.log(username)
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
          <Route path="/" exact element={<Navigate replace to="/Login" />} /> 
        </Routes>
        </div>
    {/* <Footer /> */}
    </Router>

    
    </>
    );
}


export default App;
