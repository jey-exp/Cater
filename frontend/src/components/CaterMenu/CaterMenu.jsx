import React, { useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import { useAuth } from '../../authContext';
import { PropagateLoader } from 'react-spinners';
import MenuModal from '../MenuModal/MenuModal';
import toast from 'react-hot-toast';


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
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const {caterEmail} = useAuth();
  const [menuModalOpen, setMenuModal] = useState(false);
  const [modalTime, setModalTime] = useState("Breakfast");
  const [isLoading, setLoading] = useState(true);
  const [refreshMenu, setRefreshMenu] = useState(false);

  useEffect(()=>{
    try {
      const gettingMenu = async ()=>{
        const data ={
          caterEmail : caterEmail
        }
          const caterDetails = await axios.post("http://localhost:3000/api/v1/getspecificcater", data)
          if(caterDetails.data.msg==="Success"){
            const caterName = caterDetails.data.caterDetails.name;
            console.log("Cater Name :", caterName);
            const res = await axios.get(`http://localhost:3000/api/v1/catermenu/${caterName}`)
            console.log(res.data);
            if(res.data.msg==="Success in getting catering menu"){
              setBreakfast(res.data.data.filter((item)=> item.time==="Breakfast"));
              setLunch(res.data.data.filter((item)=> item.time==="Lunch"));
              setDinner(res.data.data.filter((item)=> item.time==="Dinner"));
            }
          }
          setLoading(false);
      }
      gettingMenu();
    } catch (error) {
      console.log("Error when fetching cater menu", error);
      toast.error("Error getting your menu");
      setLoading(false);
    }
},[refreshMenu])

  const handleMenuModalSubmit = async (data)=>{
    const toastId = toast.loading("Adding new menu item...");
    try {
      const response = await axios.post("http://localhost:3000/api/v1/caterapp/addmenurow",data);
      if(response.data.msg==="Success"){
        toast.success(`Added new row in ${data[1]}`, {id:toastId});
      }
      if(response.data.msg==="No data is sent"){
        toast.error("Error while adding new menu item", {id:toastId});
        console.log("[Adding new menu row] Data is not sent to backend properly");
      }
      setMenuModal(false);
      setRefreshMenu(!refreshMenu);
    } catch (error) {
      console.log("Error in adding new row : ", error);
      toast.error("Error adding new row", {id:toastId});
      setMenuModal(false);
      setRefreshMenu(!refreshMenu);
    }
  }

  const handleOpenMenuModal = (time)=>{
    setModalTime(time);
    setMenuModal(true);
  }


  return (
    <div className='flex flex-col gap-5 bg-white rounded-lg drop-shadow-lg custom-width  pt-5'>
        <div className='flex justify-center text-2xl font-bold text-custom-blue-123'>
            Menu
        </div>
        {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 w-full">
          <div className="relative w-full h-full flex justify-center items-center"></div>
            <div className='w-full jsutify-center'>
              <PropagateLoader color={"#1D3557"}/>
            </div>
          </div>
      )}
      {menuModalOpen && (
        <MenuModal onClose={()=>{setMenuModal(false)}} time={modalTime} onSubmit={handleMenuModalSubmit}/>
      )}
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
          <div className='flex justify-between'>
            <div></div>
            <button className='bg-custom-blue-123 rounded text-white px-4 py-1 shadow-lg' onClick={()=>{handleOpenMenuModal("Breakfast")}}>Add new Row</button>
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
          <div className='flex justify-between'>
            <div></div>
            <button className='bg-custom-blue-123 rounded text-white px-4 py-1 shadow-lg' onClick={()=>{handleOpenMenuModal("Lunch")}}>Add new Row</button>
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
          <div className='flex justify-between'>
            <div></div>
            <button className='bg-custom-blue-123 rounded text-white px-4 py-1 shadow-lg' onClick={()=>{handleOpenMenuModal("Dinner")}}>Add new Row</button>
          </div>
        </div>
    </div>
  )
}

export default CaterMenu
