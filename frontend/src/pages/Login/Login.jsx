import React, { useContext, useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { burger1, fries1, piza1 } from "../../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../authContext";
import { FaRegEye } from "react-icons/fa";
import { PiEyeSlashLight } from "react-icons/pi";
import toast, { ToastBar } from "react-hot-toast";
import useSupaBase from "../../contextProvider";
import { hash, decode } from "../../helpers/helper";
import { GridLoader } from "react-spinners";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const { login, logout, setgmail } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const supa = useSupaBase((state) => state.supaObj);
  const [showUi, setShowUi] = useState(false);

  useEffect(()=>{
    try {
      const checkSession = async()=>{
        const { data: { user } } = await supa.auth.getUser()
        if(user){
          setTimeout(() => {
            navigate("/home");
          }, 1000);
          return;
        }
        setTimeout(() => {
          setShowUi(true);
        }, 1000);
      }
      checkSession();
    } catch (error) {
      console.log("Error in checking session : ", error);
    }
  },[])

  const handleemailChange = (e) => {
    setemail(e.target.value);
  };

  const handlepassChange = (e) => {
    setpass(e.target.value);
  };

  const handlechangetosignin = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loging in...");
    setIsSubmiting(true);
    e.preventDefault();
    
    if(email==="" || pass ===""){
      toast.error("Enter credentials", {id:toastId});
      setIsSubmiting(false);
      return;
    }

    const data = {
      email: email,
      pass: pass,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/login`,
        data
      );
      if (response.data.msg === "success") {
        console.log("Login success");
        login();
        setgmail(email);
        toast.success("Login successfull", {id:toastId})
        navigate("/home");
      }else if(response.data.msg==="Invalid credentials"){
        toast.error("Check your credentials", {id:toastId})
      } else {
        toast.error("Couldn't login!", {id:toastId} )
        logout();
      }
    } catch (err) {
      if(err.response?.data){
        toast.error(err.response.data.msg, {id:toastId})
      }
      else{
        toast.error(err.message, {id:toastId});
      }
      logout();
    }
    finally{
      setIsSubmiting(false);
    }
  };

  const handleSupaBaseLogin = async (e)=>{
    const toastId = toast.loading("Loging in...");
    setIsSubmiting(true);
    e.preventDefault();
    
    if(email==="" || pass ===""){
      toast.error("Enter credentials", {id:toastId});
      setIsSubmiting(false);
      return;
    }

    const { data, error } = await supa.auth.signInWithPassword({
      email: email,
      password: pass,
    })
    if(error){
      console.log(error.message);
      toast.error(error.message , {id:toastId});
    }
    else{
      const userEmail = data.user.email;
      const hashedEmail = (await hash(userEmail)).toString();
      const verify = decode(hashedEmail);
      localStorage.setItem("user", hashedEmail);
      toast.success("Logged In",  {id: toastId});
    }
    setIsSubmiting(false);
  }

  return (
    showUi === false ? (
      <div className="bg-gray-300 w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <GridLoader color={"#1D3557"} />
          <h1 className="text-2xl text-custom-blue-123 font-semibold">Verifing your request</h1>
        </div>
      </div>
    ) : (
    <div className="h-screen w-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className=" flex flex-col justify-center items-center w-20rem bg-white backdrop-blur-lg bg-opacity-25 h-40rem p-8 rounded-lg shadow-xl gap-6 z-10 relative">
        <div className="mt-4">
          <h3 className="text-3xl p-1 mb-2 text-custom-blue-123 font-semibold">
            Login
          </h3>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center ">
          <input
            type="text"
            placeholder="Enter your Email"
            className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none"
            value={email}
            onChange={handleemailChange}
          />
          <div className="flex relative items-center">
            <input
              type={showPass ? "text" : "password"}
              placeholder="password"
              className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none pl-3 pr-10"
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
            className="bg-custom-blue-123 text-white p-2 rounded-md pl-4 pr-4 drop-shadow-md hover:bg-indigo-950 disabled:bg-neutral-700"
            onClick={handleSupaBaseLogin}
            disabled={isSubmiting}
          >
            Login
          </button>
          <p
            className="text-custom-blue-123 cursor-pointer hover:text-indigo-950"
            onClick={handlechangetosignin}
          >
            New user? Try SignIn
          </p>
        </div>
        <div
          className="text-custom-gray-123 mb-3 mt-4"
        >
          <p>Unlock Flavorful Delights with Every Login</p>
        </div>
      </div>
      <div className="absolute bottom-36   right-1/4">
        <img src={burger1} className="w-80 h-80" />
      </div>
      <div className="absolute top-20   left-1/4">
        <img src={piza1} className="w-80 h-80" />
      </div>
      <div className="absolute bottom-10   left-44">
        <img src={fries1} className="w-44 h-44" />
      </div>
    </div>
    )
  );
};
