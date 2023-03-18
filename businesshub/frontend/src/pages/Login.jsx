import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import * as qs from 'qs'

const Login = (props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const data =  qs.stringify({
      'email': email,
      'password': password
    })

    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/Users/login/',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data : data
    };
    
    axios(config)
    .then((response) => {
      if (response.status === 200) {
        const token = response.data.token;
        document.cookie = "token=" + token +"; SameSite=Strict";
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        navigate("/Dashboard");
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.status === 401) {
        setErrorMessage("Email or password is incorrect");
        console.log(errorMessage);
      }

    });
    props.onLogin();

  }

  return(
    <div className="flex justify-center align-center ">
      <div className="flex justify-center align-center">
    <div className="max-w-lg mt-12 form-width form-length">
      <h1 className="block text-gray-700 font-bold text-center text-5xl mb-10">Login</h1>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full p-20" onSubmit={onSubmit}>
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
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
        </div>
        <div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <h1 className="mb-5">Don't have an account? Sign up <Link className="text-blue-600" to="/Register">here</Link></h1>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit" >Log in</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Login;
