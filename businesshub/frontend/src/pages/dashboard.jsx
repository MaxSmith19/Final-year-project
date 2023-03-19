import react from 'react'
import { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { RiAccountBoxFill } from 'react-icons/ri';

const Dashboard = () =>{
    const [userInfo, setUserInfo] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const [userID, setUserID] = useState('');

    useEffect(() => {
        getUserInfo();
        //use effect runs the command on loading
      }, []);

      const getUserInfo = () => {
        const userIDCookie = document.cookie.split("=")[1];
        const token = userIDCookie.split(";")[0];

        axios.get('http://localhost:5000/api/Users/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          var responseData = {
            businessName: response.data[0].businessName,
            email: response.data[0].email,
            businessLogo: response.data[0].businessLogo
          }

          setBusinessName(responseData.businessName);
          setUserEmail(responseData.email);
          setImageSrc(responseData.businessLogo);
          localStorage.setItem('businessName', responseData.businessName);
          localStorage.setItem('businessLogo', responseData.businessLogo);
          
        })
        .catch((error) => {
          console.log(error);
        });
        
      }
      
    return(
            <div className="grid gap-6 h-full md:grid-rows-3 lg:grid-rows-3 xl:grid-cols-3">
                <div className="bg-white h-full w-full m-auto rounded-xl shadow-2xl p-2">
                    <div>
                        {/* title */}
                        <h1 className="text-5xl ">Your account</h1>
                    </div>
                    <hr/>
                    <div>
                        {/* topHalf */}
                        {/* todo image */}
                        <img src={imageSrc} alt="jdja" />
                        <hr/>
                    </div> 
                    
                    <div className="w-full h-auto mt-4">
                        {/* bottomHalf */}
                        <RiAccountBoxFill className='float-left' size="32"/><h2 className="text-2xl">Welcome {businessName}</h2>
                    </div>
                </div>
                <div className="bg-white h-96 w-10/12 m-auto rounded-xl shadow-2xl p-2">
                    <h1 className="text-5xl ">Accounts</h1>
                    <hr />
                </div><div className="bg-white h-96 w-10/12 m-auto rounded-xl shadow-2xl p-2">
                    <h1 className="text-5xl ">Marketing</h1>
                    <hr />
                </div>

            </div>
        )
}
export default Dashboard