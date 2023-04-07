import {useState, useEffect} from 'react';
import axios from 'axios';
import { FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify';

function Inventory() {
    const [inventoryRows, setInventoryRows] = useState([]);
    const [ingredientsRows, setIngredientsRows] = useState([])
    //These are the rows of the current inventory being shown
    const [cacheResponse, setCacheResponse] = useState([]);
    //Cache the entire response so that it doesn't have to be requested every time
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

    const onChangeInventoryCell = (event, index, key) => {
        const newRows = [...inventoryRows];
        newRows[index][key] = event.target.value;
        setInventoryRows(newRows);
        const button = document.getElementById("saveButton")
        if(cacheResponse === ingredientsRows){
            button.classList.add("hidden")
        }else{
            button.classList.remove("hidden")
        }
    }

    const onChangeIngredientsCell = (event, index, key) => {
        const newRows = [...ingredientsRows];
        newRows[index][key] = event.target.value;
        setIngredientsRows(newRows);
        const button = document.getElementById("saveButton")
        if(cacheResponse===inventoryRows){
            button.classList.add("hidden")
            
        }else{
            button.classList.remove("hidden")
        }
    }
    const onSave = ()=> {
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
            toast.success("Inventory successfully updated")
            setCacheResponse(response.data)
        })
        .catch((error) => {
            toast.error("An error occured:" +error.message)
        });
    }
    const addInventoryRow = () =>{
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
    
    const addIngredientsRow = () =>{
        const newRow = {
            date: '',
            notes: '',
            debit: '',
            credit: '',
            balance: ''
          };
   
          setIngredientsRows([...ingredientsRows, newRow]);
          //adds a new blank row to the table

    }
    const deleteRow = () =>{
        const updatedInventoryRows = [...inventoryRows];
        updatedInventoryRows.splice(index.target.value, 1)
        setInventoryRows(updatedInventoryRows)
    }
    return(
        <>
        <h1 className='text-center text-6xl mb-10'> Stock Inventory</h1>
            <div className="bg-white pb-16 mb-10 w-full m-auto p-4 rounded-xl shadow-2xl">
                <table className="table-auto w-full h-auto md:table-fixed sm:table-fixed">
                <thead>
                    <tr>
                        <th className="w-4/12 border-t border-l">Item</th>
                        <th className="w-5/12 border-t border-l">Description</th>
                        <th className="w-1/12 border-t border-l">Quantity</th>
                        <th className="w-1/12 border-t border-l">Selling price</th>
                        <button onClick={addInventoryRow}>+</button>

                    </tr>
                </thead>
                <tbody >
                {inventoryRows.map((row, index) => (
                <tr key={index} className="h-10 sm:text-left" ref={event => (row[index] =event)}>
                    <td className="p-1">
                        <label className="block w-full bg-slate-50 sm:hidden">Item name</label>
                        <input className="pl-2 bg-slate-50 w-full shadow-sm" value={row.Item} onChange={(event)=>onChangeInventoryCell(event, index, "Item")} type="text" required />    
                    </td>
                    <td className="p-1">
                        <label className="block w-full bg-slate-50 sm:hidden">Description</label>
                        <input className="pl-2 bg-slate-50 w-full shadow-sm" value={row.Description} onChange={(event)=>onChangeInventoryCell(event, index, "Description")} type="text" required />
                    </td>
                    <td className="p-1">  
                        <label className="block w-full bg-slate-50 sm:hidden">Quantity</label>
                        <input className="pl-2 bg-slate-50 w-full shadow-sm" value={row.Quantity} onChange={(event)=>onChangeInventoryCell(event, index, "Quantity")} type="number" required />
                    </td>
                    <td className="p-1">
                        <label className="block w-full bg-slate-50 sm:hidden">Selling Price</label>
                        <input className="pl-2 bg-slate-50 w-full shadow-sm" value={row.SellingPrice} onChange={(event)=>onChangeInventoryCell(event, index, "SellingPrice")} type="number" required />
                    </td>
                </tr>
                ))}
                </tbody>
                </table>   

            </div>
            <h1 className='text-center text-6xl mb-10'>Ingredients</h1>
            <div className="bg-white pb-16 w-full m-auto p-4 rounded-xl shadow-2xl">

                <table className="table-auto w-full h-auto md:table-fixed sm:table-fixed">
                <thead>
                    <tr>
                        <th className="w-4/12 border-t border-l">Item</th>
                        <th className="w-5/12 border-t border-l">Description</th>
                        <th className="w-1/12 border-t border-l">Quantity</th>
                        <th className="w-1/12 border-t border-l">Selling price</th>
                        <button onClick={addIngredientsRow}>+</button>

                    </tr>
                </thead>
                <tbody >
                {ingredientsRows.map((row, index) => (
                <tr key={index} className="h-10 sm:text-left" ref={event => (row[index] =event)}>
                    <td className=" ">
                        <input value={row.Item} onChange={(event)=>onChangeIngredientsCell(event, index, "date")} type="date" className="w-full" required />    
                    </td>
                    <td className="">
                        <input value={row.Description} onChange={(event)=>onChangeIngredientsCell(event, index, "Description")} type="text" className="w-full" required />
                    </td>
                    <td className="">  
                        <input value={row.Quantity} onChange={(event)=>onChangeIngredientsCell(event, index, "debit")} type="number" className="w-full" required />
                    </td>
                    <td className="">
                        <input value={row.SellingPrice} onChange={(event)=>onChangeIngredientsCell(event, index, "credit")} type="number" className="w-full" required />
                    </td>
                </tr>
                ))}
                </tbody>
                </table>   
                
            </div>
            <button onClick={onSave} id="saveButton"className="transition-all ease-in-out duration-75 rounded-full fixed bottom-10 right-10 bg-green-700 p-3 hidden"><FiSave size={50}/></button>          

            </>
        )
    }


export default Inventory; 