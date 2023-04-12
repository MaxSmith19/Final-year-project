import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 px-4 py-4 mt-56">
        <div className="grid grid-cols-3">
          <div>
            <h1>test</h1>
          </div>
          <div className="text-center text-gray-400">
            <div className="h-1/3">

            </div>
            <div className="h-1/3">
              <h1>© 2023 Max Smith Studios</h1>
            </div>
          </div>
          <div className="float-right h-1/3">
            <h1 className="text-gray-400 text-center text-3xl mb-3">Navigate</h1>
            <ul>
              <li className="text-right text-gray-400"><Link to="/Dashboard">Dashboard</Link></li>
              <li className="text-right text-gray-400"><Link to="/Ledgers">Ledgers</Link></li>
              <li className="text-right text-gray-400"><Link to="/Inventory">Inventory</Link></li>
              <li className="text-right text-gray-400"><Link to="/Marketing">Marketing</Link></li>
              <li className="text-right text-gray-400"><Link to="/Legislation">Legislation</Link></li>
            </ul>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
