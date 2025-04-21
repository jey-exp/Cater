const {client} = require("../DB/connectDB.js")


const getCatermenu = async (req, res) => {
  console.log("Getting cater menu");
  const uuid = req.params.uuid;

  try {
    const result = await client.query(
      "SELECT * FROM catermenu WHERE uuid=$1",
      [uuid]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    res
      .status(200)
      .json({ msg: "success", data: result.rows });
  } catch (err) {
    console.error("Error in getting cater menu", err);
    res
      .status(400).json({ error: "Something went wrong" });
  }
};

const getallCater = async (req, res) => {
  console.log("getting all cater");
  try {
    const response = await client.query("select * from cater where complete = 'true'");
    if (response.rowCount === 0) {
      res.status(400).json({ error:"No caters found!" });
      console.log("No caters found");
    }
    else{
      return res.status(200).json({msg:"success", data: response.rows });
    }
  } catch (error) {
    console.log("Error in getting cater details", error);
    return res.status(500).json({error:"Something went wrong"})
  }
};

const addOrderToProfile = async (req, res) => {
  try {
    console.log("adding order to profile");
    const { gmail, uuid, totalAmount, caterEmail } = req.body;
    const response = await client.query("select * from cater where uuid = $1", [uuid]);
    const caterName = response.rows[0].name;
    await client.query("INSERT INTO orders(cateremail, customeremail, price, uuid, catername) VALUES($1,$2,$3,$4, $5)", [caterEmail, gmail, totalAmount, uuid, caterName]);
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error("Error in adding order to profile:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong"});
  }
};

const getOrderDetails = async (req, res) => {
  try {
    console.log("Getting order details");
    const { email } = req.body;
    const response = await client.query(`select * from orders where customeremail = $1`, [email]);
    return res.status(200).json({msg: "sucess",data: response.rows });
  } catch (error) {
    console.log("Error in getting order details :", error);
    return res.status(500).json({error:"Something went wrong"});
  }
};


module.exports = {getCatermenu, getallCater, addOrderToProfile, getOrderDetails}