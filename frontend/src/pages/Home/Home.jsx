import React, { useEffect, useState } from "react";
import "./Home.css";
import { CateringCard, Navbar } from "../../components";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import axios from "axios";
import { emphasize } from "@mui/material";
import TruncatedText from "../../components/TruncatedText/TruncatedText";
import {toast} from "react-hot-toast";
import {PacmanLoader, PropagateLoader} from "react-spinners";

const Home = () => {
  const navigate = useNavigate();
  const [cater, setcater] = useState([]);
  const { isAuthenticated, gmail } = useAuth();
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    console.log(gmail);
    if (!isAuthenticated) {
      navigate("/notauthenticated");
    } else {
      const fetchCater = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/getallcater"
          );
          const data = response.data;
          setTimeout(() => {
            setLoading(false);
            setcater(data.data);
          }, 1000);
        } catch (err) {
          toast.error("Error, Please try again later.")
          console.log("Error in fetching cater details", err);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      };
      fetchCater();
    }
  }, []);

  const handleback = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen w-screen bg-blue-50 pb-10">
      {isLoading && (
        <div className="fixed h-screen w-screen bg-slate-200 flex justify-center items-center">
          <PropagateLoader color={"#1D3557"}/>
        </div>
      )}
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
