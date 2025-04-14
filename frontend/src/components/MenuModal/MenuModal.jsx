import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { decode } from '../../utilities/helper';

const MenuModal = ({onClose, onSubmit, time} ) => {
    const [food, setFood] = useState("");
    const [proteins, setProteins] = useState("");
    const [fat, setFat] = useState("");
    const [calorie, setCalorie] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = async ()=>{
        try {
            if(food === "" || proteins === "" || fat === "" || calorie === "" || price === ""){
                return toast('Fill all fields' , {icon : '❗'})
            }
            console.log("Handling from menu modal");
            const caterUuid = JSON.parse(localStorage.getItem("caterId"));
            const caterEmailCoded = JSON.parse(localStorage.getItem("caterEmail"));
            const caterEmail = await decode(caterEmailCoded);
            const data =[ caterEmail, time, food, proteins, fat, calorie, price, caterUuid];
            onSubmit(data);
        } catch (error) {
            console.log("Error in adding menu : ", error);
            toast.error("Couldn't add menu");
        }
    }

  return (
    <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 rounded'>
        <div className='w-full h-full flex justify-center items-center relative'>
            <div className='bg-white rounded-lg w-auto h-auto p-4 flex flex-col gap-5'>
                <div className='w-full flex justify-center'>
                <h1 className='text-2xl text-custom-blue-123 font-bold'>Enter new row in {time}</h1>
                </div>
                <div className='flex w-auto items-center gap-2'>
                    <div className='text-xl font-bold'>
                        Food :
                    </div>
                    <input type="text" placeholder='idli' value={food} onChange={(e)=>{setFood(e.target.value)}} className='p-2 bg-slate-100 outline-0 rounded'/>
                </div>
                <div className='flex w-auto items-center gap-2'>
                    <div className='text-xl font-bold'>
                        Proteins :
                    </div>
                    <input type="number" placeholder='Enter' value={proteins} onChange={(e)=>{setProteins(e.target.value)}} className='p-2 bg-slate-100 outline-0 rounded'/>
                </div>
                <div className='flex w-auto items-center gap-2'>
                    <div className='text-xl font-bold'>
                        Fat :
                    </div>
                    <input type="number" placeholder='Enter' value={fat} onChange={(e)=>{setFat(e.target.value)}} className='p-2 bg-slate-100 outline-0 rounded'/>
                </div>
                <div className='flex w-auto items-center gap-2'>
                    <div className='text-xl font-bold'>
                        Calorie :
                    </div>
                    <input type="number" placeholder='Enter' value={calorie} onChange={(e)=>{setCalorie(e.target.value)}} className='p-2 bg-slate-100 outline-0 rounded'/>
                </div>
                <div className='flex w-auto items-center gap-2'>
                    <div className='text-xl font-bold'>
                        Price :
                    </div>
                    <input type="number" placeholder='Enter' value={price} onChange={(e)=>{setPrice(e.target.value)}} className='p-2 bg-slate-100 outline-0 rounded'/>
                </div>
                <div className='flex justify-between gap-5 w-full'>
                    <button onClick={onClose} className='px-4 py-1 rounded shadow-md bg-red-700 text-white font-medium'>Close</button>
                    <button onClick={handleSubmit} className='px-4 py-1 rounded shadow-md bg-custom-blue-123 text-white font-medium' >Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MenuModal
