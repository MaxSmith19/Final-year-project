import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import * as qs from 'qs'
 

export default class Registration extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      rerender: 0
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onReRender = this.onReRender.bind(this);
  }

  onChangeEmail(e){
    this.setState({ 
      email: e.target.value
    })
  }
  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  onError(e){
    this.setState({ 
      errorMessage: e.target.value
    })
  }
  onReRender(){
    this.setState({
      rerender: this.state.rerender + 1
    })
    console.log(this.state.rerender)
  }
  onSubmit(e){
    let response=""
    e.preventDefault();
    //TODO IF NULL
    const data =  qs.stringify({
      'email': this.state.email,
      'password': this.state.password
    })
    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/Users/login/',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data : data
    };
    
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if(response.status===200){
          localStorage.setItem("ID",response.data)
          this.props.history.push('/home')
          //TODO remember me?
        }
      })
      .catch((error) => {
        if(error.response.status===401){
          this.state.errorMessage = "Email or password is incorrect"
          console.log(this.state.errorMessage)
          //TODO error message
          //use the nice toast function
        }
      });
  }

  render() {
    return(
      <div class="max-w-lg mt-12 form-width form-length">
        {console.log(this.state.errorMessage)}
      <h1 class="block text-gray-700 font-bold text-center text-5xl mb-10">Login</h1>

      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full p-20" onSubmit={this.onSubmit}>
        <div class="mb-6">
          <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
            Email address
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={this.onChangeEmail} value={this.state.email} required/>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={this.onChangePassword} value={this.state.password} required/>
        </div>
        <div>
        {this.state.errorMessage &&<div className="text-red-500">{this.state.errorMessage}</div>}
        {/* Partially works, needs fixing as doesnt immediately render it. */}
          <h1 className="mb-5">Don't have an account? Sign up <Link className="text-blue-600"to="/Register">here</Link></h1>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit" onClick={()=>this.onReRender()}>
            Sign In
          </button>
          <div>
        </div>
        </div>
      </form>
      </div>
    )
  }
}