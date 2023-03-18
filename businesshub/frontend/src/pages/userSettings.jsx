import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import * as qs from 'qs'

const UserSettings = () => {
  const [businessName, setBusinessName] = useState('')
  const [businessLogo, setBusinessLogo] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();
    const userIDCookie = document.cookie.split("=")[1];
    const token = userIDCookie.split(";")[0];
    
    let data = qs.stringify({
      'businessName': businessName,
      'businessLogo': businessLogo
    });

    // if(businessLogo === ''){
    //   data.businessLogo = localStorage.getItem('businessLogo')
    // }else{
    //   data.businessLogo = businessLogo
    // }
    // if(businessName === ''){
    //   data.businessName = localStorage.getItem('businessName')
    // }else{
    //   data.businessName = businessName
    // }

    
  
  let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/api/Users/update',
      headers: { 
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
  };
  
    axios(config)
    .then(function (response) {
      console.log(response.data)
        localStorage.setItem('businessName', response.data.businessName);
        localStorage.setItem('businessLogo', response.data.businessLogo);
        //figure this out
    })
    .catch(function (error) {
        console.log(error);
    });
  
  }

  return(
    <div className="flex justify-center">
    <div className="max-w-lg mt-12 form-width form-length">
      <h1 className="block text-gray-700 font-bold text-center text-5xl mb-10">Your Account</h1>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full p-20" onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Name of business
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={(e) => setBusinessName(e.target.value)} value={businessName}/>
        </div>
        <formControl>
        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Business Logo
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="file" onChange={(e) => setBusinessLogo(e.target.value)} value={businessLogo} />
        </div>
        </formControl>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit" >Save changes</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UserSettings;
