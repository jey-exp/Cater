const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCatermenu,
  create_checkout_session,
  getallCater,
  addOrderToProfile,
  getOrderDetails,
} = require("../Controller/controller");

const {Catersignin, CaterLogin, getSpecificCater, updateCaterDetails, addMenuRow, getCaterOrders} = require("../Controller/caterController");

router.route("/signin").post(register);
router.route("/login").post(login);
router.route("/catermenu/:catername").get(getCatermenu);
router.route("/create_checkout_session").post(create_checkout_session);
router.route("/getallcater").get(getallCater);
router.route("/addodertoprofile").post(addOrderToProfile);
router.route("/getorderdetails").post(getOrderDetails);
router.route("/caterapp/signin").post(Catersignin);
router.route("/caterapp/login").post(CaterLogin);
router.route("/getspecificcater").post(getSpecificCater);
router.route("/caterapp/updatecater").post(updateCaterDetails);
router.route("/caterapp/addmenurow").post(addMenuRow);
router.route("/caterapp/getcaterorders").post(getCaterOrders);

module.exports = router;
