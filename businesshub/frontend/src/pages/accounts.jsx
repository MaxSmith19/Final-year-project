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
            <div className="bg-white h-80 w-full m-auto rounded-xl shadow-2xl p-2">
            <table class="table-auto w-full">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Notes</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                </tr>
                <tr>
                    <td>Witchy Woman</td>
                </tr>
                <tr>
                    <td>Shining Star</td>
                </tr>
            </tbody>
            </table>             
            </div>
        </div>
        )
    }
}