import react from 'react'
import { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { RiAccountBoxFill } from 'react-icons/ri';

const Legislation = () =>{

    return(
            <div className="grid gap-6 md:grid-rows-3 lg:grid-rows-3 xl:grid-cols-3">
                <div className="bg-white h-96 w-full m-auto rounded-xl shadow-2xl p-2 flex-1 col-span-3"> 
                  <h1 className="text-3xl">Need help learning about the expectations of your business? </h1>
                </div>

                <div className="bg-white h-96 w-10/12 m-auto rounded-xl shadow-2xl p-2 text-left text-xl">
                    <h1 className="text-5xl mb-2">Personal allowance</h1>
                    <hr />
                    <p>Personal allowance is an amount of money provided by the government which you dont need to pay tax for! <br /> <br /> </p>
                    <p><strong>The personal allowance is: £12,570 each year </strong> <br /> <br /></p>
                    <p>Therefore, with a total income of less than £12,570, you do </p>
                </div>

                <div className="bg-white h-96 w-10/12 m-auto rounded-xl shadow-2xl p-2">
                    <h1 className="text-5xl ">Income tax</h1>
                    <hr />
                </div>

                <div className="bg-white h-96 w-10/12 m-auto rounded-xl shadow-2xl p-2">
                    <h1 className="text-5xl "></h1>
                    <hr />
                </div>

            </div>
        )
}
export default Legislation