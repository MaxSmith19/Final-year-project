import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import * as qs from 'qs'
import {toast} from 'react-toastify'

const Registration = () => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeBusinessName = (e) => {
    setBusinessName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const dataArray = [email, businessName, password, confirmPassword];
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
        console.log("item is empty");
      }
    });

    if(nullFlag===false){
      var config = {
        method: 'post',
        url: 'http://localhost:5000/api/Users/',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        const token = response.data.token;
        document.cookie = "token=" + token +"; SameSite=Strict";
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        toast.success("Account successfully created")
      })
      .catch(function (error) {
        console.log(error.statusCode);
      });
      
    }
  }

  return (
    <div class="flex justify-center">
      <div class="max-w-lg mt-12 form-width form-length">
        <h1 class="block text-gray-700 font-bold text-center text-5xl mb-10">Register an account</h1>

        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <div class="mb-4">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="businessName">
              Name of business
            </label>
            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" type="text" onChange={onChangeBusinessName} value={businessName}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Email address
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={onChangeEmail} value={email}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={onChangePassword} value={password}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Confirm password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="password" onChange={onChangeConfirmPassword} value={confirmPassword}/>
          </div>
          <div>
            <h1 className="mb-5">{errorMessage}</h1>
          </div>
          <div>
            <h1 className="mb-5">Already have an account? Login <Link className="text-blue-600"to="/Login">here</Link></h1>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded " type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    )
}
export default Registration