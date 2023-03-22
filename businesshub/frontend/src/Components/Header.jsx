import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import {VscThreeBars, VscChevronRight, VscChevronLeft, VscAccount}from 'react-icons/vsc'
import {RiAccountCircleFill, RiAccountCircleLine} from 'react-icons/ri'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'

const Nav = (props) => {
    var [isNavOpen,setNav] = useState(false);
    var [isAccountOpen,setIsAccountOpen] = useState(true);
    const navigate = useNavigate()

    const logOut =() =>{
        document.cookie = "token=; expires=Thu, 01 Jan 1970";  
        //immediately deletes the cookie as the expiry date was a couple years ago
        toast.success("You have been logged out");
        navigate("/login");
        props.onLogout();
    }
    return (
    <>
    <div>
            <div className="border bg-white h-20 shadow-md">
            <div className='grid grid-cols-3 grid-rows-1 gap-5'>
            <div className="mt-3 ml-2">
                        <button className={isNavOpen? "w-0 h-0" :"transition -rotate-180 duration-300"} onClick={()=>setNav(true)}> <VscThreeBars size={isNavOpen? "0":"50"}/></button>
                    </div>
                <h1 className='m-3 text-5xl text-center'>{(localStorage.getItem("businessName"))}</h1>
                <div className="mt-3 relative">
                        <a className="float-right bg-white mr-2 transition-all ease-in-out duration-75 " onClick={()=>setIsAccountOpen(!isAccountOpen)} >{isAccountOpen? <RiAccountCircleLine size="50"/>:<RiAccountCircleFill size="50"/>}</a>
                        <div className={isAccountOpen? 'invisible':'transition ease-in-out duration-300 absolute top-0 right-0 float-right text-right mt-16 w-6/12 border-gray-500 shadow-xl p-1 bg-white '}>
                            <a href="#" className="block text-2xl bg-white border shadow-2xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md transition ease-in-out duration-300"><Link to="/UserSettings">Account settings</Link></a>
                            <a href="#" className="block text-2xl bg-white border shadow-2xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md transition ease-in-out duration-300">Preferences</a>
                            <a href="#" className="block text-2xl bg-white border shadow-xl hover:bg-gray-700 hover:text-white mb-0.5 rounded-md transition ease-in-out duration-300" onClick={()=>logOut()}>Log out</a>
                        </div>
                    </div>
                </div>
            </div>

        <div className={isNavOpen? "overlay":"h-0"}>
        <button className={isNavOpen? "transition -rotate-180 duration-300 text-white mt-3 ml-3" :"invisible"} onClick={()=>setNav(false)}> <VscChevronLeft className="mt-3 ml-2" size={isNavOpen? "50":"0"} /></button>
                <div className={isNavOpen? "overlay-content":"hidden"}> 
                    <h1 className="text-gray-400 text-6xl text-center underline mb-10">Menu</h1>

                    <a onClick={()=>setNav(false)}><Link to="/Dashboard">Dashboard</Link></a>
                    <a onClick={()=>setNav(false)}><Link to="/Ledgers">Ledgers</Link></a>


                </div>
            </div>
            </div>
    </>
    )
}

export default Nav