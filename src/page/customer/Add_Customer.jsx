/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./add_customer.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AddCustomer = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  const [customerData, setCustomerData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const user = localStorage.getItem("username");
  useEffect(() => {
    const fetchVatData = async () => {
      try {
        const response = await axiosInstance.get("/customer/getAll");
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchVatData();
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\+?\d+$/;
    return regex.test(phone);
  };

  const handleAdd = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (name === "" && phone === "" && address === "" && email === "") {
      toast.warning("Please Fillup All Field");
      return;
    }
    if (name === "") {
      toast.warning("Please Fillup Customer Name");
      return;
    }
    if (phone === "") {
      toast.warning("Please Fillup Customer Phone Number");
      return;
    }
    if (address === "") {
      toast.warning("Please Fillup Customer Address");
      return;
    }
    if (email === "") {
      toast.warning("Please Fillup Customer Email Address");
      return;
    }

    if (!validateEmail(email)) {
      toast.dismiss();
      toast.warning("Please enter a valid email address");
      return;
    }

    if (!validatePhone(phone)) {
      toast.dismiss();
      toast.warning("Please enter a valid phone number");
      return;
    }

    const result = customerData.find(
      (data) => data.Phone_no === phone && data.ByWhom === user
    );
    if (result) {
      toast.warning("Customer is Already added");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/customer/postCustomer?Name=${name}&Phone_no=${phone}&Email=${email}&Address=${address}&ByWhom=${user}`
      );
      if (response.status === 200) {
        setName("");
        setPhone("");
        setAddress("");
        setEmail("");
        toast.success("Customer Added successfully!");
      } else {
        toast.error("Failed to Add Customer ");
      }
    } catch (error) {
      console.error("Error Adding Customer :", error);
    }
  };

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <div className="add_customer_container">
        <div className="update_section_add_customer">
          <div className="Header_add_customer_setup"> Customer</div>

          <div className="add_customer_setup_section">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Customer Phone Number"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Customer Email Address"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <div className="add_customer_setup_section_button">
              <button onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCustomer;
