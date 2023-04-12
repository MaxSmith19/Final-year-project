import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import etsyLogo from "../images/etsy_logo.png"


const Marketing = () =>{
    const [challenge, setChallenge] = useState("")
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
        <div className="h-auto">
            <div className="w-full h-96 bg-white rounded flex justify-center">
                <div className="m-auto border rounded-sm grid grid-cols-2">
                    <div className="border-r m-3"><img src={etsyLogo} />Etsy</div>
                    <a className="justify-center text-center align-middle" href={url}>
                        Authenticate with Etsy!
                    </a>
                </div>

            </div>
        </div>
        )
}
export default Marketing