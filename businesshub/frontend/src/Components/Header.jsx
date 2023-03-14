import React from 'react'
import {Link} from 'react-router-dom'
import {VscThreeBars, VscChevronRight, VscChevronLeft, VscAccount}from 'react-icons/vsc'
import {RiAccountCircleFill, RiAccountCircleLine} from 'react-icons/ri'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'

const Nav = () => {
    var [isNavOpen,setNav] = useState(false);
    var [isLoggedIn,setIsLoggedIn] = useState(false);
    var [isAccountOpen,setIsAccountOpen] = useState(true);
    const navigate = useNavigate()
    if(localStorage.getItem("ID")!==null){
        isLoggedIn=true; //NEEDS CHANGING ONCE LOCALSTORAGE CHANGED
    }

    const logOut =() =>{
        localStorage.removeItem("ID");
        setIsLoggedIn(false);
        toast.success("You have been logged out");
        navigate("/login");
    }
    return (
    <>
    <div className={isLoggedIn? "":"hidden "}>
            <div className="border bg-white h-20">
            <div className='grid grid-cols-3 grid-rows-1 gap-5'>
            <div className="mt-3 ml-2">
                        <button className={isNavOpen? "w-0 h-0" :"transition -rotate-180 duration-300"} onClick={()=>setNav(true)}> <VscThreeBars size={isNavOpen? "0":"50"}/></button>
                    </div>
                <h1 className='m-3 text-5xl text-center'>Logo</h1>
                <div className="mt-3 relative">
                        <a className="float-right bg-white mr-2 transition-all " onClick={()=>setIsAccountOpen(!isAccountOpen)} >{isAccountOpen? <RiAccountCircleLine size="50"/>:<RiAccountCircleFill size="50"/>}</a>
                        <div className={isAccountOpen? 'invisible':'transition ease-in-out duration-300 absolute top-0 right-0 float-right text-right mt-16 w-6/12 border-gray-500 shadow-xl p-1 bg-white '}>
                            <a href="#" className="block text-2xl bg-white border shadow-2xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md transition ease-in-out duration-300">Account information</a>
                            <a href="#" className="block text-2xl bg-white border shadow-2xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md transition ease-in-out duration-300">Settings</a>
                            <a href="#" className="block text-2xl bg-white border shadow-xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md transition ease-in-out duration-300" onClick={()=>logOut()}>Log out</a>
                        </div>
                    </div>
                </div>
            </div>

        <div className={isNavOpen? "overlay":"h-0"}>
        <button className={isNavOpen? "transition -rotate-180 duration-300 text-white" :"invisible"} onClick={()=>setNav(false)}> <VscChevronLeft className="m-5"size={isNavOpen? "50":"0"} /></button>

                <div className={isNavOpen? "overlay-content":"hidden"}> 
                    <a onClick={()=>setNav(false)}><Link to="/Dashboard">Dashboard</Link></a>
                    <a onClick={()=>setNav(false)}><Link to="/accounts">Accounts</Link></a>


                </div>
            </div>
            </div>
    </>
    )
}

export default Nav