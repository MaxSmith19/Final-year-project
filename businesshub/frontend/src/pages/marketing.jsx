import react from 'react'
import { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { RiAccountBoxFill } from 'react-icons/ri';

const Marketing = () =>{
    const url = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:3000/marketing&scope=email_r&client_id=${"uapiuzi36a2v2pdub362s2sn"}&state=superstring&code_challenge=DSWlW2Abh-cf8CeLL8-g3hQ2WQyYdKyiu83u_s7nRhI&code_challenge_method=S256`
    return(
            <div className="grid gap-6 md:grid-rows-3 lg:grid-rows-3 xl:grid-cols-3">
                <a href={url}>
                    Authenticate with Etsy
                </a>
            </div>
        )
}
export default Marketing