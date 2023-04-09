import {Link} from 'react-router-dom'
import {VscThreeBars, VscChevronLeft}from 'react-icons/vsc'
import {RiAccountCircleFill, RiAccountCircleLine} from 'react-icons/ri'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify'
import { useEffect } from 'react'
import  Switch  from 'react-switch'
import BarLoader from "react-spinners/BarLoader";


const Nav = (props) => {
    var [isNavOpen,setNav] = useState(false);
    var [isAccountOpen,setIsAccountOpen] = useState(true);
    var [isDarkMode, setIsDarkMode] = useState(() => {
        const storedValue = localStorage.getItem("isDarkMode");
        return storedValue !== null ? JSON.parse(storedValue) : false;
      });

    const navigate = useNavigate()

    useEffect(() => {
        console.log(props.isLoading)
    },[props.isLoading])
    const changeMode =() =>{
        setIsDarkMode(!isDarkMode)
        localStorage.setItem("isDarkMode",!isDarkMode)
        props.onToggleDarkMode();
    }

    const logOut =() =>{
        document.cookie = "token=; expires=Thu, 01 Jan 1970";  
        //immediately deletes the cookie as the expiry date is out of date.
        toast.warn("You have been logged out");
        navigate("/login");
        props.onLogout();
    }
    return (
        <>
        <div className="fixed top-0 w-full z-50">
            <div className="border bg-white h-20 shadow-md">
            <div className='grid grid-cols-3 grid-rows-1 gap-5'>
            <div className=" ml-2">
                        <button className={isNavOpen? "w-0 h-0" :" mr-3 duration-150 focus:outline-none bg-white border-2 border-gray-300 p-1 mt-2 hover:bg-gray-700 hover:border-gray-700"} onClick={()=>setNav(true)}> <VscThreeBars size={isNavOpen? "0":"50"}/></button>
                    </div>
                <h1 className='m-3 text-5xl text-center'>{(localStorage.getItem("businessName"))}</h1>
                <div className="relative">
                        <button className="float-right mr-2 transition-all ease-in-out duration-150 focus:outline-none bg-white border-2 border-gray-300 rounded-full p-1 mt-2 hover:bg-gray-700 hover:border-gray-700" onClick={()=>setIsAccountOpen(!isAccountOpen)} >
                            {isAccountOpen? <RiAccountCircleLine size="50" className="text-gray-800 hover:text-white"/>:
                            <RiAccountCircleFill size="50"className="text-gray-800 hover:text-white"/>}</button>
                            
                        <div className={isAccountOpen? 'invisible':' grid grid-col-2 grid-row-2 focus:outline-none bg-white mt-1 mr-3 '}>
                            <a href="#" className=" text-2xl text-right bg-white  hover:bg-gray-700 hover:text-white mb-0.5 transition ease-in-out duration-300 "><Link to="/UserSettings">Account settings</Link></a>
                            <a href="#" className=" text-2xl text-right bg-white hover:bg-gray-700 hover:text-white mb-0.5 transition ease-in-out duration-300 border-t" onClick={()=>logOut()}>Log out</a>
                        </div>
                    </div>
                </div>
            </div>
            <BarLoader
                color={isDarkMode ? '#36d7b7':"#FFCC66"}
                width={2000}
                loading={props.isLoading}
                />

        <div className={isNavOpen? "overlay":"h-0"}>
        <button className={isNavOpen? "transition -rotate-180 duration-300 text-white mt-3 ml-3 hover:text-gray-500" :"invisible"} onClick={()=>setNav(false)}> <VscChevronLeft className="mt-3 ml-2" size={isNavOpen? "50":"0"} /></button>
                <div className={isNavOpen? "overlay-content":"hidden"}> 
                    <label className=''>Dark Mode:  
                        <Switch className='ml-4 text-center' onChange={()=>changeMode()} checked={isDarkMode}/>
                    </label>    
                    <a onClick={()=>setNav(false)}><Link to="/Dashboard">Dashboard</Link></a>
                    <a onClick={()=>setNav(false)}><Link to="/Ledgers">Ledgers</Link></a>
                    <a onClick={()=>setNav(false)}><Link to="/Inventory">Inventory</Link></a>
                    <a onClick={()=>setNav(false)}><Link to="/Marketing">Marketing</Link></a>
                    <a onClick={()=>setNav(false)}><Link to="/Legislation">Legislation</Link></a>

                </div>
            </div>
            </div>
    </>
    )
}

export default Nav