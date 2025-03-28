import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Modal = ({ isOpen, onClose, name, about, location, onUpdate }) => {
  const [caterName, setCaterName] = useState(name);
  const [caterLocation, setCaterLocation] = useState(location);
  const [caterAbout, setCaterAbout] = useState(about);

  useEffect(() => {
    if (isOpen) {
      setCaterName(name);
      setCaterLocation(location);
      setCaterAbout(about);
    }
  }, [isOpen, name, location, about]);

  if (!isOpen) return null;

  const handleName = (e) => {
    if(e.target.value===""){
        return setCaterName(null);
    }
    // setCaterName(e.target.value);
      toast.dismiss();
      toast.error("Name can't be changed now");
  };

  const handleLocation = (e) => {
    if(e.target.value===""){
        return setCaterLocation(null);
    }
    setCaterLocation(e.target.value);
  };

  const handleAbout = (e) => {
    if(e.target.value===""){
        return setCaterAbout(null);
    }
    setCaterAbout(e.target.value);
  };

  const handleSubmit = ()=>{
    if(caterName === null || caterLocation === null || caterAbout === null){
      toast.error("Fill all details!");
      return;    
    }
    else{
      return onUpdate(caterName, caterAbout, caterLocation);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Edit cater details</h2>
          <div className="w-full flex flex-col gap-2 justify-center items-start mb-3">
            <div className="flex gap-3 items-center">
              <h1>Catering Name :</h1>
              <input
                type="text"
                placeholder="Enter your catering name"
                value={caterName}
                className="border-2 border-gray-300 rounded"
                onChange={handleName}
              />
            </div>
            <div className="flex gap-3 items-center">
              <h1>About :</h1>
              <input
                type="text"
                placeholder="Enter description"
                value={caterAbout}
                className="border-2 border-gray-300 rounded"
                onChange={handleAbout}
              />
            </div>
            <div className="flex gap-3 items-center">
              <h1>Location :</h1>
              <input
                type="text"
                placeholder="Enter your catering location"
                value={caterLocation}
                className="border-2 border-gray-300 rounded"
                onChange={handleLocation}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-red-800 text-white py-1 px-2 rounded"
            >
              Close without saving
            </button>
            <button
              className="bg-custom-blue-123 text-white py-1 px-2 rounded"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
