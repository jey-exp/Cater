import React, { useContext, useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { burger1, egg1, fries1, piza1 } from "../../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../authContext";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const { login, logout, isAuthenticated, setgmail } = useAuth();
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
    e.preventDefault();
    console.log({ email, pass });

    const data = {
      email: email,
      pass: pass,
    };

    try {
      console.log("Working on login");
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        data
      );
      console.log(response.data.msg);
      if (response.data.msg === "Success") {
        console.log("Login success");
        login();
        setgmail(email);
        navigate("/home");
      } else {
        console.log(response.data.msg);
        logout();
      }
    } catch (err) {
      console.error("Signin error:", err);
      logout();
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-300 flex flex-col justify-center items-center ">
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
          <input
            type="password"
            placeholder="Password"
            className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none"
            value={pass}
            onChange={handlepassChange}
          />
          <button
            className="bg-custom-blue-123 text-white p-2 rounded-md pl-4 pr-4 drop-shadow-md hover:bg-indigo-950"
            onClick={handleSubmit}
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
          className="text-custom-gray-123 mb-3 mt-4
    "
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
  );
};
