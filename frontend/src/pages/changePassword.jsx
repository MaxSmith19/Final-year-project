import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import * as qs from 'qs'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { VscChevronLeft } from 'react-icons/vsc';
const ChangePassword = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const navigate = useNavigate();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword || password === "" || confirmPassword === "" ) {
        setErrorMessage("Passwords do not match")
        toast.error("Passwords do not match")
        return;
    }

    const data =  qs.stringify({
        'email': email,
        'password': password
    })

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/Users/changePassword`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data : data
    };
    
    try {
        const response = await axios(config);
        toast.success("Password successfully changed");
    } catch (error) {
        toast.error(error.response.data);
    }
}


  return (
    <div class="flex justify-center">

      <div class="max-w-lg mt-12 form-width form-length">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/Login')}>
                <VscChevronLeft />
            </button>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Email address
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              New Password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Confirm password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
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
      </div>
    </div>

    )
}
export default ChangePassword