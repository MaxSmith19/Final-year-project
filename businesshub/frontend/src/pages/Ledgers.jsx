import react, {useState, useEffect} from 'react';
import axios from 'axios';
const qs = require('qs');

function Ledgers() {
    const [ledgerRows, setLedgerRows] = useState([{date: '',notes: '',debit: '',credit: '',balance: ''}]);

    const [ledgerNames, setLedgerNames] = useState([]);

    useEffect(() => {
        getLedgers();
    }, []);

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
                console.log(response.data);
                setLedgerNames(ledgerNames =>response.data[0].ledgerName)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSave = () => {
        ledgerRows.forEach((row) => {
            const date = row.date;
            const notes = row.notes;
            const debit = row.debit;
            const credit = row.credit;
            const balance = row.balance;
        })
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

                    </select>
                    <button onClick={getLedgers} className='ml-4 text-xl rounded-md'>get</button>
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
                <tr key={index} className="h-10" ref={el => row[index] =el}>
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