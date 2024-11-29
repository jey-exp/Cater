import React, { useEffect, useState } from "react";
import "./Home.css";
import { CateringCard, Navbar } from "../../components";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import axios from "axios";
import { emphasize } from "@mui/material";
import TruncatedText from "../../components/TruncatedText/TruncatedText";

const Home = () => {
  const navigate = useNavigate();
  const [cater, setcater] = useState([]);
  const { isAuthenticated, gmail } = useAuth();


  const handleback = () => {
    navigate("/login");
  };
  return (
    <div className="h-screen w-screen bg-blue-50">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5">
        <h3 className=" text-3xl">Available Catering:</h3>
        <div className="flex justify-start w-screen px-5">
          <button
            className="flex items-center gap-2 bg-custom-blue-123 text-white p-1 pl-2 pr-4  rounded drop-shadow-lg hover:bg-indigo-950"
            onClick={handleback}
          >
            <IoChevronBackOutline />
            Back
          </button>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {cater.map((item, index) => (
            <CateringCard
              key={index}
              name={item.name}
              location={item.location}
              about={<TruncatedText text={item.about} limit={70} />}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
