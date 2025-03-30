import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import * as XLSX from "xlsx";
import secret_key from "../.config";
import { useAuth } from "../../authContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1D3557",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "14px",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#CED4DA",
  "&:nth-of-type(even)": {
    backgroundColor: "#e5e7eb",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DietPlan = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [paymentsuccess, setpaymentsuccess] = useState(false);
  const navigate = useNavigate();
  const { catername } = useParams();
  const { isAuthenticated, gmail } = useAuth();
  const [caterEmail, setCaterEmail] = useState();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/notauthenticated");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/catermenu/${catername}`
        );
        const data = response.data;
        setBreakfast(data.data.filter((item) => item.time === "Breakfast"));
        setLunch(data.data.filter((item) => item.time === "Lunch"));
        setDinner(data.data.filter((item) => item.time === "Dinner"));
        setCaterEmail(response.data.data[0].email);
      } catch (err) {
        console.log("Error in fetching data in diet plan", err);
      }
    };
    fetchData();
  }, [catername]);

  const handleAddFood = (food) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  const handleRemoveFood = (index) => {
    const newSelectedFoods = [...selectedFoods];
    newSelectedFoods.splice(index, 1);
    setSelectedFoods(newSelectedFoods);
  };

  const totalAmount = selectedFoods.reduce(
    (total, item) => total + item.price,
    0
  );

  const addtouserProfile = async () => {
    try {
      const data = { gmail, catername, totalAmount, caterEmail };
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/addodertoprofile`,
        data
      );
    } catch (error) {
      console.log("Error in addtoUserProfile", error);
    }
  };

  const handleCheckout = (e) => {
    console.log("testing 1");
    e.preventDefault();
    try {
      if (totalAmount === 0) {
        alert("Please select something");
      } else {
        var options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          key_secret: secret_key,
          amount: totalAmount * 100,
          currency: "INR",
          name: process.env.REACT_APP_BUSINESS_NAME,
          description: "Test mode",
          handler: function (response) {
            alert(response.razorpay_payment_id);
            addtouserProfile();
            setpaymentsuccess(true);
            console.log("Payment success");
          },
          prefill: {
            name: process.env.REACT_APP_YOUR_NAME,
            email: process.env.REACT_APP_EMAIL,
            contact: process.env.REACT_APP_CONTACT,
          },
          notes: {
            address: "Razorpay Corporate office",
          },
          theme: {
            color: "#4567h3",
          },
          modal: {
            ondismiss: function () {
              console.log("Payment failure");
            },
          },
        };
        var pay = new window.Razorpay(options);
        pay.open();
      }
    } catch (err) {
      console.log("Error from razor pay checkout:", err);
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(selectedFoods);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Diet Plan");
    XLSX.writeFile(wb, "diet_plan.xlsx");
  };

  return (
    <div className="h-full bg-blue-50">
      <div className="flex flex-col h-full justify-center items-center mx-5 w-screen gap-5">
        <div className="flex justify-between items-center w-screen mt-4">
          <button
            className="flex items-center gap-2 bg-custom-blue-123 text-white p-1 pl-2 pr-4 rounded drop-shadow-lg"
            onClick={() => navigate(`/cater/${catername}`)}
          >
            Back
          </button>
          <h3 className="text-3xl font-medium">Set My Diet Plan</h3>
          <div className="mr-11">
            <button
              className="flex items-center gap-2 bg-custom-blue-123 text-white p-1 pl-2 pr-4 rounded drop-shadow-lg"
              onClick={() => navigate(`/home`)}
            >
              Home
            </button>
          </div>
        </div>
        <div className="w-11/12 h-3/6 overflow-y-auto flex flex-col gap-5 mb-8 bg-white p-10 rounded-lg drop-shadow-lg">
          <h3 className="font-semibold">Breakfast :</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Food</StyledTableCell>
                  <StyledTableCell>Proteins</StyledTableCell>
                  <StyledTableCell>Fat</StyledTableCell>
                  <StyledTableCell>Calories</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {breakfast.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.food}
                    </StyledTableCell>
                    <StyledTableCell>{row.proteins} grams</StyledTableCell>
                    <StyledTableCell>{row.fat} grams</StyledTableCell>
                    <StyledTableCell>{row.calorie}</StyledTableCell>
                    <StyledTableCell>₹{row.price}</StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="bg-custom-blue-123 text-white p-1 rounded pl-4 pr-4 hover:bg-violet-950"
                        onClick={() => handleAddFood(row)}
                      >
                        Add
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h3 className="text-xl font-bold">Lunch :</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Food</StyledTableCell>
                  <StyledTableCell>Proteins</StyledTableCell>
                  <StyledTableCell>Fat</StyledTableCell>
                  <StyledTableCell>Calories</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lunch.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.food}
                    </StyledTableCell>
                    <StyledTableCell>{row.proteins} grams</StyledTableCell>
                    <StyledTableCell>{row.fat} grams</StyledTableCell>
                    <StyledTableCell>{row.calorie}</StyledTableCell>
                    <StyledTableCell>₹{row.price}</StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="bg-custom-blue-123 text-white p-1 rounded pl-4 pr-4 hover:bg-violet-950"
                        onClick={() => handleAddFood(row)}
                      >
                        Add
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h3 className="text-xl font-bold">Dinner :</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Food</StyledTableCell>
                  <StyledTableCell>Proteins</StyledTableCell>
                  <StyledTableCell>Fat</StyledTableCell>
                  <StyledTableCell>Calories</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dinner.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.food}
                    </StyledTableCell>
                    <StyledTableCell>{row.proteins} grams</StyledTableCell>
                    <StyledTableCell>{row.fat} grams</StyledTableCell>
                    <StyledTableCell>{row.calorie}</StyledTableCell>
                    <StyledTableCell>₹{row.price}</StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="bg-custom-blue-123 text-white p-1 rounded pl-4 pr-4 hover:bg-violet-950"
                        onClick={() => handleAddFood(row)}
                      >
                        Add
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h3 className=" text-3xl font-semibold">Your diet:</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Food</StyledTableCell>
                  <StyledTableCell>Proteins</StyledTableCell>
                  <StyledTableCell>Fat</StyledTableCell>
                  <StyledTableCell>Calories</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedFoods.map((food, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {food.food}
                    </StyledTableCell>
                    <StyledTableCell>{food.proteins} grams</StyledTableCell>
                    <StyledTableCell>{food.fat} grams</StyledTableCell>
                    <StyledTableCell>{food.calorie}</StyledTableCell>
                    <StyledTableCell>₹{food.price}</StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="bg-custom-blue-123 text-white p-1 rounded pl-4 pr-4 hover:bg-violet-950"
                        onClick={() => handleRemoveFood(index)}
                      >
                        Remove
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex justify-between items-center w-full mt-4">
            <h3 className="text-xl font-medium">
              Total Amount: ₹{totalAmount}
            </h3>
            <button
              className="bg-custom-blue-123 text-white p-2 rounded pl-4 pr-4 hover:bg-violet-950"
              onClick={() => setOpenConfirm(true)}
            >
              Confirm Diet
            </button>
            {paymentsuccess && (
              <button
                className="bg-custom-blue-123 text-white p-2 rounded pl-4 pr-4 hover:bg-violet-950"
                onClick={handleDownloadExcel}
              >
                Download as Excel
              </button>
            )}
          </div>
        </div>
      </div>
      {openConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="text-2xl font-medium mb-4">
              Confirm Your Diet Plan
            </h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Food</StyledTableCell>
                    <StyledTableCell>Proteins</StyledTableCell>
                    <StyledTableCell>Fat</StyledTableCell>
                    <StyledTableCell>Calories</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedFoods.map((food, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {food.food}
                      </StyledTableCell>
                      <StyledTableCell>{food.proteins} grams</StyledTableCell>
                      <StyledTableCell>{food.fat} grams</StyledTableCell>
                      <StyledTableCell>{food.calorie}</StyledTableCell>
                      <StyledTableCell>₹{food.price}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <h3 className="text-xl font-medium mt-4">
              Total Amount: ₹{totalAmount}
            </h3>
            <div className="flex justify-end items-center mt-4">
              <button
                className="bg-gray-500 text-white p-2 rounded pl-4 pr-4 mr-4 hover:bg-gray-700"
                onClick={() => setOpenConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded pl-4 pr-4 hover:bg-blue-700"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlan;
