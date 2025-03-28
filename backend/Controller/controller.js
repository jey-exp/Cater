const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { client } = require("../DB/connectDB");
const stripe = require("stripe")("your_stripe_secret_key");

const register = async (req, res) => {
  const { name, email, phone, pass } = req.body;
  console.log("Signing up user ");

  try {
    const emailAlreadyExists = await client.query(
      "SELECT * FROM signin WHERE email=$1",
      [email]
    );
    if (emailAlreadyExists.rowCount != 0) {
      return res.json({ msg: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const role = "user";

    const result = await client.query(
      "INSERT INTO signin (name, email,phone, pass, role) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [name, email, phone, hashedPassword, role]
    );
    const user = result.rows[0];

    const tokenUser = { name: user.name, userId: user.email };
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    return res
      .status(200)
      .json({ user: tokenUser, token: token, msg: "success" });
  } catch (err) {
    console.error("Error during user registration:", err);
    return res
      .status(500)
      .json({ msg: "Something went wrong" });
  }
};

const login = async (req, res) => {
  console.log("Logging in");
  const { email, pass } = req.body;

  if (!email || !pass) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  try {
    const userResult = await client.query(
      "SELECT * FROM signin WHERE email=$1",
      [email]
    );

    if (userResult.rowCount === 0) {
      console.log("Invalid credentials");
      return res.status(500).json({ msg: "Invalid credentials" });
    }

    const user = userResult.rows[0];
    const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
    if (!isPasswordCorrect) {
      console.log("Invalid credentials");
      return res.status(500).json({ msg: "Invalid credentials" });
    }

    const tokenUser = { name: user.email, userId: user.pass };
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    return res
      .status(StatusCodes.OK)
      .json({ user: tokenUser, token: token, msg: "success" });
  } catch (err) {
    console.log("Error during login:", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};

const getCatermenu = async (req, res) => {
  console.log("Getting cater menu");
  let catername = "";
  try {
    catername = req.params.catername;
  } catch (err) {
    console.log("Error finding the cater name", err);
    return res.status(400).json({ msg: "Invalid catername parameter!" });
  }

  try {
    const result = await client.query(
      "SELECT * FROM catermenu WHERE catername=$1",
      [catername]
    );

    if (result.rowCount === 0) {
      return res.json({ msg: "No such catering exists!" });
    }

    res
      .status(200)
      .json({ msg: "success", data: result.rows });
  } catch (err) {
    console.error("Error querying the database", err);
    res
      .json({ msg: "Something went wrong" });
  }
};

const create_checkout_session = async (req, res) => {
  const { items } = req.body;
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.food,
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
};

const getallCater = async (req, res) => {
  console.log("getting all cater");
  
  try {
    const response = await client.query("select * from cater where complete = 'true'");
    if (response.rowCount === 0) {
      res.status(400).json({ msg: "No caters found!" });
      console.log("No caters found");
    }
    else{
      return res.status(200).json({msg:"success", data: response.rows });
    }
  } catch (error) {
    console.log("Error in getting cater details", error);
    return res.status(500).json({msg:"Something went wrong"})
  }
};

const addOrderToProfile = async (req, res) => {
  try {
    const { gmail, catername, totalAmount, caterEmail } = req.body;
    console.log("adding order to profile");
    await client.query("INSERT INTO orders(cateremail, customeremail, price, catername) values($1,$2,$3,$4)", [caterEmail, gmail, totalAmount, catername]);
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error("Error in adding order to profile:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong"});
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { gmail } = req.body;
    // let newGmail = gmail.split("@")[0];
    // newGmail += "user";
    // const tableName = `ordertable_${newGmail}`;
    const response = await client.query(`select * from orders where customeremail = $1`, [gmail]);
    res.status(200).json({msg: "sucess",data: response.rows });
  } catch (error) {
    res.status(500).json({msg:"Something went wrong"});
    console.log("Error in getting order details :", error);
  }
};

module.exports = {
  register,
  login,
  getCatermenu,
  create_checkout_session,
  getallCater,
  addOrderToProfile,
  getOrderDetails,
};
