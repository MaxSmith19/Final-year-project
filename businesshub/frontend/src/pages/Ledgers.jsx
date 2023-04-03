import react, {useState, useEffect} from 'react';
import axios from 'axios';
import { imBin } from 'react-icons/im';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md'
import Chart from 'chart.js/auto'
import { FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify';
const qs = require('qs');

function Ledgers() {
    const [ledgerRows, setLedgerRows] = useState([]);
    //These are the rows of the current ledger being shown
    const [ledgerNames, setLedgerNames] = useState([]);
    //This contains all of the ledger names to be displayed in the <Select>
    const [currentLedgerID, setCurrentLedgerID] = useState("");
    //This is used for axios to update the coorect ledger
    const [currentLedgerName, setCurrentLedgerName] = useState("");
    //Ease the program for the developer
    const [cacheResponse, setCacheResponse] = useState([]);
    //Cache the entire response so that it doesn't have to be requested every time
    const [editedLedgerName, setEditedLedgerName] = useState("");
    //This will be used when the user is edting the name of a ledger
    const [inSettings, setInSettings] = useState(0);
    //If they are in the settings mode or not.

    useEffect(() => {
        setLedgerRows([])
        getLedgers();

    }, [] //having the empty array as an initial value will cause the effect to run only once
          //CHANGING THIS WILL CAUSE IT TO CRASH BECAUSE OF ALL THE RENDERING
          // if there is an item in the array, useEffect will run when that item is changed.
          //Since it is blank, It will only run once.
    );
    useEffect(() =>{
        let labels=[]
        let data=[]
        const bchrt = document.getElementById('balanceChart').getContext('2d');
        ledgerRows.forEach(elements =>{
            labels.push(elements.date)
            data.push(elements.balance)
        })

        const chart = new Chart(bchrt, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Balance',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: data
            }]
          },
          options: {
            legend : {display: false},
            title: {
                display: true,
                text: "World Wine Production 2018"
              },
              responsive: true,
              maintainAspectRatio: false
          }
          });
          return () =>{
            chart.destroy()
          }
    },[ledgerRows])


    const getLedgers = () => {
        const userIDCookie = document.cookie.split("=")[1]; 
        const token = userIDCookie.split(";")[0];
        const data = qs.stringify({
            ledgerName: undefined
        })
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Ledgers',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                const newLedgerNames = [];
                let ledgerData ="";
                
                for (let i = 0; i < response.data.length; i++) {
                    let ledgerName = response.data[i].ledgerName;
                    newLedgerNames.push(ledgerName);
                    ledgerData = response.data[0].ledgerData;
                    // response.data[0] is the first created ledger
                    if(response.data.ledgerData!=null && response.data[i].ledgerData.length !== 0) {
                        response.data[i].ledgerData.forEach(element => {
                            setLedgerRows(LedgerRows => [...LedgerRows, {
                                date: element.date,
                                notes: element.notes,
                                debit: element.debit,
                                credit: element.credit,
                                balance: element.balance
                            }]);
                        })
                        }
                        setCurrentLedgerID(response.data[0]._id);
                        setCurrentLedgerName(response.data[0].ledgerName);
                    }

                if(ledgerData!=null){
                    setLedgerRows(ledgerRows => [...ledgerRows,...ledgerData]);
                }
                setCacheResponse(response.data)
                setLedgerNames(newLedgerNames);
                //set current ledger to the first ledger as this
                //will be first by default

            })
            .catch((error) => {
                console.log(error);
            });
    };
    const changeLedger = (event) => {
        let ledgerData = ""

        cacheResponse.forEach(element => {
            //Check the cached Response to get the data from the ledger
            if(element.ledgerName === event.target.value) {
                ledgerData = element.ledgerData;
                setCurrentLedgerID(element._id);

            }
        })
        setCurrentLedgerName(event.target.value);
        if(ledgerData!==undefined || ledgerData===""){
            setLedgerRows([])
            ledgerData.forEach(element => {
                setLedgerRows(LedgerRows => [...LedgerRows, {
                    date: element.date,
                    notes: element.notes,
                    debit: element.debit,
                    credit: element.credit,
                    balance: element.balance
                }]);
            })
        }else{
            setLedgerRows(LedgerRows => [{date: "", notes: "", debit: 0, credit: 0, balance: 0}])
            //adds a new blank row to the table as nothing exists for the ledger
        }
    }
    const createLedger = () =>{
        const userIDCookie = document.cookie.split("=")[1];
        const token = userIDCookie.split(";")[0];
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Ledgers',
            headers: { 
                    'Authorization': `Bearer ${token}`,
            },
            data: {
                ledgerName: "New Ledger"
            }
        };
        //Create a new ledger with the temporary name of "New Ledger"
        axios.request(config)
        .then((response) => {
            toast.success("New ledger created successfully")
            window.location.reload();
            return
        })
        .catch((error) => {
                console.log(error);
        }); 
    }
    const onSave = () => {
        const userIDCookie = document.cookie.split("=")[1];
        const token = userIDCookie.split(";")[0];
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Ledgers/update',
            headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : {
                _id: currentLedgerID,
                ledgerData: ledgerRows
            }
        };
        //Not editing the name of the ledger
        cacheResponse.forEach(element => {
            if(element.ledgerName === editedLedgerName){
                toast.error("You already have a ledger called " + element.ledgerName)
                setEditedLedgerName("")
                window.location.reload()
            }
        })
        if(editedLedgerName !==""){
            config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/api/Ledgers/update',
                headers: { 
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : {
                    _id: currentLedgerID,
                    ledgerName: editedLedgerName
                }
            };
        }
        //Changing the name of the ledger
        axios.request(config)
        .then((response) => {
            cacheResponse.forEach((element,index) => {
                if(element.ledgerName===currentLedgerName){
                    const newCacheResponse = [...cacheResponse];
                    newCacheResponse[index] = response.data;
                    setCacheResponse(newCacheResponse);
                    const newLedgerNames =  [...ledgerNames];
                    newLedgerNames[index] = response.data.ledgerName;
                    setLedgerNames(newLedgerNames)
                    toast.success("Ledger updated successfully")
                    //get the cached response, replace the existing ledger and replace with the new one from the response
                    //Cuts out the need for getLedgers and uneccessary API calls to getLedgers
                }
            })
            setEditedLedgerName("");
        })
        .catch((error) => {
            console.log(error)
        });
    }    
        
    const addRow = () => {
        const newRow = {
          date: '',
          notes: '',
          debit: '',
          credit: '',
          balance: ''
        };
 
        setLedgerRows([...ledgerRows, newRow]);
        //adds a new blank row to the table
    };
    
    const deleteRow = (index) => {
        const updatedLedgerRows = [...ledgerRows];
        updatedLedgerRows.splice(index.target.value, 1)
        setLedgerRows(updatedLedgerRows)
    }

    const deleteLedger = () => {

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Ledgers/delete',
            headers: { },
            data: {
                _id: currentLedgerID
            }
        };
        axios.request(config)
        .then((response) => {
            toast.warn("Ledger Deleted")
            setCacheResponse([...cacheResponse, cacheResponse.splice(cacheResponse.indexOf(response.data), "")])
        })
        .catch((error) => {
                console.log(error);
        });
        
    }
    const onChangeCell = (event, index, key) => {
        const newRows = [...ledgerRows];
        newRows[index][key] = event.target.value;
        
        setLedgerRows(newRows);
    }
    return(
            <div className='transition-all ease-in delay-300 '>
            <div className="chartContainer bg-white rounded-xl shadow-2xl p-2 mb-5">
                <div className="chartItem" >
                    <canvas id="balanceChart"></canvas>
                </div>
            </div>
            
            <div className="bg-white pb-16 w-full m-auto p-4 rounded-xl shadow-2xl">
                <div className="border flex align-center p-2 ledgerOptions">
                        <h1 className='text-xl mr-3'> Select ledger: </h1>
                        <select className='ml-4 md:ml-0 text-xl text-center rounded-md col-span-4 w-1/2' onChange={changeLedger}>
                            { ledgerNames.map((ledgerName, index) => (
                                <option key={index} value={ledgerName}>{ledgerName}</option> 
                                ))}
                        </select>
                        <div className="">
                            <button className="ml-4 mr-4 text-xl rounded-md p-1 w-1/12" value={"New"} onClick={()=>createLedger()}><MdPostAdd size={30}/></button>
                            <button className="ml-4 text-xl rounded-md p-1 w-1/12" onClick={()=>setInSettings(!inSettings)}><AiOutlineEdit size={30}/></button>
                        </div>
                    </div>

                {inSettings ? 
                <div className="">
                    <div className="w-full mb-2 p-10 border rounded m-auto grid grid-row-2 align-middle justify-center bg-gray-200"> 
                            <div className="shadow border rounded py-2 px-3 text-gray-700 mb-3 w-full">
                                <label className='text-xl p-1'> Ledger Name: </label>
                                <input className="" type="text" value={editedLedgerName} onChange={(event)=>setEditedLedgerName(event.target.value)}/>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={()=>onSave()}>Save</button>
                            </div>
                            <div className="shadow border rounded py-2 px-3 text-gray-700 mb-3 align-middle justify-center m-auto">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" value={currentLedgerName} onClick={()=>deleteLedger()}>Delete Ledger</button>
                            </div>
                    </div>
                </div>
                 : 
                <table className="table-auto w-full h-auto md:table-fixed sm:table-fixed">
                <thead>
                    <tr>
                        <th className="w-2/12 border-t border-l">Date</th>
                        <th className="w-5/12 border-t border-l">Notes</th>
                        <th className="w-1/12 border-t border-l">Debit</th>
                        <th className="w-1/12 border-t border-l">Credit</th>
                        <th className="w-2/12 border-t border-l border-r">Balance</th>
                        <button className="w-1/12"onClick={addRow}>+</button>
                    </tr>
                </thead>
                <tbody>
                    {ledgerRows.map((row, index) => (
                    <tr key={index} className="h-10 bg-slate-200 rounded shadow-sm sm:text-left hover:bg-slate-300 transition-all ease-in-out duration-300" ref={event => (row[index] =event)}>
                        <td className="p-1">
                            <label className="block w-full bg-slate-50 sm:hidden">Date</label>
                            <input className="rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.date} onChange={(event)=>onChangeCell(event, index, "date")} type="date" required />
                        </td>
                        <td className="p-1">
                            <label className="block bg-slate-50 sm:hidden">Notes</label>

                            <input className="rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.notes} onChange={(event)=>onChangeCell(event, index, "notes")} type="text" required />
                        </td>
                        <td className="p-1">  
                            <label className="block bg-slate-50 sm:hidden">Debit</label>
                            <input className="gpb rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.debit} onChange={(event)=>onChangeCell(event, index, "debit")} type="number" required />
                        </td>
                        <td className="p-1">
                            <label className="block bg-slate-50 sm:hidden">Credit</label>
                            <input className="gpb rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.credit} onChange={(event)=>onChangeCell(event, index, "credit")} type="number" required />
                        </td>
                        <td className="p-1">
                            <label className="block bg-slate-50 sm:hidden">Balance</label>
                            <input className="gpb rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.balance} onChange={(event)=>onChangeCell(event, index, "balance")} type="number" required />
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>

 
            }
            <button onClick={onSave} className="float-right rounded"><FiSave size={50}/></button>          
                
            </div>
        </div>
        )
    }


export default Ledgers; 