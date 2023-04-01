import react, {useState, useEffect} from 'react';
import axios from 'axios';
import { FiSave } from 'react-icons/fi'
const qs = require('qs');

function Inventory() {
    const [inventoryRows, setInventoryRows] = useState([]);
    const [ingredientsRows, setIngredientsRows] = useState([{}])
    //These are the rows of the current inventory being shown
    const [cacheResponse, setCacheResponse] = useState([]);
    //Cache the entire response so that it doesn't have to be requested every time
    const [inSettings, setInSettings] = useState(0);
    //If they are in the settings mode or not.
    useEffect(() => {
        setInventoryRows([])
        setIngredientsRows([])
        getInventory()
    },[])

    const getInventory = () =>{
        const userIDCookie = document.cookie.split("=")[1]; 
        const token = userIDCookie.split(";")[0];
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Inventory/',
            headers: { 
                    'Authorization': `Bearer ${token}`
            }
        };
        
        axios.request(config)
        .then((response) => {
            response.data[0].inventoryData.forEach(element => {
                setInventoryRows(inventoryRows => [...inventoryRows, {
                    Item: element.Item,
                    Description: element.Description,
                    Quantity: element.Quantity,
                    SellingPrice: element.SellingPrice
                }]);
            });
            response.data[0].ingredientsData.forEach(element => {
                setIngredientsRows(ingredientsRows => [...ingredientsRows, {
                    Item: element.Item,
                    Description: element.Description,
                    Quantity: element.Quantity,
                    SellingPrice: element.SellingPrice
                }])
            })
            setCacheResponse(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const onChangeCell = (event, index, key) => {
        const newRows = [...inventoryRows];
        newRows[index][key] = event.target.value;
        setInventoryRows(newRows);
    }

    const onSave = ()=> {
        console.log(inventoryRows)
        const userIDCookie = document.cookie.split("=")[1];
        const token = userIDCookie.split(";")[0];
        
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/Inventory/update',
            headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                inventoryData: inventoryRows,
                ingredientsData : ingredientsRows
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
    const addRow = () =>{
        const newRow = {
            date: '',
            notes: '',
            debit: '',
            credit: '',
            balance: ''
          };
   
          setInventoryRows([...inventoryRows, newRow]);
          //adds a new blank row to the table
    }
    const deleteRow = () =>{
        const updatedInventoryRows = [...inventoryRows];
        updatedInventoryRows.splice(index.target.value, 1)
        setInventoryRows(updatedInventoryRows)
    }
    return(
        <>
            <div className="bg-white pb-16 mb-10 w-full m-auto p-4 rounded-xl shadow-2xl">
                <h1>Inventory</h1>
                <table className="table-auto w-full h-auto md:table-fixed sm:table-fixed">
                <thead>
                    <tr>
                        <th className="w-4/12 border-t border-l">Item</th>
                        <th className="w-5/12 border-t border-l">Description</th>
                        <th className="w-1/12 border-t border-l">Quantity</th>
                        <th className="w-1/12 border-t border-l">Selling price</th>
                        <button onClick={addRow}>+</button>

                    </tr>
                </thead>
                <tbody >
                {inventoryRows.map((row, index) => (
                <tr key={index} className="h-10 sm:text-left" ref={event => (row[index] =event)}>
                    <td className="border-2 ">
                        <input value={row.Item} onChange={(event)=>onChangeCell(event, index, "Item")} type="date" className="w-full" required />    
                    </td>
                    <td className="border-2">
                        <input value={row.Description} onChange={(event)=>onChangeCell(event, index, "Description")} type="text" className="w-full" required />
                    </td>
                    <td className="border-2">  
                        <input value={row.Quantity} onChange={(event)=>onChangeCell(event, index, "Quantity")} type="number" className="w-full" required />
                    </td>
                    <td className="border-2">
                        <input value={row.SellingPrice} onChange={(event)=>onChangeCell(event, index, "SellingPrice")} type="number" className="w-full" required />
                    </td>
                </tr>
                ))}
                </tbody>
                </table>   
            <button onClick={onSave} className="float-right rounded"><FiSave size={50}/></button>          

            </div>
            {/* <div className="bg-white pb-16 w-full m-auto p-4 rounded-xl shadow-2xl">
                <table className="table-auto w-full h-auto md:table-fixed sm:table-fixed">
                <thead>
                    <tr>
                        <th className="w-4/12 border-t border-l">Item</th>
                        <th className="w-5/12 border-t border-l">Description</th>
                        <th className="w-1/12 border-t border-l">Quantity</th>
                        <th className="w-1/12 border-t border-l">Selling price</th>
                        <button onClick={addRow}>+</button>

                    </tr>
                </thead>
                <tbody >
                {ingredientsRows.map((row, index) => (
                <tr key={index} className="h-10 sm:text-left" ref={event => (row[index] =event)}>
                    <td className="border-2 ">
                        <input value={row.Item} onChange={(event)=>onChangeCell(event, index, "date")} type="date" className="w-full" required />    
                    </td>
                    <td className="border-2">
                        <input value={row.Description} onChange={(event)=>onChangeCell(event, index, "Description")} type="text" className="w-full" required />
                    </td>
                    <td className="border-2">  
                        <input value={row.Quantity} onChange={(event)=>onChangeCell(event, index, "debit")} type="number" className="w-full" required />
                    </td>
                    <td className="border-2">
                        <input value={row.SellingPrice} onChange={(event)=>onChangeCell(event, index, "credit")} type="number" className="w-full" required />
                    </td>
                </tr>
                ))}
                </tbody>
                </table>   
                
            </div> */}
            </>
        )
    }


export default Inventory; 