import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import * as qs from 'qs'
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import emailjs from 'emailjs-com';

const Login = (props) => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [activeTab, setActiveTab] = useState("login");

  const navigate = useNavigate();
  emailjs.init('HqqR2U3h77ojWp2-j');
  useEffect(() => {
    //Check if the user is already logged in
    try{
    const userIDCookie = Cookies.get("token")
    if(userIDCookie!== undefined){
      navigate("/dashboard")
      toast.error("You are already logged in")
    }
    }catch(e){
      navigate("/Login")
    }
  },[])

  const sendEmail = (verification_link) => {
    emailjs.send('service_g7gnses', 'template_oo6c3rd', {
      to_name: email,
      from_name: 'FYPApp',
      verification_link: verification_link,
    }, 
    )
    .then((result) => {
    }, (error) => {
      console.log(error.text);
    });
  }

  const onSubmitRegistration = async (e) => {
    e.preventDefault();
    const dataArray = [email, businessName, password, confirmPassword];
    if(password !== confirmPassword || password === "" || confirmPassword === ""){
      toast.error("Please enter your passwords")
      return 
    }
    let nullFlag = false;
    const data =  qs.stringify({
      'email': email,
      'businessName': businessName,
      'password': password,
      'confirmPassword': confirmPassword
    });

    dataArray.forEach(function(item){
      if(item===""){
        nullFlag=true;
      }
    });

    if(nullFlag===false){
      var config = {
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_URL}/api/Users/`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data : data
      };
    try{      
      const response = await axios(config)
        const token = response.data.token;
        const verificationLink = `${process.env.REACT_APP_SERVER_URL}/api/Users/verifyUser?token=${token}`
        sendEmail(verificationLink)
        toast.success("An email has been sent, please verify your email")
        
    }catch(error) {
      console.log(error)
        toast.error(error);
      };
      
    }
  }
  const onSubmitLogin = (e) => {
    e.preventDefault();

    const data =  qs.stringify({
      'email': email,
      'password': password
    })

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/Users/login/`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data : data
    };
    
    axios(config)
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        const token = response.data.token;
        document.cookie = "token=" + token +"; SameSite=None; Secure";
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

        toast.success("Successfully Logged In");
        props.onLogin();
        if(response.data.isAdmin === true) {
          props.isAdmin(true)
          navigate("/AdminDashboard");
        }else{
            props.isAdmin(false)
        navigate("/Dashboard");
        }
      }
    })
    .catch((error) => {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
  });

  }
  const onSubmitPassword = async (e) => {
    e.preventDefault();

    if(email!==null){
      emailjs.send('service_g7gnses', 'template_pnu7hjv', {
        to_name: email,
        verification_link: `${process.env.REACT_APP_APP_URL}/changePassword`
      })
        .then((result) => {
          console.log('Email sent successfully:', result.text);
        })
        .catch((error) => {
          console.error('Email failed to send:', error);
        });
    }
  }
  const toggleTab = (tab) => {
    setActiveTab(tab);
    setBusinessName("")
    setPassword("")
    setEmail("")
    setConfirmPassword("")
  }

  const loginActive = activeTab === 'login';
  //true if the activetab is login
  const registerActive = activeTab === 'register';
  //true if the activetab is register
  const passwordActive = activeTab === 'password'

  return (
    <div className="flex justify-center align-center">
      <div className="max-w-lg mt-12 form-width form-length">
        <div className="flex justify-start">
          <div onClick={() => toggleTab('login')} className={`bg-white border px-6 py-3 cursor-pointer rounded-t-lg ${loginActive ? 'bg-white border text-black ' : 'text-gray-700 mt-3 '}`}>Login</div>
          <div onClick={() => toggleTab('register')} className={`bg-white border px-6 py-3 cursor-pointer rounded-t-lg  ${registerActive ? 'bg-white text-black ' : 'text-gray-700 mt-3 '}`}>Register</div>
        </div>

        {loginActive && (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full p-20" onSubmit={onSubmitLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                Email address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={(e) => setEmail(e.target.value)} value={email} required/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input id="pword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
            </div>
            <div>
              <h1 className="mb-5"><a className="text-blue-600" to="/changePassword" onClick={()=>toggleTab('password')()}>Forgot your password?</a></h1>
            </div>
            <div>
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSubmitLogin}>Log in</button>
            </div>
          </form>
        )}

        {registerActive && (
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitRegistration} autoComplete="off">
          <div class="mb-4">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="businessName">
              Name of business
            </label>
            <input id="businessName" class="shadow border rounded w-full py-2 px-3 text-gray-700" type="text" onChange={(e)=> setBusinessName(e.target.value)} value={businessName}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Email address
            </label>
            <input id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={(e)=> setEmail(e.target.value)} value={email}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Password
            </label>
            <input id="pword" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Confirm password
            </label>
            <input id="cPword" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="password" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}/>
          </div>
          <div>
            <h1 className="mb-5">{errorMessage}</h1>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded " type="submit">
              Submit
            </button>
          </div>
        </form>
        )}
        {passwordActive && (
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitPassword}>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/Login')}>
                </button>
              <div class="mb-6">
                <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
                  Email address
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
              </div>
              <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded " type="submit">
                  Submit
                </button>
              </div>
            </form>
        )}
      </div>
    </div>
  );
}

export default Login;