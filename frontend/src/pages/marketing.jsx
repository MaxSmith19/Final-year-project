import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import etsyLogo from "../images/etsy_logo.png"


const Marketing = () =>{
    const [challenge, setChallenge] = useState("")
    const [state, setState] = useState("")
    const [etsyOAuth, setEtsyOAuth] = useState(false)
    const [etsyID, setEtsyID] = useState(null)
    useEffect(()=>{
        checkUserSocials()
        generatePKCE()
    },[])

    const checkUserSocials = async()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_SERVER_URL}/api/Socials/get`,
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`
            }
        };
        try{
            const response = await axios.request(config)
            setEtsyID(getEtsyUserID(response.data.accessToken))
            setEtsyOAuth(false)
            console.log(etsyID)
        
        }catch(error) {
            console.log(error);
        };
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
        `redirect_uri=${process.env.REACT_APP_SERVER_URL}api/Socials/etsyCallback&` +
        `scope=feedback_r%20shops_r&` +
        `code_challenge=${challenge}&` +
        `code_challenge_method=S256&` +
        `state=${state}`;

return (
  <div className="h-auto mb-96">
    <div className="w-full h-96 bg-white rounded flex justify-center items-center">
      <div className="m-auto border rounded-sm grid grid-cols-2 gap-4 p-4">
        <div className="flex justify-center items-start border-r">
          <img src={etsyLogo} alt="Etsy Logo" className="w-24 h-12 mr-2" />
        </div>
        {etsyOAuth ?(
            <p>Authenticated!</p>
            
        ):(
            <a className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            href={url}>
            Authenticate with Etsy
          </a>
        )}
        
      </div>
    </div>
  </div>
);

}
export default Marketing