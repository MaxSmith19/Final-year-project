import React from 'react'
import {Link} from 'react-router-dom'
import {FaSignInAlt}from 'react-icons/fa'

function Header() {
  return (
    <header >
        <div ><h1 className="text-3xl">Logo</h1></div>
        <div className='flex flex-row-reverse'>
            <ul className='flex flex-row-reverse float-right mt-5'>
                <li className="flex-initial w-32">
                    <Link to='/Register'>
                        <FaSignInAlt />Register
                    </Link>
                </li>
                <li className="flex-none w-32">
                    <Link to='/Login'>
                        <FaSignInAlt />Login
                    </Link>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header