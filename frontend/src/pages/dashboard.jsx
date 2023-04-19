import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { RiAccountBoxFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import Chart from 'chart.js/auto'
import { useNavigate } from 'react-router-dom';
const qs = require('qs');


const Dashboard = ({handleIsLoading}) =>{
    let [userEmail, setUserEmail] = useState("");
    let [businessName, setBusinessName] = useState("");
    let [imageSrc, setImageSrc] = useState("");
    let [ledgerName, setLedgerName] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        getUserInfo();
        getUserLedger()
        //use effect runs the command on loading
      }, []);

    const getUserLedger =async() =>{
      const userIDCookie = document.cookie.split("=")[1]; 
      const token = userIDCookie.split(";")[0];
      const data = qs.stringify({
        ledgerName: undefined
      });
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_SERVER_URL}/api/Ledgers`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      try{
        const response = await axios.request(config)
        setLedgerName(response.data[0].ledgerName)
        const ledgerRows = response.data[0].ledgerData
        //get the first ledger in the users ledgers (most likely to be their main ledger)
        let labels=[]
        let debitData =[]
        let creditData =[]
        const bchrt = document.getElementById('balanceChart').getContext('2d');
        ledgerRows.forEach(elements =>{
            labels.push(elements.date)
            debitData.push(elements.debit)
            creditData.push(elements.credit)
        })
        let balance =ledgerRows.balance

        const chart = new Chart(bchrt, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                type: 'line',
                label: 'Balance',
                data: balance,
                borderColor: 'rgba(0, 162, 235, 1)',
                borderWidth: 2,
                fill: false,
              },
              {
                type: 'line',
                label: 'Debit',
                backgroundColor: 'rgb(54, 162, 235)',
                data: debitData,
              },
              {
                type: 'line',
                label: 'Credit',
                backgroundColor: 'rgb(255, 99, 132)',
                data: creditData,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Balance, Debit and Credit over Time',
                font: {
                  size: 16,
                },
              },
              legend: {
                display: true,
                position: 'bottom',
              },
            },
            scales: {
              y: {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                },
              },
              x: {
                stacked: true,
              },
            },
          },
        });
        
        
          
          
          return () =>{
            chart.destroy()

          }
      }catch(error){
        console.log(error)
      }
    }
    const getUserInfo = async() => {
      try {
        handleIsLoading(true);
        const userIDCookie = document.cookie.split("=")[1];
        const token = userIDCookie.split(";")[0];
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/Users/get`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const responseData = {
          businessName: response.data.businessName,
          email: response.data.email,
          businessLogo: response.data.businessLogo
        };
        setBusinessName(responseData.businessName);
        setUserEmail(responseData.email);
        setImageSrc(responseData.businessLogo);
        localStorage.setItem('businessName', responseData.businessName);
        localStorage.setItem('businessLogo', responseData.businessLogo);
        //local storage is not used often, but contains the name and logo to be used by the header 
        //the image is used to show in the frontend design in some areas.
        handleIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
      
    return(
            <div className="grid gap-6 md:grid-rows-3 lg:grid-rows-3 xl:grid-cols-3">
                <div className="bg-white h-full w-full m-auto rounded-xl shadow-2xl p-2">
                    <div>
                        {/* title */}
                        <h1 className="text-5xl mb-3">Account details</h1>
                    </div>
                    <hr/>
                    <div>
                        {/* topHalf */}
                        <img onClick={()=>navigate("/userSettings")} alt="Your logo"
                         className={imageSrc ? "w-full cursor-pointer h-full text-center m-auto mt-3 mb-3 shadow-md":"w-32 cursor-pointer h-32 text-center m-auto mt-3 mb-3 shadow-md"} 
                          src={imageSrc ? `${process.env.REACT_APP_SERVER_URL}/${imageSrc}` : `${process.env.REACT_APP_SERVER_URL}/uploads/uploadImage.png`} />
                    </div> 
                    <hr />
                    <div className="w-full h-auto mt-4">  
                        {/* bottomHalf */}
                        <RiAccountBoxFill className='float-left' size="32"/><h2 className="text-2xl">Welcome {businessName}!</h2>
                        <MdEmail className="float-left" size="32"/><h2 className="text-2xl">{userEmail}</h2>
                        <h2>Pre-alpha</h2>
                    </div>
                </div>
                <div className="bg-white h-96 w-full m-auto rounded-xl shadow-2xl p-2">
                    <h1 className="text-5xl ">Ledgers</h1>
                    <hr />
                      <div className="chartItem" >
                        <canvas id="balanceChart"></canvas>
                        <h2 className='text-2xl'>{ledgerName}</h2>
                    </div>
                    </div>
                  <div className="bg-white h-96 w-full m-auto rounded-xl shadow-2xl p-2">
                    <h1 className="text-5xl ">Marketing</h1>
                    <hr />
                </div>
            </div>
        )
}
export default Dashboard