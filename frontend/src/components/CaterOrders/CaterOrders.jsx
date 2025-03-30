import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '../../authContext';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { PropagateLoader } from 'react-spinners';

const CaterOrders = () => {
  const {caterEmail} = useAuth();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const gettingCaterOrders = async ()=>{
     try {
        const response = await axios.post(`${process.env.REACT_APP_HOST_ENDPOINT}/api/v1/caterapp/getcaterorders`, {caterEmail : caterEmail});
        setOrders(response.data.data);
        setLoading(false);
     } catch (error) {
      console.log(error.response.data.msg, error);
      setLoading(false);
     }
    }
    gettingCaterOrders();
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


const columns = [
  { id: 'customeremail', label: 'Customer Email', minWidth: 170, align:'center' },
  { id: 'orderdate', label: 'Date', minWidth: 170, align:'center'},
  {id :'price', label:'Amount', minWidth:170, align:'center'}
];
  return (
    <div className='custom-width rounded-lg drop-shadow-lg bg-white p-5 min-h-10 flex flex-col justify-center gap-5 text-custom-blue-123 font-bold text-2xl'>
      <div className='flex justify-center w-full'>Orders</div>
      {loading && (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 w-full">
        <div className="relative w-full h-full flex justify-center items-center"></div>
          <div className='w-full jsutify-center'>
            <PropagateLoader color={"#1D3557"}/>
          </div>
      </div>
      )}
      {orders.length===0 ? (
          <div className='flex justify-center'>
            <div className='font-light text-lg text-slate-400'>No orders 😿</div>
          </div>
      ) : (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor : '#1D3557', color:'white'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      )}
    </div>
  )
}

export default CaterOrders
