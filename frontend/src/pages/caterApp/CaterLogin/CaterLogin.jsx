import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../authContext';
import { PiEyeSlashLight } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { hash } from '../../../utilities/helper';

const CaterLogin = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const {caterLogin, logout, setCaterEmail} = useAuth();
  
  
    const handlechangetosigin=(e)=>{
        navigate("/caterapp/signin");
    }
  
    const handleemailChange=(e)=>{
        setEmail(e.target.value);
    }
  
    const handlepassChange=(e)=>{
        setPass(e.target.value);
    }
  
    const handleSubmit= async (e)=>{
        const toastId = toast.loading("Loging you in...");
        if(email===""||pass===""){
            toast.error("All fields must be filled", {id:toastId});
            return;
        }
        try {
            const data={
                gmail: email,
                pass : pass
            }
            const response = await axios.post(`${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/caterapp/login`, data);
            if(response.data.msg==="success"){
              const hashedEmail = await hash(email);
              localStorage.setItem("caterAuth", JSON.stringify(true));
              localStorage.setItem("caterEmail", JSON.stringify(hashedEmail));
                toast.success("Logged In", {id:toastId});
                navigate("/caterapp/home");
            }
            else if(response.data.msg==="User not found" || response.data.msg==="Invalid credentials" || response.data.msg==="Internal server error"){
                toast.error(response.data.msg, {id:toastId});
            }
        } catch (error) {
            console.log("Error while loggin in cater:", error);
            toast.error(error.response.data.msg, {id:toastId})
            
        }
    }
  return (
    <div className="w-screen min-h-screen p-5 bg-gray-300 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 items-center justify-center bg-white p-5 rounded-lg">
        <div className="text-2xl font-bold text-custom-blue-123">
          Cater Login
        </div>
        <input
          type="text"
          placeholder="Enter your Email"
          className="w-96 rounded-md p-2.5 bg-neutral-100 drop-shadow-md outline-none"
          value={email}
          onChange={handleemailChange}
        />
        <div className="relative flex items-center">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-96 rounded-md p-2.5 bg-neutral-100 drop-shadow-md outline-none"
            value={pass}
            onChange={handlepassChange}
          />
          {showPass ? (
            <FaRegEye
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 cursor-pointer"
            />
          ) : (
            <PiEyeSlashLight
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 cursor-pointer"
            />
          )}
        </div>
        <button
          className="bg-custom-blue-123 text-white p-2 rounded-md pl-4 pr-4 drop-shadow-md hover:bg-indigo-950"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p
          className="text-custom-blue-123 cursor-pointer hover:text-indigo-950"
          onClick={handlechangetosigin}
        >
          New user? Try Sign In
        </p>
      </div>
    </div>
  );
}

export default CaterLogin
