import React, {Component} from 'react'
import { render } from 'react-dom'
import {Link} from 'react-router-dom'
import {VscThreeBars}from 'react-icons/vsc'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Footer = () => {

  return (
    <div className="bg-gray-800 px-4 py-4 footer bottom-0 right-0 w-full">
      <div className="mx-auto grid grid-cols-3">
        <div>
          <h1>test</h1>
        </div>
        <div className="text-center text-gray-400">
          <div className="h-1/2">

          </div>
          <div className="h-1/2">
            <h1>© 2023 Max Smith Studios</h1>
          </div>

        </div>
        <div className="float-right">
          <h1 className= "text-gray-400 text-center text-3xl mb-3">Navigate</h1>
          <ul>
            <li className="text-right text-gray-400"><Link to="/Dashboard">Dashboard</Link></li>
            <li className="text-right text-gray-400"><Link to="/Ledgers">Ledgers</Link></li>
            <li className="text-right text-gray-400"><Link to="/Inventory">Inventory</Link></li>
            <li className="text-right text-gray-400"><Link to="/Marketing">Marketing</Link></li>
            <li className="text-right text-gray-400"><Link to="/Legislation">Legislation</Link></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Footer;