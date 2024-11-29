const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {client} = require("../DB/connectDB");
const { StatusCodes } = require("http-status-codes");


const Catersignin= async(req,res)=>{
    console.log("Signing in Cater");
    
    const {name, gmail, pass} = req.body;
    console.log("Log from cater signin :", name+"-"+gmail+"-"+pass);
    try {
        const emailAlreadyExists = await client.query("SELECT * FROM cater WHERE name=$1 OR email=$2",[name,gmail]);
        if (emailAlreadyExists.rowCount!=0){
            return res.json({msg:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(pass,10);
        const result = await client.query("INSERT INTO cater(name,email,pass) VALUES($1,$2,$3)",[name,gmail,hashedPassword]);

        return res.status(200).json({msg:"Success"});
    } catch (error) {
        console.log("Error during cater sigin:", error);
        return res.json({msg:"Internal server error"});
    }
}

const CaterLogin = async(req,res)=>{
    console.log("Cater login");
    
    const {gmail, pass} = req.body;
    console.log("req : ", gmail, "-", pass);
    
    try {
        // const hashedPassword= bcrypt.compare
        const result = await client.query("SELECT * FROM cater WHERE email=$1", [gmail]);
        if(result.rowCount===0){
            res.json({msg:"User not found"});
        }
        else{
            const user = result.rows[0];
            const isPasswordCorrect = bcrypt.compare(pass, user.pass);
            if(isPasswordCorrect){
                res.status(200).json({msg:"Success"});
            }
            else{
                res.json({msg:"Check credentials"});
            }
        }
    } catch (error) {
        console.log(error);
        res.json({msg:"Internal server error"});
    }
}


const getSpecificCater = async(req,res)=>{
    console.log("Get specific cater");
    const {caterEmail}= req.body;
    console.log("Cater Email : ", caterEmail);
    if(!caterEmail){
        return res.json({msg:"No cater name received!"})
    }
    try {
        const response = await client.query("SELECT * FROM cater WHERE email=$1", [caterEmail]);        
        const caterDetails = response.rows[0];
        console.log(caterDetails);
        return res.status(200).json({msg:"Success", caterDetails: caterDetails,});
    } catch (error) {
        console.log("Error in get specific cater : ", error);
        return res.json({msg:"Couldn't retrieve data"});
    }
}

module.exports = {Catersignin,CaterLogin, getSpecificCater};