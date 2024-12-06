import React from 'react'
import {profileimg} from "../../assets"

const CaterNavBar = () => {
  return (
    <div className='w-screen px-5 py-3 bg-white flex justify-between gap-5 drop-shadow-lg items-center'>
      <div className='text-2xl font-bold'>Cater profile</div>
      <div>
        <img src={profileimg} alt="Logo" sizes='10' className='w-10 h-10'/>
      </div>
    </div>
  )
}

export default CaterNavBar
