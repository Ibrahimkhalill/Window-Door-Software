import React from "react";
import "./userdashboard.css";
import { Link } from "react-router-dom";
import Quotation from "./payment.png";
import NewUser from "../authentication/user.png";
import Customer from "../AdminDashboard/customer.png";
const UserDashBoard = () => {
  return (
    <div className="conatiner_user_dashboard_page">
      <span className="primary_font">User Dashboard </span>

      <div className="user_dashBoard">
        <Link to={"/my-customer"}>
          <div className="user_dashBoard_box effectleft">
            <img src={Customer} alt="" />
            <span>My Customers</span>
          </div>
        </Link>
        <Link to={"/quotation"}>
          <div className="user_dashBoard_box effecttop">
            <img src={Quotation} alt="" />
            <span>New Quotation</span>
          </div>
        </Link>
        <Link to={"/customer/add-customer"}>
          <div className="user_dashBoard_box effectright">
            <img src={NewUser} alt="" />
            <span>New Customer</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashBoard;
