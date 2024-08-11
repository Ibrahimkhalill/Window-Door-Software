import React from "react";
import "./userlogin.css";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "./Auth";

const UserLogin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUsernamError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const { login } = useAuth();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // User Login Handeler
  // http://194.233.87.22:1001/api/userPassword/getUserPasswordByUsernameAndPassword?username=&password=
  const handleUserLogin = async (event) => {
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
        `/userPassword/getUserPasswordByUsernameAndPassword?username=${userName}&password=${password}`
      );

      if (response.data.length > 0) {
        console.log(response.data);
        login(
          response.data[0]?.username,
          "User",
          response.data[0]?.max_discount
        );
        setIsLoading(false);
        navigate("/user-dashboard");
      } else {
        console.log("eror");
        setError("Incorrect username or password");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const cancelError = () => {
    setError("");
  };
  return (
    <div className="container_login_user_modaweb">
      <div className="conatiner_div_login_user_modaweb">
        <span>User Login</span>
        <div className="container_user_form_modaweb">
          <form action="">
            <div className="input_field_user_form">
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
              <div className="error_messages">
                {userNameError ? userNameError : ""}
              </div>
            </div>
            <div className="input_field_user_form">
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
              <div className="error_messages">
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
            <div className="button_field_user_form">
              <button type="submit" onClick={handleUserLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
        {isLoading && (
          <div className="loader-container">
            <RotatingLines color="#333" height={50} width={50} />
          </div>
        )}
      </div>
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

export default UserLogin;
