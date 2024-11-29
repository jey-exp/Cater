import React, { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const CateringCard = ({ name, location, about, price }) => {
  const [ab, setab] = useState(about);
  const navigate = useNavigate();

  useEffect(() => {
    if (ab.length >= 110) {
      setab(ab.slice(0, 110) + "...");
    }
  }, [ab]);

  const hamndleCater = () => {
    navigate(`/cater/${name}`);
  };
  return (
    <div className="">
      <div className="w-96  bg-white drop-shadow-lg p-6 rounded flex flex-col gap-4">
        <h1 className="text-black text-3xl font-medium">{name} </h1>
        <div className="flex justify-start items-center">
          <MdLocationOn size={30} color="#1D3557" />
          <h4 className="text-xl">{location}</h4>
        </div>
        <p>{ab}</p>
        <div className="flex between item-center justify-between">
          <p>
            Avg Price: ₹<span>{price}</span>
          </p>
          <button
            className="flex items-center gap-2 bg-custom-blue-123 text-white p-1 pl-4 pr-2  rounded drop-shadow-lg hover:bg-indigo-950"
            onClick={hamndleCater}
          >
            Next <GrFormNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CateringCard;
