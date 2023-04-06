import react from 'react'
import { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';


const Marketing = () =>{
    const [challenge, setChallenge] = useState("")
    const [verifier, setVerifier] = useState("")
    const [state, setState] = useState("")
    useEffect(()=>{
        checkUserSocials()
        generatePKCE()
    },[])
    const checkUserSocials = ()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Socials/get',
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`
            }
        };

        axios.request(config)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const verifierCookie = (verifier) =>{
        document.cookie = `code_verifier=${verifier}; path=/; max-age=600`
    }
    const generatePKCE = ()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Socials/PKCE',
        };

        axios.request(config)
        .then((response) => {
            setChallenge(response.data.challenge);
            verifierCookie(response.data.verifier)
            setState(response.data.state);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const url = `https://www.etsy.com/oauth/connect?` +
        `response_type=code&` +
        `client_id=${process.env.REACT_APP_ETSY_KEYSTRING}&` +
        `redirect_uri=http://localhost:5000/api/Socials/etsyCallback&` +
        `scope=feedback_r%20shops_r&` +
        `code_challenge=${challenge}&` +
        `code_challenge_method=S256&` +
        `state=${state}`
    return(
            <div className="grid gap-6 md:grid-rows-3 lg:grid-rows-3 xl:grid-cols-3">
                <a className="bg-white" href={url}>
                    Authenticate with Etsy
                </a>
            </div>
        )
}
export default Marketing