import React, { Component } from 'react'
import axios from "axios"

export default class Registration extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    })
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
  onChangeConfirmPassword(e){
    this.setState({ 
      confirmPassword: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const newUser ={
      username: this.state.username,
      email: this.state.email, 
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    console.log(newUser);
  }

  render() {
    return(
      <div class="max-w-lg mt-12 w-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.onSubmit}>
      <h1 class="block text-gray-700 text-sm font-bold mb-2">Login</h1>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Email address
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={this.onChangeEmail} value={this.state.email}/>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={this.onChangePassword} value={this.state.password}/>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit">
            Sign In
          </button>
        </div>
      </form>
      </div>
    )
  }
}