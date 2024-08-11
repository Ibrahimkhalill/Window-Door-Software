import React, { useState, useEffect } from "react";
import "./createNewUser.css";
// import { FaUserPlus } from "react-icons/fa";
// import { FaUserEdit } from "react-icons/fa";
// import { FaUserMinus } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Add from "./add.png";
import Delete from "./delete.png";
import Edit from "./edit.png";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewUser = () => {
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [maxDis, setMaxDis] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedID, setSelectedID] = useState(false);
  const [passShow, setPassShow] = useState(false);
  // const [buttonIsDisable, setButtonIsDisable] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // Show All User Account
  // http://194.233.87.22:1001/api/userpassword/getAll
  const fatchUserData = async () => {
    try {
      const response = await axiosInstance.get("/userpassword/getAll");
      console.log(response);
      const res_Data = response.data;
      setData(res_Data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fatchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create new Customer
  // http://194.233.87.22:1001/api/userPassword/postUserPasswordAndMaxDiscount?username=&password=&max_discount=
  const handleCreateCustomer = async (event) => {
    if (event.detail > 1) {
      return;
    }

    if (!userName && !password && !maxDis) {
      toast.warn("Can't leave empty field");
      return;
    }
    if (!userName) {
      toast.warn("Can't leave empty field");
      return;
    }
    if (!password) {
      toast.warn("Can't leave empty field");
      return;
    }
    if (!maxDis) {
      toast.warn("Can't leave empty field");
      return;
    }
    if (Data.some((item) => item.username === userName)) {
      toast.warn("Username already exists");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/userPassword/postUserPasswordAndMaxDiscount?username=${userName}&password=${password}&max_discount=${maxDis}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully User Created");
        fatchUserData();
        setUserName("");
        setPassword("");
        setMaxDis("");
        setId("");
        setSelectedID(false);
      } else {
        toast.error("Sorry We Can't Crated New Customer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Customer
  // http://194.233.87.22:1001/api/userpassword/deleteUserPasswordByID?id=

  const handleDeleteCustomer = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!id) {
      toast.warning("Please Selected A Row Data");
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/userpassword/deleteUserPasswordByID?id=${id}`
      );
      if (response.status === 200) {
        toast.success("Customer Delete SuccessFully");
        fatchUserData();
        setUserName("");
        setPassword("");
        setMaxDis("");
        setId("");
        setSelectedID(false);
      } else {
        toast.error("Sorry Customer Can't Delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Customer
  // http://194.233.87.22:1001/api/userpassword/updateUserPasswordTableByID?username=&password=&max_discount=&id=
  const handleEditCustomer = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!id) {
      toast.warning("Please Selected A Row Data");
      return;
    }
    if (!userName && !password && !maxDis) {
      toast.warn("Can't leave empty field");
      return;
    }
    if (!userName) {
      toast.warn("User name required");
      return;
    }
    if (!password) {
      toast.warn("password required");
      return;
    }
    if (!maxDis) {
      toast.warn("Max discount required");
      return;
    }
    try {
      const response = await axiosInstance.put(
        `/userpassword/updateUserPasswordTableByID?username=${userName}&password=${password}&max_discount=${maxDis}&id=${id}`
      );
      if (response.status === 200) {
        toast.success("Customer Updateded");
        fatchUserData();
        setUserName("");
        setPassword("");
        setMaxDis("");
        setId("");
        setSelectedID(false);
      } else {
        toast.error("Sorry Customer Can't Edited");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setUserName("");
    setPassword("");
    setMaxDis("");
    setId("");
    setSelectedID(false);
  };

  const handleDataInputField = (item) => {
    if (selectedID === item.id) {
      handleReset();
      return;
    }
    setSelectedID(item.id);
    setId(item.id);
    setUserName(item.username);
    setPassword(item.password);
    setMaxDis(item.max_discount);
  };

  return (
    <div className="container_new_customer_add_modaweb">
      <span className="text_primary">Create New User</span>
      <div className="container_first_row_div_new_customer_add">
        <div className="input_field_new_customer_add">
          <label htmlFor="">UserName</label>
          <input
            placeholder="Enter Your UserName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="input_field_new_customer_add">
          <label htmlFor="">Password</label>
          <input
            type={!passShow ? "password" : "text"}
            value={password}
            placeholder="Enter Your Password"
            onChange={(event) => setPassword(event.target.value)}
          />
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
        <div className="input_field_new_customer_add">
          <label htmlFor="">Discount</label>
          <input
            type="number"
            placeholder="Enter Maximum Discount"
            value={maxDis}
            onChange={(event) => setMaxDis(event.target.value)}
          />
        </div>
      </div>
      <div className="container_second_row_div_new_customer_add">
        <div className="conatainer_button_new_customer_add effect_left">
          <button onClick={handleCreateCustomer}>
            {/* <FaUserPlus /> */}
            <img src={Add} alt="" />
          </button>
          <span>Create User</span>
        </div>
        <div className="conatainer_button_new_customer_add effect_top">
          <button onClick={handleEditCustomer}>
            {/* <FaUserEdit /> */}
            <img src={Edit} alt="" />
          </button>
          <span>Edit User</span>
        </div>
        <div className="conatainer_button_new_customer_add effect_right">
          <button onClick={handleDeleteCustomer}>
            {/* <FaUserMinus /> */}
            <img src={Delete} alt="" />
          </button>
          <span>Delete User</span>
        </div>
      </div>
      <div className="container_third_row_div_new_customer_add">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        ) : (
          <div className="container_table_data_new_customer_add">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>Password</th>
                  <th>Max Discount</th>
                </tr>
              </thead>
              <tbody>
                {Data.length > 0 &&
                  Data.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleDataInputField(item)}
                      className={
                        selectedID === item.id ? "data selectedData" : "data"
                      }
                      tabindex="0"
                    >
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.password}</td>

                      <td>{item.max_discount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer stacked autoClose={1000} />
    </div>
  );
};

export default CreateNewUser;
