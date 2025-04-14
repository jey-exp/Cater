import { Navbar } from "../../components";
import { IoChevronBackOutline } from "react-icons/io5";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

const Cater = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [caterName, setCaterName] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Cater uuid : ", uuid);
        
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/catermenu/${uuid}`
        );
        const data = response.data;
        console.log(data);
        setBreakfast(data.data.filter((item) => item.time === "Breakfast"));
        setLunch(data.data.filter((item) => item.time === "Lunch"));
        setDinner(data.data.filter((item) => item.time === "Dinner"));
      } catch (error) {
        toast.error(error.response.data.msg);
        console.error("Error fetching the catering menu data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const handleSetDietPlan = () => {
    navigate(`/dietplan/${uuid}`);
  };

  return (
    <div className="h-full bg-blue-50">
      <Navbar />
      <div className="flex flex-col h-full justify-center items-center mx-5 w-screen gap-5">
        <div className="flex justify-between items-center w-full mt-4">
          <button
            className="flex items-center gap-2 bg-custom-blue-123 text-white p-1 pl-2 pr-4 rounded drop-shadow-lg"
            onClick={handleBack}
          >
            <IoChevronBackOutline />
            Back
          </button>
          <h3 className="text-3xl font-medium">Catername</h3>
          <div></div>
        </div>
        <div className="flex justify-between w-screen items-center">
          <h5 className="text-3xl">Available Menu:</h5>
          <button
            className="flex items-center gap-2 bg-custom-blue-123 text-white p-1 pl-2 pr-4 mr-10 rounded drop-shadow-lg"
            onClick={handleSetDietPlan}
          >
            Set My Diet Plan
          </button>
        </div>
        <div className="w-11/12 h-3/6 overflow-y-auto flex flex-col gap-5 mb-8 bg-white p-10 rounded-lg drop-shadow-lg">
          <h3 className="font-semibold">Breakfast :</h3>
          <div className="w-full">
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
                  {breakfast.map((row) => (
                    <StyledTableRow key={row.food}>
                      <StyledTableCell component="th" scope="row">
                        {row.food}
                      </StyledTableCell>
                      <StyledTableCell>{row.proteins} grams</StyledTableCell>
                      <StyledTableCell>{row.fat} grams</StyledTableCell>
                      <StyledTableCell>{row.calorie}</StyledTableCell>
                      <StyledTableCell>₹{row.price}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <h3 className="font-semibold">Lunch :</h3>
          <div className="w-full">
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
                  {lunch.map((row) => (
                    <StyledTableRow key={row.food}>
                      <StyledTableCell component="th" scope="row">
                        {row.food}
                      </StyledTableCell>
                      <StyledTableCell>{row.proteins} grams</StyledTableCell>
                      <StyledTableCell>{row.fat} grams</StyledTableCell>
                      <StyledTableCell>{row.calorie}</StyledTableCell>
                      <StyledTableCell>₹{row.price}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <h3 className="font-semibold">Dinner :</h3>
          <div className="w-full">
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
                  {dinner.map((row) => (
                    <StyledTableRow key={row.food}>
                      <StyledTableCell component="th" scope="row">
                        {row.food}
                      </StyledTableCell>
                      <StyledTableCell>{row.proteins} grams</StyledTableCell>
                      <StyledTableCell>{row.fat} grams</StyledTableCell>
                      <StyledTableCell>{row.calorie}</StyledTableCell>
                      <StyledTableCell>₹{row.price}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cater;
