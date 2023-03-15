import react from 'react'
import { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
const Dashboard = () =>{
    const [userID, setUserID] = useState('');

    useEffect(() => {
        getUserInfo();
      }, []);

      const getUserInfo = () => {
        axios.get('http://localhost:5000/api/Users', {
          params: {
            id: '6411cf394d954e0638bf9f77'
          }
        })
        .then((response) => {
          console.log(JSON.stringify(response.data));
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
                        <button onClick={()=>getUserInfo()}>buddon</button>
                    </div>
                    <hr/>
                    <div>
                        {/* topHalf */}
                        {/* todo image */}
                    </div> 
                    
                    <div>
                        {/* bottomHalf */}
                        <h2>Welcome </h2>
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