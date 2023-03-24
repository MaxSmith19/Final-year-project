import react, {useState, useEffect} from 'react';
import axios from 'axios';
const qs = require('qs');

function Ledgers() {
    const [ledgerRows, setLedgerRows] = useState([{date: '',notes: '',debit: '',credit: '',balance: ''}]);
    const [ledgerNames, setLedgerNames] = useState([]);
    const [currentLedgerID, setCurrentLedgerID] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        getLedgers();
    }, [] //having the empty array as an initial value will cause the effect to run only once
    );

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
                const newLedgerData = [];
                let ledgerData ="";
                for (let i = 0; i < response.data.length; i++) {
                    let ledgerName = response.data[i].ledgerName;
                    ledgerData = response.data[i].ledgerData;
                    if(response.data[i].ledgerData.length !== 0) {
                        response.data[i].ledgerData.forEach(element => {
                            console.log(element)
                        setLedgerRows(LedgerRows => [...LedgerRows, {            
                            date: element.date,
                            notes: element.notes,
                            debit: element.debit,
                            credit: element.credit,
                            balance: element.balance
                        }]);
                    })
                    }
                }

                if(ledgerData!=null){
                    setLedgerRows(ledgerRows => [...ledgerRows,...ledgerData]);
                }
                
                setLedgerNames(newLedgerNames);
                setCurrentLedgerID(response.data[0]._id);
                //set current ledger to the first ledger as this
                //will be first by default

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSave = () => {
        const userIDCookie = document.cookie.split("=")[1];
        const token = userIDCookie.split(";")[0];
        ledgerRows.forEach((row) => {
            const date = row.date;
            const notes = row.notes;
            const debit = row.debit;
            const credit = row.credit;
            const balance = row.balance;
        })
    
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
        
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
                console.log(error);
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
      };
      

    const onChangeCell = (event, index, key) => {
        const newRows = [...ledgerRows];
        newRows[index][key] = event.target.value;
        setLedgerRows(newRows);
    }
    return(
            <div>
            <div className="bg-white h-80 w-full m-auto rounded-xl shadow-2xl p-2 mb-5">
                <h1 className="text-5xl ">Your Accounts</h1>
                <hr />
                <p>Manage your accounts here</p>
                
            </div>
            <div className="bg-white h-80 w-full m-auto p-4 rounded-xl shadow-2xl">
            <div className="w-auto h-auto mb-2 border p-1">
                    <h1 className='float-left text-xl p-1'> Select ledger: </h1>
                    <select className='ml-4 text-xl rounded-md p-1 w-1/4'>
                        { ledgerNames.map((ledgerName, index) => (
                            <option key={index} value={ledgerName}>{ledgerName}</option>
                            ))}
                    </select>
                </div>
                <table class="table-auto w-11/12">
                <thead>
                    <tr>
                        <th className="w-2/12 border-t border-l">Date</th>
                        <th className="w-5/12 border-t border-l">Notes</th>
                        <th className="w-1/12 border-t border-l">Debit</th>
                        <th className="w-1/12 border-t border-l">Credit</th>
                        <th className="w-2/12 border-t border-l border-r border-">Balance</th>
                    </tr>
                </thead>
                <tbody >
                {ledgerRows.map((row, index) => (
                <tr key={index} className="h-10" ref={el => (row[index] =el)}>
                    <td className="border-2">
                        <input value={row.date} onChange={(event)=>onChangeCell(event, index, "date")} type="date" className="w-full" />    
                    </td>
                    <td className="border-2">
                        <input value={row.notes} onChange={(event)=>onChangeCell(event, index, "notes")} className="w-full" />
                    </td>
                    <td className="border-2">  
                        <input value={row.debit} onChange={(event)=>onChangeCell(event, index, "debit")} className="w-full" />
                    </td>
                    <td className="border-2">
                        <input value={row.credit} onChange={(event)=>onChangeCell(event, index, "credit")} className="w-full" />
                    </td>
                    <td className="border-2">
                        <input value={row.balance} onChange={(event)=>onChangeCell(event, index, "balance")} className="w-full" />
                    </td>
                    <td className="border-2 text-green-800 text-3xl">
                        <button onClick={addRow}>+</button>
                    </td>
                </tr>
                ))}
                </tbody>
                </table>   

            <button onClick={onSave} className="bg-green-800 hover:bg-green-900 float-right rounded w-1/12">Save</button>          
            </div>
        </div>
        )
    }


export default Ledgers; 