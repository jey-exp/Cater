import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { burger1, egg1, fries1, piza1 } from "../../assets";
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [pass, setpass] = useState("");
  const navigate = useNavigate();
  const handleusernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleemailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlephoneChange = (e) => {
    setphone(e.target.value);
  };

  const handlepassChange = (e) => {
    setpass(e.target.value);
  };
  const handlechangetologin = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, email, phone, pass });

    const data = {
      name: username,
      email: email,
      phone: phone,
      pass: pass,
    };

    try {
      console.log("Working on signin");
      const response = await axios.post(
        "http://localhost:3000/api/v1/signin",
        data
      );
      console.log(response.data.msg);
      if (response.data.msg === "Success") {
        console.log("Signin success");
        navigate("/login");
      } else {
        console.log(response.data.msg);
      }
    } catch (err) {
      console.error("Signin error:", err);
    }
  };
  return (
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
            value={username}
            onChange={handleusernameChange}
          />
          <input
            type="text"
            placeholder="Enter your Email"
            className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none"
            value={email}
            onChange={handleemailChange}
          />
          <input
            type="number"
            placeholder="Enter your number"
            className="w-96 rounded-md p-2.5 bg drop-shadow-md outline-none"
            value={phone}
            onChange={handlephoneChange}
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
            Sign In
          </button>
          <p
            className="text-custom-blue-123 cursor-pointer hover:text-indigo-950"
            onClick={handlechangetologin}
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
  );
};

export default Signin;
