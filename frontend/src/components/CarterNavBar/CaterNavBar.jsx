import React from 'react'
import {profileimg} from "../../assets"
import { GrLogout } from 'react-icons/gr'
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const CaterNavBar = () => {
  const navigate = useNavigate();
  
  const handleLogout = ()=>{
    navigate("/caterapp/login");
  }

  return (
    <div className='w-screen px-5 py-3 bg-white flex justify-between gap-5 drop-shadow-lg items-center'>
      <div className='text-2xl font-bold'>Cater profile</div>
      <div className='flex gap-4 items-center'>
        <img src={profileimg} alt="Logo" sizes='10' className='w-10 h-10'/>
        <BiLogOut size={38} className='cursor-pointer' onClick={handleLogout}/>
      </div>
    </div>
  )
}

export default CaterNavBar
