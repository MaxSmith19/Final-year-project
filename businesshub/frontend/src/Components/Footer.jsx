import React, {Component} from 'react'
import { render } from 'react-dom'
import {Link} from 'react-router-dom'
import {VscThreeBars}from 'react-icons/vsc'
import {useState} from 'react'

var {navOpen,navClosed} = useState;


const Footer = () => {
  return (
    <div className="bg-gray-800 px-4 py-24">
      <div className="mx-auto grid grid-cols-3">
        <div>
          <h1>test</h1>
        </div>
        <div>
        <h1>test</h1>

        </div>
        <div>
        <h1>test</h1>

        </div>
      </div>
    </div>
  );
};

export default Footer;