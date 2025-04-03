import React, { useEffect, useState } from 'react'
import CaterNavBar from '../../../components/CarterNavBar/CaterNavBar'
import CaterDetails from '../../../components/CaterDetails/CaterDetails'
import CaterMenu from '../../../components/CaterMenu/CaterMenu'
import CaterOrders from '../../../components/CaterOrders/CaterOrders'
import { useNavigate } from 'react-router-dom'

const CaterHome = () => {
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(localStorage.getItem("caterAuth"));
  if (!isAuthenticated || isAuthenticated === false) {
        navigate("/notauthenticated");
  }
  else{
    return (
      <div className='w-auto min-h-screen bg-blue-50 flex flex-col gap-10 items-center pb-10'>
        <CaterNavBar/>
        <CaterDetails/>
        <CaterMenu/>
        <CaterOrders/>
      </div>
    )
  }
}

export default CaterHome
