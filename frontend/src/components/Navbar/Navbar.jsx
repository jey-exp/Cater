import React, { useState } from "react";
import "./Navbar.css";
import { logo, profileimg } from "../../assets";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import useSupaBase from "../../contextProvider";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggingout, setLoggingOut] = useState(false);
  const supa = useSupaBase((state)=> state.supaObj);

  const handleLogout = async () => {
    setLoggingOut(true);
    const {error} = await supa.auth.signOut();
    if(error){
      toast.error(error.message);
    }
    else{
      localStorage.removeItem("user");
    }
    setLoggingOut(false);
  };

  const handleprofileclick = () => {
    navigate("/profile");
  };

  return (
    <nav>
      <div className="w-full flex justify-between items-center drop-shadow-lg bg-white">
        <div className="ml-4">
          <img src={logo} alt="logo" className="w-20 h-20" />
        </div>
        <div className="flex justify-evenly items-center p-3 gap-6 mr-2">
          <img
            src={profileimg}
            alt="profile"
            onClick={handleprofileclick}
            className="w-12 h-12 cursor-pointer"
          />
          {
          loggingout ? (
            <div>
              <PuffLoader color={"#1D3557"}/>
            </div>
          ) : (
          <TbLogout2
            size={48}
            color="#1D3557"
            onClick={handleLogout}
            className="cursor-pointer"
          />
          )
        }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
