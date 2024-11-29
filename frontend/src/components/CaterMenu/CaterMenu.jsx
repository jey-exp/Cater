import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


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

const CaterMenu = () => {
  return (
    <div className='flex flex-col gap-5 bg-white rounded-lg drop-shadow-lg custom-width  pt-5'>
        <div className='flex justify-center text-2xl font-bold text-custom-blue-123'>
            Menu
        </div>
        <div className="w-full h-full overflow-y-auto flex flex-col gap-5 mb-8 p-10">
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
                  {/* {breakfast.map((row) => (
                    <StyledTableRow key={row.food}>
                      <StyledTableCell component="th" scope="row">
                        {row.food}
                      </StyledTableCell>
                      <StyledTableCell>{row.proteins} grams</StyledTableCell>
                      <StyledTableCell>{row.fat} grams</StyledTableCell>
                      <StyledTableCell>{row.calorie}</StyledTableCell>
                      <StyledTableCell>₹{row.price}</StyledTableCell>
                    </StyledTableRow>
                  ))} */}
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
                  {/* {lunch.map((row) => (
                    <StyledTableRow key={row.food}>
                      <StyledTableCell component="th" scope="row">
                        {row.food}
                      </StyledTableCell>
                      <StyledTableCell>{row.proteins} grams</StyledTableCell>
                      <StyledTableCell>{row.fat} grams</StyledTableCell>
                      <StyledTableCell>{row.calorie}</StyledTableCell>
                      <StyledTableCell>₹{row.price}</StyledTableCell>
                    </StyledTableRow>
                  ))} */}
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
                  {/* {dinner.map((row) => (
                    <StyledTableRow key={row.food}>
                      <StyledTableCell component="th" scope="row">
                        {row.food}
                      </StyledTableCell>
                      <StyledTableCell>{row.proteins} grams</StyledTableCell>
                      <StyledTableCell>{row.fat} grams</StyledTableCell>
                      <StyledTableCell>{row.calorie}</StyledTableCell>
                      <StyledTableCell>₹{row.price}</StyledTableCell>
                    </StyledTableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
    </div>
  )
}

export default CaterMenu
