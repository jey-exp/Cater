const bcrypt = require("bcryptjs");
const {client}= require("../DB/connectDB.js");
const {v4}  = require("uuid");

const Catersignin= async(req,res)=>{
    console.log("Signing in Cater");
    const {name, gmail, pass} = req.body;   
    try {
        const emailAlreadyExists = await client.query("SELECT * FROM cater WHERE email=$1",[gmail]);
        if (emailAlreadyExists.rowCount!=0){
            return res.status(500).json({error:"User already exists!"});
        }
        const uuid_id = v4(gmail);
        const hashedPassword = await bcrypt.hash(pass,10);
        const result = await client.query("INSERT INTO cater(name,email,pass,uuid) VALUES($1,$2,$3,$4)",[name,gmail,hashedPassword,uuid_id]);
        return res.status(200).json({msg:"success"});
    } catch (error) {
        console.log("Error during cater sigin:", error);
        return res.status(400).json({error:"Something went wrong"});
    }
}

const CaterLogin = async(req,res)=>{
    console.log("Cater login");
    const {gmail, pass} = req.body;
    try {
        const result = await client.query("SELECT * FROM cater WHERE email=$1", [gmail]);
        if(result.rowCount===0){
            res.status(400).json({error:"User not found"});
        }
        else{
            const user = result.rows[0];
            const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
            if(isPasswordCorrect){
                console.log("Cater login successfull");
                res.status(200).json({msg:"success", userData:user});
            }
            else{
                console.log("Invalid credentials in cater login");
                return res.status(400).json({error:"Invalid credentials"});
            }
        }
    } catch (error) {
        console.log("Error during cater login",error);
        res.status(400).json({error:"Internal server error"});
    }
}


const getSpecificCater = async(req,res)=>{
    console.log("Get specific cater");
    const {uuid}= req.body;
    try {
        const response = await client.query("SELECT * FROM cater WHERE uuid=$1", [uuid]);        
        const caterDetails = response.rows[0];
        return res.status(200).json({msg:"success", caterDetails: caterDetails,});
    } catch (error) {
        console.log("Error in get specific cater : ", error);
        return res.status(400).json({error:"Something went wrong"});
    }
}

const updateCaterDetails = async (req,res)=>{
    console.log("Updating cater details");
    const {name, about, location, uuid} = req.body;
    try {
        const response = await client.query("update cater set name = $1 , location = $2, about = $3 where uuid=$4", [name, location, about, uuid]);
        const complete = await client.query(
            `UPDATE cater 
             SET complete = 'true' 
             WHERE uuid = $1 
               AND name IS NOT NULL AND name <> '' 
               AND location IS NOT NULL AND location <> '' 
               AND about IS NOT NULL AND about <> '' 
               AND price IS NOT NULL AND price > 0`, 
            [uuid]
          );
        return res.status(200).json({msg:"success"});
    } catch (error) {
        console.log("Error from update cater details : ", error);
        return res.status(400).json({error:"Something went wrong"});
    }
}


const addMenuRow = async (req,res)=>{
    console.log("Adding menu row");
    const data = req.body;
    if(!data) {
        return res.status(400).json({error:"Something went wrong"});
    }
    try {
        await client.query('INSERT INTO catermenu VALUES($1,$2,$3,$4,$5, $6, $7, $8)', [data[2], data[3], data[4], data[5], data[6], data[1], data[0], data[7]]);
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
        return res.status(200).json({msg:"success"});
    } catch (error) {
        console.log("Error in adding new row : ", error);
        return res.status(400).json({error:"Something went wrong "});
    }
}

const getCaterOrders = async(req,res)=>{
    console.log("Getting cater orders");
    const {uuid} = req.body;
    try {
        const response = await client.query("select * from orders where uuid = $1", [uuid])
        const responseRows = response.rows;
        responseRows.forEach((item)=>{
            if (item.orderdate instanceof Date) {
                item.orderdate = item.orderdate.toISOString().split("T")[0];
            }
        })
        return res.status(200).json({msg:"success", data:response.rows});
    } catch (error) {
        console.log("Error in getting cater orders", error);
        return res.status(400).json({error:"Something went wrong"});
    }
}

module.exports = {Catersignin,CaterLogin, getSpecificCater, updateCaterDetails, addMenuRow, getCaterOrders};