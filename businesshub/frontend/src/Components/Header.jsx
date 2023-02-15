import React from 'react'
import {Link} from 'react-router-dom'
import {VscThreeBars, VscChevronRight, VscChevronLeft}from 'react-icons/vsc'
import {useState} from 'react'

const Nav = () => {
    var [isNavOpen,setNav] = useState(false);
    var [isLoggedIn,setIsLoggedIn] = useState(false);
    if(localStorage.getItem("ID")!==null){
        isLoggedIn=true; //NEEDS CHANGING ONCE LOCALSTORAGE CHANGED
    }
    return (
    <>
    <div className={isLoggedIn? "":"hidden "}>
            <div className="border bg-white h-20">
            <div className='grow'><h1 className='text-5xl mr-5 mt-2 float-right'>Logo</h1></div> {/*TODO Come up with name & Create LOGO*/}
            <div className='grid grid-cols-2 grid-rows-1 gap-5 m-5'>
                <div className="w-24">
                    <button className={isNavOpen? "w-0 h-0" :"transition -rotate-180 duration-300"} onClick={()=>setNav(true)}> <VscThreeBars size={isNavOpen? "0":"50"}/></button>
                </div>
            </div>
        </div>

        <div className={isNavOpen? "overlay":"h-0"}>
        <button className={isNavOpen? "transition -rotate-180 duration-300 text-white" :"invisible"} onClick={()=>setNav(false)}> <VscChevronLeft className="m-5"size={isNavOpen? "50":"0"} /></button>

                <div className={isNavOpen? "overlay-content":"hidden"}> 
                    <a onClick={()=>setNav(false)}><Link to="/Register">Register</Link></a>
                    <a onClick={()=>setNav(false)}><Link to="/Login">Login</Link></a>

                </div>
            </div>
            </div>
    </>
    )
}

export default Nav