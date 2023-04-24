import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const qs = require('qs');
const {toast} = require('react-toastify')

const AdminDashboard = ({ handleIsLoading }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    handleIsLoading(true);

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_URL}/api/Tickets/get`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    try {
      const response = await axios.request(config);
      setTickets(response.data.tickets);
      handleIsLoading(false);
    } catch (error) {
      console.error(error);
      handleIsLoading(false); 
    }
  };
  const resolveTicket = async (index) => {
    console.log(tickets[index]);
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_SERVER_URL}/api/Tickets/remove`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        _id: tickets[index]._id,
      },
    };
    try {
      const response = await axios.request(config);
      // Create a new array without the resolved ticket
      const updatedTickets = tickets.filter((_, i) => i !== index);
      // Update the state with the new array
      setTickets(updatedTickets);
      toast.success('Ticket Resolved');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="bg-white w-full rounded shadow-xl mb-96 p-4">
      <table className="table-auto w-full h-auto md:table-fixed sm:table-fixed rounded">
        <thead>
          <tr>
            <th className="w-4/12 border-t border-l">Ticket ID</th>
            <th className="w-3/12 border-t border-l">Title</th>
            <th className="w-4/12 border-t border-l">Description</th>
            <th className="w-1/12 border-t border-l"></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr  key={index} className="h-10 bg-slate-200 rounded shadow-sm sm:text-left hover:bg-slate-300 transition-all ease-in-out duration-300">
                <td className="p-1">
                    <label className="block w-full bg-slate-50 sm:hidden">Ticket ID</label>
                    <p className="rounded pl-2 bg-slate-50 w-full shadow-sm">{ticket._id}</p>
                </td>
                <td className="p-1">
                    <label className="block w-full bg-slate-50 sm:hidden">Ticket Title</label>
                    <p className="rounded pl-2 bg-slate-50 w-full shadow-sm">{ticket.title}</p>
                </td>
                <td className="p-1">
                    <label className="block w-full bg-slate-50 sm:hidden">Ticket Description</label>
                    <p className="rounded pl-2 bg-slate-50 w-full shadow-sm">{ticket.description}</p>
                </td>
                <td>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>resolveTicket(index)}>Resolved</button>

                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
