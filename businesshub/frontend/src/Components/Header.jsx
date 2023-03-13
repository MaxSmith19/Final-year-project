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
            <div className="m-3">
                    <button className={isNavOpen? "w-0 h-0" :"transition -rotate-180 duration-300"} onClick={()=>setNav(true)}> <VscThreeBars size={isNavOpen? "0":"50"}/></button>
                </div>
            <h1 className='m-3 text-5xl text-center'>Logo</h1>
            <div className="m-3">
                    <a className="float-right" onClick={()=>setIsAccountOpen(!isAccountOpen)} > <VscAccount size="50"/></a>
                        <div className={isAccountOpen? 'block float-right text-right mt-16 w-56':'hidden'}>
                            <a href="#" class="block py-2 text-sm bg-gray-400 hover:bg-gray-700 hover:text-white">Account information</a>
                            <a href="#" class="block py-2 text-sm bg-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
                            <a href="#" class="block py-2 text-sm bg-gray-400 hover:bg-gray-700 hover:text-white"onClick={()=>{localStorage.removeItem("ID")}}>Log out</a>
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