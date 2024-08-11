import React from "react";
import "./useradmin.css";
import { Link } from "react-router-dom";
// import { MdSupervisedUserCircle } from "react-icons/md";
// import { MdAdminPanelSettings } from "react-icons/md";
import AdminPng from "./admin-panel.png";
import UserPorfile from "./user.png";
const UserAdmin = () => {
  return (
    <div className="container_user_admin_fontpage_modaweb">
      <div className="container_div_user_admin_fontpage_modaweb">
        <div className="container_button_user_admin_fontpage_modaweb user-icon effectleft">
          <Link to={"/user-login"}>
            <button>
              {/* <MdSupervisedUserCircle /> */}
              <img src={UserPorfile} alt="" />
            </button>
          </Link>
          <span>User</span>
        </div>
        <div className="container_button_user_admin_fontpage_modaweb effectright">
          <Link to={"/admin-login"}>
            <button>
              {/* <MdAdminPanelSettings /> */}
              <img src={AdminPng} alt="" />
            </button>
          </Link>
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
