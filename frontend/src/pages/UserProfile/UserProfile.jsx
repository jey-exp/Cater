import { Navbar } from "../../components";
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
import { useState, useEffect } from "react";
import axios from "axios";
import { decode } from "../../utilities/helper";
import { IoChevronBackOutline } from "react-icons/io5";

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

const UserProfile = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const user = localStorage.getItem("user");
          const logged_user = await decode(user);
          const response = await axios.post(
            `${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/getorderdetails`,
            { email: logged_user }
          );
          const data = response.data;
          setOrderDetails(data.data);
      } catch (error) {
        console.error("Error fetching the order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-full bg-blue-50">
      <Navbar />
      <div className="flex flex-col h-screen  items-center mx-5 max-w-screen gap-5">
        <div className="flex justify-between items-center w-full mt-4">
          <button
            className="flex items-center gap-2 bg-custom-blue-123 text-white p-1 pl-2 pr-4 rounded drop-shadow-lg"
            onClick={handleBack}
          >
            <IoChevronBackOutline />
            Back
          </button>
          <h3 className="text-3xl font-medium">Your Profile</h3>
          <div></div>
        </div>
        <div className="w-11/12 max-h-3/6 overflow-y-auto flex flex-col gap-5 mb-8 bg-white p-10 rounded-lg drop-shadow-lg">
          {orderDetails.length===0 ? (
            <div className="text-center text-red-600 font-semibold italic text-xl opacity-65">No order history!</div>
          ) : (
            <div className="w-full">
            <h3 className="font-semibold">Order Details:</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Order Number</StyledTableCell>
                    <StyledTableCell>Cater Name</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>{row.catername}</StyledTableCell>
                      <StyledTableCell>₹{row.price}</StyledTableCell>
                      <StyledTableCell>
                        {row.orderdate.split("T")[0]}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
