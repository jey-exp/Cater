import React, { useEffect, useState } from "react";
import "./Home.css";
import { CateringCard, Navbar } from "../../components";
import axios from "axios";
import TruncatedText from "../../components/TruncatedText/TruncatedText";
import {toast} from "react-hot-toast";
import {PropagateLoader} from "react-spinners";

const Home = () => {
  const [cater, setcater] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
      const fetchCater = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/getallcater`
          );
          const data = response.data;
          setcater(data.data);
        } catch (err) {
          if(err.response?.data){
            toast.error(err.response.data.msg)
          }
          else{
            toast.error("Unexpected error occured");
          }
          console.log("Error in fetching cater details", err);
        }
        finally{
          setLoading(false);          
        }
      };
      fetchCater();
  }, []);
  

  return (
    <div className="min-h-screen w-screen bg-blue-50 pb-10">
      {isLoading && (
        <div className="fixed h-screen w-screen bg-slate-200 flex justify-center items-center">
          <PropagateLoader color={"#1D3557"}/>
        </div>
      )}
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5 mt-7">
        {cater.length === 0 ? (
          <div className="text-red-500 opacity-60 font-medium text-xl ">
            No cater found!
          </div>
        ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {cater.map((item, index) => (
            <CateringCard
              key={index}
              name={item.name}
              location={item.location}
              about={<TruncatedText text={item.about} limit={70} />}
              price={item.price}
              uuid = {item.uuid}
            />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Home;
