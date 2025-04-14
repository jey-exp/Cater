import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';
import { PropagateLoader } from 'react-spinners';
import { decode } from '../../utilities/helper';
import {useCaterUuid} from "../../contextProvider.js"

const CaterDetails = () => {
  const [caterName, setCaterName] = useState(null);
  const [location, setLocation] = useState(null);
  const [about, setAbout] = useState(null);
  const [email, setEmail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh]= useState(false);
  const [isLoading, setLoading] = useState(true);


  useEffect(()=>{
      try {
          const getAllcater = async ()=>{
            const hahsedCaterEmail = JSON.parse(localStorage.getItem("caterEmail") || "");
            const caterEmail = await decode(hahsedCaterEmail);
              const data={
                  caterEmail
              }
              const response = await axios.post(`${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/getSpecificCater`, data);
              if(response.data.msg==="success"){
                  if(response.data.caterDetails.name){
                    setCaterName(response.data.caterDetails.name);
                  }
                  if(response.data.caterDetails.location){
                    setLocation(response.data.caterDetails.location);
                  }
                  if(response.data.caterDetails.about){
                    setAbout(response.data.caterDetails.about);
                  }
                  if(response.data.caterDetails.email){
                    setEmail(response.data.caterDetails.email);
                  }
                  setLoading(false);
                  return;
              }
              else{
                  console.log(response.data.msg);
                  toast.error("Something went wrong");
                  setLoading(false);
              }
          }
          getAllcater();
          
      } catch (error) {
          toast.error("Something went wrong");
          console.log("Error in cater details : ", error);
          setLoading(false);
          
      }
  },[refresh])

  const handleUpdate = async (name, about, location)=>{
    const toastId = toast.loading("Updating...");
    const caterUuid = JSON.parse(localStorage.getItem("caterId"));
      try {
        const data = {
          name : name,
          about : about,
          location : location,
          uuid : caterUuid
        }
        const response = await axios.post(`${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/caterapp/updatecater`, data);
        if(response.data.msg==="success"){
          toast.success("Applied changes", {id:toastId});
          setRefresh(!refresh);
        }
        else{
          toast.error("Error in updating...", {id:toastId});
        }
        setModalOpen(false);
        return;
      } catch (error) {
        console.log("Error in updating cater details" ,error);
        toast.error("Couldn't update", {id:toastId});
        setModalOpen(false);
        return;
      }
  }
  return (
    <div className='custom-width h-auto p-5 rounded-lg drop-shadow-lg bg-white flex flex-col gap-5'>
        <div className='flex justify-center text-2xl font-bold text-custom-blue-123'>
            My Details
        </div>
        {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 w-full">
          <div className="relative w-full h-full flex justify-center items-center"></div>
            <div className='w-full jsutify-center'>
              <PropagateLoader color={"#1D3557"}/>
            </div>
        </div>
      )}
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
          <span className='text-black font-medium text-xl'> {about}</span>
        ) : (
          <span className='text-slate-400 font-light text-base'> click edit to add Location</span>
        )}
      </div>
      <div className='text-2xl font-bold text-custom-blue-123'>Email : 
        {email ? (
          <span className='text-black font-medium text-xl'> {email}</span>
        ) : (
          <span className='text-slate-400 font-light text-base'> click edit to add Email</span>
        )}
      </div>
      <div className='flex justify-between px-5'>
        <div></div>
        <button className='px-5 py-2 bg-custom-blue-123 rounded-lg drop-shadow-lg text-white font-bold' onClick={()=>{setModalOpen(true)}}>Edit</button>
      </div>
      <Modal isOpen={modalOpen} onClose={()=>{setModalOpen(false)}} name={caterName} about={about} location={location} onUpdate={handleUpdate}/>
    </div>
  )
}
export default CaterDetails
