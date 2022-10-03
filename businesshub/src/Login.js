import React from 'react';
import { ReactPropTypes } from 'react';
import { useState } from 'react';

function Login(){
    const [username,setUsername] = useState("");
    return(
      <form>
        <label for="username">username</label>
        <input type="text" id="username" value={username} onInput={e => setUsername(e.target.value)}></input>
        <button>Log in</button>
      <data />

      </form>  
    );
}
function data(props){
    return (
      <div>
        <p>Username: {props.username}</p>
      </div>  
    );
}
export default Login;