import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CaterDetails = () => {
  const {caterEmail} = useAuth();
  const [caterName, setCaterName] = useState(null);
  const [location, setLocation] = useState(null);
  const [about, setAbout] = useState(null);
  const [email, setEmail] = useState(null);


  useEffect(()=>{
      try {
          const getAllcater = async ()=>{
              const data={
                  caterEmail
              }
              const response = await axios.post("http://localhost:3000/api/v1/getSpecificCater", data);
              if(response.data.msg==="Success"){
                  console.log("From",response.data.caterDetails);
                  if(response.data.caterDetails.name){
                    setCaterName(response.data.caterDetails.name);
                  }
                  if(response.data.location){
                    setLocation(response.data.caterDetails.location);
                  }
                  if(response.data.about){
                    setAbout(response.data.caterDetails.about);
                  }
                  if(response.data.email){
                    setEmail(response.data.caterDetails.email);
                  }
                  return;
              }
              else{
                  console.log(response.data.msg);
                  toast.error("Something went wrong");
              }
          }
          getAllcater();
          
      } catch (error) {
          toast.error("Something went wrong");
          console.log("Error");
          
      }
  },[])
  return (
    <div className='custom-width h-auto p-5 rounded-lg drop-shadow-lg bg-white flex flex-col gap-5'>
        <div className='flex justify-center text-2xl font-bold text-custom-blue-123'>
            My Details
        </div>
      <div className='text-2xl font-bold text-custom-blue-123'>Name : 
        {caterName ? (
          <span className='text-black font-medium text-xl'> {caterName}</span>
        ) :
        (
          <span className='text-slate-400 font-light text-m'> click edit to add Name</span>
        )}

         </div>
      <div className='text-2xl font-bold text-custom-blue-123'>Location : 
        {location ? (
          <span className='text-black font-medium text-xl'> {location}</span>
        ) : (
          <span className='text-slate-400 font-light text-base'> click edit to add Location</span>
        )}
      </div>
      <div className='text-2xl font-bold text-custom-blue-123'>About : 
        {about ? (
          <span className='text-black font-medium text-xl'>{about}</span>
        ) : (
          <span className='text-slate-400 font-light text-base'> click edit to add Location</span>
        )}
      </div>
      <div className='text-2xl font-bold text-custom-blue-123'>Email :
        {email ? (
          <span className='text-black font-medium text-xl'>{email}</span>
        ) : (
          <span className='text-slate-400 font-light text-base'> click edit to add Email</span>
        )}
      </div>
      <div className='flex justify-between px-5'>
        <div></div>
        <button className='px-5 py-2 bg-custom-blue-123 rounded-lg drop-shadow-lg text-white font-bold'>Edit</button>
      </div>
    </div>
  )
}
export default CaterDetails
