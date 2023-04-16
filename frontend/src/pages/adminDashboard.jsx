import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const qs = require('qs');


const AdminDashboard = ({handleIsLoading}) =>{

    const navigate = useNavigate()
    useEffect(() => {
        getTickets()
        //use effect runs the command on loading
      }, []);

    const getTickets = async() =>{
      
        const config = {
        method: 'get',
        url: `${process.env.REACT_APP_SERVER_URL}/api/Tickets/get`,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
        }}
        try{
            const response = await axios.request(config)
            console.log(response)
        }catch(error){
            console.error(error)
        }
    }
    return(
        <h1>tickets</h1>
        )
}
export default AdminDashboard