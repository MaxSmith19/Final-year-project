import React from 'react'
import {Link} from 'react-router-dom'
import {VscThreeBars, VscChevronRight, VscChevronLeft, VscAccount}from 'react-icons/vsc'
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
            <div className='grid grid-cols-3 grid-rows-1 gap-5'>
            <div className="m-3">
                    <button className={isNavOpen? "w-0 h-0" :"transition -rotate-180 duration-300"} onClick={()=>setNav(true)}> <VscThreeBars size={isNavOpen? "0":"50"}/></button>
                </div>
            <h1 className='m-3 text-5xl text-center'>Logo</h1>
            <div className="m-3">
                    <button className="float-right"> <VscAccount size="50"/></button>
                    <div className='btnAccount-options'>
                        <a href='#'>Account information</a>
                        <a href='#'>Settings</a>
                        <a href='#'>Log out</a>
                    </div>
                </div>
            </div>
        </div>

        <div className={isNavOpen? "overlay":"h-0"}>
        <button className={isNavOpen? "transition -rotate-180 duration-300 text-white" :"invisible"} onClick={()=>setNav(false)}> <VscChevronLeft className="m-5"size={isNavOpen? "50":"0"} /></button>

                <div className={isNavOpen? "overlay-content":"hidden"}> 
                    <a onClick={()=>setNav(false)}><Link to="/accounts">Accounts</Link></a>


                </div>
            </div>
            </div>
    </>
    )
}

export default Nav