import React from "react";
import { burger1, float, popsicle } from "../../assets";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const LogintoContinue = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="w-screen h-screen bg-gray-300 flex justify-center items-center flex-col gap-2">
      <div className="flex mr-8">
        <div className="flex gap-0">
          {/* <img src={float} alt="float" className="w-80 h-80" /> */}
          <img src={popsicle} alt="login" className="w-96 h-96  " />
        </div>
        <div className="flex flex-col justify-center items-start gap-4">
          <h3 className="font-bold text-3xl">Login to continue</h3>
          <p>Your privary and security is our first concern !</p>
          <button
            className="p-3 rounded outline-2 bg-white drop-shadow font-semibold hover:bg-slate-100 flex justify-center items-center gap-3 "
            onClick={handleLogin}
          >
            Go to Login
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogintoContinue;
