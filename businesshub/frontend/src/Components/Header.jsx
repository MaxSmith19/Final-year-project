import React from 'react'
import {Link} from 'react-router-dom'
import {VscThreeBars, VscChevronRight, VscChevronLeft, VscAccount}from 'react-icons/vsc'
import {useState} from 'react'

const Nav = () => {
    var [isNavOpen,setNav] = useState(false);
    var [isLoggedIn,setIsLoggedIn] = useState(false);
    var [isAccountOpen,setIsAccountOpen] = useState(true);
    if(localStorage.getItem("ID")!==null){
        isLoggedIn=true; //NEEDS CHANGING ONCE LOCALSTORAGE CHANGED
    }
    return (
    <>
    <div className={isLoggedIn? "":"hidden "}>
            <div className="border bg-white h-20">
            <div className='grid grid-cols-3 grid-rows-1 gap-5'>
            <div className="mt-5 ml-3">
                    <button className={isNavOpen? "w-0 h-0" :"transition -rotate-180 duration-300"} onClick={()=>setNav(true)}> <VscThreeBars size={isNavOpen? "0":"50"}/></button>
                </div>
            <h1 className='m-3 text-5xl text-center'>Logo</h1>
            <div className="mt-3 relative">
                    <a className="float-right bg-white mr-3 mt-3" onClick={()=>setIsAccountOpen(!isAccountOpen)} > <VscAccount size="50"/></a>
                    <div className={isAccountOpen? 'absolute top-0 right-0 float-right text-right mt-16 w-4/12 border-gray-500 shadow-xl p-1 bg-white ':'hidden'}>
                        <a href="#" className="block text-xl bg-white border shadow-xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md">Account information</a>
                        <a href="#" className="block text-xl bg-white border shadow-xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md">Settings</a>
                        <a href="#" className="block text-xl bg-white border shadow-xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md">Log out</a>
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