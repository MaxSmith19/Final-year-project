import react from 'react'
import { Component } from 'react';
export default class Accounts extends Component{
    constructor(props){
        super(props);

        this.state={}
    }
    render(){
        return(
            <div>
            <div className="bg-white h-80 w-full m-auto rounded-xl shadow-2xl p-2 mb-5">
                <h1 className="text-5xl ">Your Accounts</h1>
                <hr />
                <p>Manage your accounts here</p>
                
            </div>
            <div className="bg-white h-80 w-full m-auto p-4 rounded-xl shadow-2xl">
            <div className="w-auto mb-2 border p-1">
                    <h1 className='float-left text-xl p-1'> Select ledger: </h1>
                    <select className='ml-4 text-xl rounded-md p-1 w-1/4'>
                        <option>Ledger</option>
                        <option>Ledger</option>
                    </select>
                </div>
            <table class="table-auto w-11/12">
            <thead>
                <tr>
                    <th className="w-2/12 border-t border-l">Date</th>
                    <th className="3/12 border-t border-l">Notes</th>
                    <th className="1/12 border-t border-l">Debit</th>
                    <th className="1/12 border-t border-l">Credit</th>
                    <th className="1/12 border-t border-l border-r border-">Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border-2"><input type="date" className='w-full'/></td>
                    <td className="border-2"><input className='w-full'/></td>
                    <td className="border-2"><input className='w-full'/></td>
                    <td className="border-2"><input className='w-full'/></td>
                    <td className="border-2"><input className='w-full'/></td>
                    <td className="border-2 text-green-800">+</td>
                </tr>

            </tbody>
            </table>             
            </div>
        </div>
        )
    }
}