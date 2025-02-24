const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {client} = require("../DB/connectDB");
const { StatusCodes } = require("http-status-codes");
const { json } = require("express");


const Catersignin= async(req,res)=>{
    console.log("Signing in Cater");
    
    const {name, gmail, pass} = req.body;
    try {
        const emailAlreadyExists = await client.query("SELECT * FROM cater WHERE name=$1 OR email=$2",[name,gmail]);
        if (emailAlreadyExists.rowCount!=0){
            return res.json({msg:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(pass,10);
        const result = await client.query("INSERT INTO cater(name,email,pass) VALUES($1,$2,$3)",[name,gmail,hashedPassword]);

        return res.status(200).json({msg:"success"});
    } catch (error) {
        console.log("Error during cater sigin:", error);
        return res.json({msg:"Something went wrong"});
    }
}

const CaterLogin = async(req,res)=>{
    console.log("Cater login");
    const {gmail, pass} = req.body;
    try {
        const result = await client.query("SELECT * FROM cater WHERE email=$1", [gmail]);
        if(result.rowCount===0){
            res.json({msg:"User not found"});
        }
        else{
            const user = result.rows[0];
            const isPasswordCorrect = bcrypt.compare(pass, user.pass);
            if(isPasswordCorrect){
                res.status(200).json({msg:"success"});
            }
            else{
                res.json({msg:"Imvalid credentials"});
            }
        }
    } catch (error) {
        console.log("Error during cater login",error);
        res.json({msg:"Something went wrong"});
    }
}


const getSpecificCater = async(req,res)=>{
    console.log("Get specific cater");
    const {caterEmail}= req.body;
    console.log(caterEmail);
    if(!caterEmail){
        return res.json({msg:"No cater Email received!"})
    }
    try {
        const response = await client.query("SELECT * FROM cater WHERE email=$1", [caterEmail]);        
        const caterDetails = response.rows[0];
        return res.status(200).json({msg:"success", caterDetails: caterDetails,});
    } catch (error) {
        console.log("Error in get specific cater : ", error);
        return res.json({msg:"Something went wrong"});
    }
}

const updateCaterDetails = async (req,res)=>{
    console.log("Updating cater details");
    const {name, about, location, email} = req.body;
    try {
        const response = await client.query("update cater set name = $1 , location = $2, about = $3 where email=$4", [name, location, about, email]);
        const complete = await client.query(
            `UPDATE cater 
             SET complete = 'true' 
             WHERE email = $1 
               AND name IS NOT NULL AND name <> '' 
               AND location IS NOT NULL AND location <> '' 
               AND about IS NOT NULL AND about <> '' 
               AND price IS NOT NULL AND price > 0`, 
            [email]
          );
        return res.status(200).json({msg:"success"});
    } catch (error) {
        console.log("Error from update cater details : ", error);
        return res.status(200).json({msg:"Something went wrong"});
    }
}


const addMenuRow = async (req,res)=>{
    console.log("Adding menu row");
    const data = req.body;
    console.log(data);
    
    if(!data) {
        return res.json({msg:"No data is sent"});
    }
    try {
        const response = await client.query('SELECT name FROM cater where email=$1', [data[0]]);
        const caterName = response.rows[0].name;
        await client.query('INSERT INTO catermenu VALUES($1,$2,$3,$4,$5, $6, $7, $8)', [caterName, data[2], data[3], data[4], data[5], data[6], data[1], data[0]]);
        const avg = await client.query("SELECT AVG(price) FROM catermenu WHERE email = $1", [data[0]]);
        const updatePrice = await client.query("update cater set price = $1 where email = $2", [Math.round(avg.rows[0].avg) , data[0]]);
        const complete = await client.query(
            `UPDATE cater 
             SET complete = 'true' 
             WHERE email = $1 
               AND name IS NOT NULL AND name <> '' 
               AND location IS NOT NULL AND location <> '' 
               AND about IS NOT NULL AND about <> '' 
               AND price IS NOT NULL AND price > 0`, 
            [data[0]]
          );
          console.log("Added menu item");
        return res.json({msg:"success"});
    } catch (error) {
        console.log("Error in adding new row : ", error);
        return res.json({msg:"Something went wrong "});
    }
}

const getCaterOrders = async(req,res)=>{
    console.log("Getting cater orders");
    const {caterEmail} = req.body;
    try {
        const response = await client.query("select * from orders where cateremail = $1", [caterEmail])
        const responseRows = response.rows;
        responseRows.forEach((item)=>{
            if (item.orderdate instanceof Date) {
                item.orderdate = item.orderdate.toISOString().split("T")[0];
            }
        })
        return res.json({msg:"success", data:response.rows});
    } catch (error) {
        console.log("Error in getting cater orders", error);
        return res.json({msg:"Something went wrong"});
    }
}

module.exports = {Catersignin,CaterLogin, getSpecificCater, updateCaterDetails, addMenuRow, getCaterOrders};