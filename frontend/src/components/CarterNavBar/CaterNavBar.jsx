import React, { useState } from 'react'
import {profileimg} from "../../assets"
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import toast from 'react-hot-toast';


const CaterNavBar = () => {
  const navigate = useNavigate();
  const [loadingLogout, setLoadingLogout] = useState(false);
  
  const handleLogout = ()=>{
    setLoadingLogout(true);
    localStorage.setItem("caterAuth", false);
    localStorage.removeItem("caterEmail");
    setTimeout(() => {
      navigate("/caterapp/login");
      setLoadingLogout(false);
    }, 1000);
  }

  return (
    <div className='w-screen px-5 py-3 bg-white flex justify-between gap-5 drop-shadow-lg items-center'>
      <div className='text-2xl font-bold'>Cater profile</div>
      <div className='flex gap-4 items-center'>
        <div onClick={()=>toast.error("Option not available")}>
        <img src={profileimg} alt="Logo" sizes='10' className='w-10 h-10 cursor-pointer'/>
        </div>
        {
        loadingLogout ? (
          <div>
              <PuffLoader color={"#1D3557"} size={40}/>
            </div>
        ) : (
          <BiLogOut size={38} className='cursor-pointer' onClick={handleLogout}/>
        )
      }
      </div>
    </div>
  )
}

export default CaterNavBar
