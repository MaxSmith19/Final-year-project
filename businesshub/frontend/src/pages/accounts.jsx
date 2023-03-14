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
            <div className="bg-white h-80 w-full m-auto rounded-xl shadow-2xl p-2">
                <h1 className="text-5xl ">Your Accounts</h1>
                <hr />
                <p>Manage your accounts here</p>
            </div>


        </div>
        )
    }
}