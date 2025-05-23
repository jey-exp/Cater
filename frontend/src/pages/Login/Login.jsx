import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { burger1, fries1, piza1, egg1 } from "../../assets";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { PiEyeSlashLight } from "react-icons/pi";
import toast from "react-hot-toast";
import useSupaBase from "../../contextProvider";
import { hash } from "../../utilities/helper";
import { GridLoader } from "react-spinners";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const supa = useSupaBase((state) => state.supaObj);
  const [showUi, setShowUi] = useState(false);
  const [signAuth, setSignAuth] = useState(false);
  const [signin_UserName, signin_SetUserName] = useState("");
  const [signin_phone, signin_setPhone] = useState("");
  const [signin_email, signin_setEmail] = useState("");
  const [signin_pass, signin_setPass] = useState("");
  const [signin_showPass, signin_setShowPass] = useState(false);
  const [signin_isSubmitting, signin_setIsSubmitting] = useState(false);

  useEffect(()=>{
    try {
      const checkSession = async()=>{
        const { data: { user } } = await supa.auth.getUser()
        setTimeout(() => {
          if(user){
              navigate("/home");
            return;
          }
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
    setSignAuth(true);
  };

  // Signin functions

  const handleSignin_UserNameChange = (e) =>{
    signin_SetUserName(e.target.value);
  }

  const handleSignin_emailChange = (e) =>{
    signin_setEmail(e.target.value);
  }

  const handleSignin_phoneChange = (e) =>{
    signin_setPhone(e.target.value);
  }

  const handleSignin_passChange = (e) =>{
    signin_setPass(e.target.value);
  }

  const handleSignin_submit = (e)=>{
    const toastId = toast.loading("Signing In...");
    if (signin_UserName === '' || signin_email === '' || signin_pass ==='' || signin_pass === ''){
      toast.error("Fill all details", {id:toastId});
      return;
    }
    else{
      signin_setIsSubmitting(true);
      try {
        async function signUpNewUser() {
          const { data, error } = await supa.auth.signUp({
            email: signin_email,
            password: signin_pass,
            options: {
              emailRedirectTo: `${process.env.REACT_APP_HOST_ENDPOINT}/home`,
            },
          })
          console.log(data);
          console.log(error);
          if(error){
            toast.error(error.message, {id:toastId});
          }
          else{
            toast.success("Signin successful!", {id:toastId})
            setSignAuth(false);
          }
          signin_setIsSubmitting(false);
        }
        signUpNewUser();
      } catch (error) {
        console.error("Error in signin : ", error);
        signin_setIsSubmitting(false);
        toast.error("Unexpected error occured", {id:toastId});
      }
    }
  }

  const handleSupaBaseLogin = async (e)=>{
    const toastId = toast.loading("Logging in...");
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
      console.error( "Error in supabse signin : ",error.message);
      toast.error(error.message , {id:toastId});
    }
    else{
      const userEmail = data.user.email;
      const hashedEmail = (await hash(userEmail)).toString();
      localStorage.setItem("user", hashedEmail);
      toast.success("Login successful",  {id: toastId});
    }
    navigate("/home");
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
        signAuth ? (
          <div className="h-screen w-screen bg-gray-300 flex flex-col justify-center items-center">
                <div className=" flex flex-col justify-center items-center w-20rem bg-white backdrop-blur-lg bg-opacity-25 h-40rem p-8 rounded-lg shadow-xl gap-6 z-10 relative">
                  <div className="mt-4">
                    <h3 className="text-3xl p-1 mb-2 text-custom-blue-123 font-semibold">
                      Sign In
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5 items-center justify-center ">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none"
                      value={signin_UserName}
                      onChange={handleSignin_UserNameChange}
                    />
                    <input
                      type="text"
                      placeholder="Enter your Email"
                      className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none"
                      value={signin_email}
                      onChange={handleSignin_emailChange}
                    />
                    <input
                      type="number"
                      placeholder="Enter your number"
                      className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none"
                      value={signin_phone}
                      onChange={handleSignin_phoneChange}
                    />
                    <div className="relative flex items-center">
                      <input
                        type={signin_showPass ? "text" : "password"}
                        placeholder="password"
                        className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none pl-3 pr-10"
                        value={signin_pass}
                        onChange={handleSignin_passChange}
                      />
                      {signin_showPass ? (
                        <FaRegEye
                        onClick={() => signin_setShowPass(!signin_showPass)}
                        className="absolute right-3 cursor-pointer"
                        />
                      ) : (
                        <PiEyeSlashLight
                          onClick={() => signin_setShowPass(!signin_showPass)}
                          className="absolute right-3 cursor-pointer"
                        />
                      )}
                    </div>
                    <button
                      className="bg-custom-blue-123 text-white p-2 rounded-md pl-4 pr-4 drop-shadow-md hover:bg-indigo-950 disabled:bg-neutral-700"
                      onClick={handleSignin_submit}
                      disabled={signin_isSubmitting}
                    >
                      Sign In
                    </button>
                    <p
                      className="text-custom-blue-123 cursor-pointer hover:text-indigo-950"
                      onClick={()=>setSignAuth(false)}
                    >
                      Already a user? Try Login
                    </p>
                  </div>
                  <div
                    className="text-custom-gray-123 mb-3 mt-4
                  "
                  >
                    <p>Indulge Your Senses, Sign In to Savory Delights!</p>
                  </div>
                </div>
                <div className="absolute bottom-36   right-1/4">
                  <img src={burger1} className="w-80 h-80" />
                </div>
                <div className="absolute top-20   left-1/4">
                  <img src={piza1} className="w-80 h-80" />
                </div>
                <div className="absolute top-20   right-0">
                  <img src={egg1} className="w-56 h-56" />
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
    )
  );
};
