import React from "react";
import "./adminlogin.css";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuth } from "./Auth";
import { IoMdClose } from "react-icons/io";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const { login } = useAuth();
  const [userNameError, setUsernamError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const [error, setError] = useState("");
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // Admin Login Handeler
  // http://194.233.87.22:1001/api/adminpassword/getAdminPasswordByUsernameAndPassword?username=&password=
  const handleAdminLogin = async (event) => {
    event.preventDefault();
    if (userName === "" && password === "") {
      setUsernamError("Can't leave empty field");
      setPassWordError("Can't leave empty field");
      return;
    }
    if (userName === "") {
      setUsernamError("Can't leave empty field");
      return;
    }
    if (password === "") {
      setPassWordError("Can't leave empty field");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/adminpassword/getAdminPasswordByUsernameAndPassword?username=${userName}&password=${password}`
      );

      console.log(response);

      if (response.data.length > 0) {
        console.log(response.data);

        login(response.data[0]?.username, "admin");
        setIsLoading(false);
        navigate("/admin-dashbord");
      } else {
        console.log("eror");
        setError("Incorrect username or password");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("User Not Found Please Used Currect UserName And Password");
      console.log(error);
      setIsLoading(false);
    }
  };
  const cancelError = () => {
    setError("");
  };
  return (
    <div className="container_login_admin_modaweb">
      <div className="conatiner_div_login_admin_modaweb">
        <span>Admin Login</span>
        <div className="container_admin_form_modaweb">
          <form action="">
            <div className="input_field_admin_form">
              <label htmlFor="">User Name</label>
              <input
                onChange={(event) => {
                  setUserName(event.target.value);
                  setUsernamError("");
                  setError("");
                }}
                required
                style={{
                  borderColor: userNameError && userName === "" ? "red" : "",
                }}
              />
              <div className="error_messages_admin">
                {userNameError ? userNameError : ""}
              </div>
            </div>
            <div className="input_field_admin_form">
              <label htmlFor="">Password</label>
              <input
                type={!passShow ? "password" : "text"}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPassWordError("");
                  setError("");
                }}
                required
                style={{
                  borderColor: passwordError && password === "" ? "red" : "",
                }}
              />
              <div className="error_messages_admin">
                {passwordError ? passwordError : ""}
              </div>
              {passShow ? (
                <FaEye
                  className="icon-login"
                  onClick={() => setPassShow(!passShow)}
                />
              ) : (
                <FaEyeSlash
                  className="icon-login"
                  onClick={() => setPassShow(!passShow)}
                />
              )}
            </div>
            <div className="button_field_admin_form">
              <button onClick={handleAdminLogin}>Login</button>
            </div>
          </form>
        </div>
        {isLoading && (
          <div className="loader-container">
            <RotatingLines color="#333" height={50} width={50} />
          </div>
        )}
      </div>
      <ToastContainer stacked autoClose={1000} position="bottom-center" />
      {error ? (
        <div className="error">
          {error}
          <IoMdClose onClick={cancelError} className="cancel_icon" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminLogin;
