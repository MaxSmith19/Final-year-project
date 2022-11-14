import React, {Component} from 'react'
import { render } from 'react-dom'
import {Link} from 'react-router-dom'
import {VscThreeBars}from 'react-icons/vsc'
import {useState} from 'react'

var {navOpen,navClosed} = useState;

export default class Header extends Component {
  render() {
    return (
    <header className="border border-b-2 mb-24 bg-white">
        <div className='flex flex-row-reverse'>
            <div className='grow'><h1 className='text-5xl mr-5 mt-2 float-right'>Logo</h1></div> {/*TODO Come up with name & Create LOGO*/}
            <ul className='grid grid-cols-2 grid-rows-1 gap-5 m-5'>
                <li className="w-24">
                    <Link className="" to='/Register'>
                        <span onClick={navOpen=true}><VscThreeBars size={32}/></span>
                    </Link>
                </li>
            </ul>
        </div>
    </header>
    )
    }
}
