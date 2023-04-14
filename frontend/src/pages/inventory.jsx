import {useState, useEffect} from 'react';
import axios from 'axios';
import { FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify';
import { BsDash} from 'react-icons/bs'

function Inventory({handleIsLoading})  {
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
    const createInventory = async()=>{
        
        const userIDCookie = document.cookie.split("=")[1]; 
        const token = userIDCookie.split(";")[0];
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_SERVER_URL}/api/Inventory/`,
            headers: { 
                    'Authorization': `Bearer ${token}`
            }
        };
        try{
            const response=await axios.request(config)
            getInventory()
        }catch(error){
            console.log(error)
        }
    }
    const getInventory = async() =>{
        handleIsLoading(true)
        const userIDCookie = document.cookie.split("=")[1]; 
        const token = userIDCookie.split(";")[0];
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_SERVER_URL}api/Inventory/`,
            headers: { 
                    'Authorization': `Bearer ${token}`
            }
        };
        try{
            const response = await axios.request(config)

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
                    ppu: element.ppu
                }])
            })
            setCacheResponse(response.data)
            handleIsLoading(false)
        }
        catch(error){
            createInventory()
        }
    }

    const onChangeInventoryCell = (event, index, key) => {
        const newRows = [...inventoryRows];
        newRows[index][key] = event.target.value;
        setInventoryRows(newRows);
        const button = document.getElementById("saveButton")
        if(cacheResponse === inventoryRows){
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
        if(cacheResponse===ingredientsRows){
            button.classList.add("hidden")
            
        }else{
            button.classList.remove("hidden")
        }
    }
    const onSave = async()=> {
        const userIDCookie = document.cookie.split("=")[1];
        const token = userIDCookie.split(";")[0];
        console.log(inventoryRows)
        console.log(ingredientsRows)
        
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_SERVER_URL}api/Inventory/update`,
            headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                inventoryData: inventoryRows,
                ingredientsData : ingredientsRows
            }
        };
        try{
            const response =await axios.request(config)
            toast.success("Inventory successfully updated")
            setCacheResponse(response.data)
        }catch(error) {
            toast.error("An error occured:" +error.message)
        }
    }
    const addInventoryRow = () =>{
        const newRow = {
            Item: '',
            notes: '',
            Quantity: '',
            SellingPrice: '',
          };
   
          setInventoryRows([...inventoryRows, newRow]);
          //adds a new blank row to the table

    }
    
    const addIngredientsRow = () =>{
        const newRow = {
            Item: '',
            notes: '',
            Quantity: '',
            ppu: '',
          };
   
          setIngredientsRows([...ingredientsRows, newRow]);
          //adds a new blank row to the table
    }
    
    const deleteIngredientsRow = (index) =>{
        const updatedIngredientsRows = [...ingredientsRows];
        updatedIngredientsRows.splice(index, 1)
        console.log(updatedIngredientsRows)
        setIngredientsRows(updatedIngredientsRows)
        document.getElementById("saveButton").classList.remove("hidden")
    }
    
    const deleteInventoryRow = (index) =>{
        const updatedInventoryRows = [...inventoryRows];
        updatedInventoryRows.splice(index,1)
        console.log(updatedInventoryRows)
        setInventoryRows(updatedInventoryRows)
        document.getElementById("saveButton").classList.remove("hidden")

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
                <tr key={index} className="h-10 bg-slate-200 rounded shadow-sm sm:text-left hover:bg-slate-300 transition-all ease-in-out duration-300" ref={event => (row[index] =event)}>
                    <td className="p-1">
                        <label className="block w-full bg-slate-50 sm:hidden">Item name</label>
                        <input className="rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.Item} onChange={(event)=>onChangeInventoryCell(event, index, "Item")} type="text" required />    
                    </td>
                    <td className="p-1">
                        <label className="block w-full bg-slate-50 sm:hidden">Description</label>
                        <input className="rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.Description} onChange={(event)=>onChangeInventoryCell(event, index, "Description")} type="text" required />
                    </td>
                    <td className="p-1">  
                        <label className="block w-full bg-slate-50 sm:hidden">Quantity</label>
                        <input className="rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.Quantity} onChange={(event)=>onChangeInventoryCell(event, index, "Quantity")} type="number" required />
                    </td>
                    <td className="p-1">
                        <label className="block w-full bg-slate-50 sm:hidden">Selling Price</label>
                        <input className="rounded pl-2 bg-slate-50 w-full shadow-sm" value={row.SellingPrice} onChange={(event)=>onChangeInventoryCell(event, index, "SellingPrice")} type="number" required />
                    </td>
                    <td>                    
                        <label className="block bg-slate-50 lg:hidden md:hidden  cursor-pointer " onClick={()=>deleteInventoryRow(index)}>Delete row</label>
                        <button className=""onClick={()=>deleteInventoryRow(index)}> <BsDash /></button>
                    </td>
                </tr>
                ))}
                </tbody>
                </table>   
                <label className="block bg-slate-50 lg:hidden md:hidden  cursor-pointer " onClick={addInventoryRow}>Add new row</label>

            </div>
            <h1 className='text-center text-6xl mb-10'>Supplies</h1>
            <div className="bg-white pb-16 w-full m-auto p-4 rounded-xl shadow-2xl">

                <table className="table-auto w-full h-auto md:table-fixed sm:table-fixed">
                <thead>
                    <tr>
                        <th className="w-4/12 border-t border-l">Item</th>
                        <th className="w-5/12 border-t border-l">Description</th>
                        <th className="w-1/12 border-t border-l">Quantity</th>
                        <th className="w-1/12 border-t border-l">Price per Unit</th>
                        <button onClick={addIngredientsRow}>+</button>

                    </tr>
                </thead>
                <tbody >
                {ingredientsRows.map((row, index) => (
                <tr key={index} className="h-10 bg-slate-200 rounded shadow-sm sm:text-left hover:bg-slate-300 transition-all ease-in-out duration-300" ref={event => (row[index] =event)}>
                    <td className="p-1  ">
                        <label className="block w-full bg-slate-50 sm:hidden">Item name</label>
                        <input className=" rounded pl-2 bg-slate-50 w-full shadow-sm"value={row.Item} onChange={(event)=>onChangeIngredientsCell(event, index, "Item")} required />    
                    </td>
                    <td className="p-1  ">
                    <label className="block w-full bg-slate-50 sm:hidden">Description</label>
                        <input className=" rounded pl-2 bg-slate-50 w-full shadow-sm"value={row.Description} onChange={(event)=>onChangeIngredientsCell(event, index, "Description")} type="text" required />
                    </td>
                    <td className="p-1  ">  
                        <label className="block w-full bg-slate-50 sm:hidden">Quantity</label>
                        <input className=" rounded pl-2 bg-slate-50 w-full shadow-sm"value={row.Quantity} onChange={(event)=>onChangeIngredientsCell(event, index, "Quantity")} type="number" required />
                    </td>
                    <td className="p-1  ">
                        <label className="block w-full bg-slate-50 sm:hidden">Item name</label>
                        <input className=" rounded pl-2 bg-slate-50 w-full shadow-sm"value={row.ppu} onChange={(event)=>onChangeIngredientsCell(event, index, "ppu")} type="number" required />
                    </td>
                    <td>                    
                        <label className="block bg-slate-50 lg:hidden md:hidden  cursor-pointer " onClick={()=>deleteIngredientsRow(index)}>Delete row</label>
                        <button className=""onClick={()=>deleteIngredientsRow(index)}> <BsDash /></button>
                    </td>
                </tr>
                ))}
                </tbody>
                </table>   
                <label className="block bg-slate-50 lg:hidden md:hidden  cursor-pointer " onClick={addIngredientsRow}>Add new row</label>
                
            </div>

            <button onClick={onSave} id="saveButton"className="transition-all ease-in-out duration-75 rounded-full fixed bottom-10 right-10 bg-green-700 p-3 hidden"><FiSave size={50}/></button>          

            </>
        )
    }


export default Inventory; 