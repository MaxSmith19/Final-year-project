import React, {Component} from 'react'
import { render } from 'react-dom'
import {Link} from 'react-router-dom'
import {VscThreeBars}from 'react-icons/vsc'
import {useState} from 'react'

var {navOpen,navClosed} = useState;

export default class Footer extends Component {
  render() {
    return (
    <div className="border border-b-2 bg-black">
        <div className='flex flex-row-reverse'></div>
    </div>
    )
    }
}
