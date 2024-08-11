/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./new_quotation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
const NewQuotation = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [color, setColor] = useState([]);
  const [Profilecolor, setPrfilecolor] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const user = localStorage.getItem("username");
  const discount = localStorage.getItem("discount");
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axiosInstance.get(
          `/customer/getAllByWhom?ByWhom=${user}`
        );
        console.log(response.data);
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get(
          `/material/getDistinctCategory`
        );
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCustomerData();
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const fetchProfileColorData = async () => {
      try {
        const response = await axiosInstance.get(
          `/material/getDistinctColourByCategory?Category=${category}`
        );

        setColor(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProfileColorData();
  }, [category]);

  const handleClikNext = () => {
    if (customerName === "" && category === "" && Profilecolor === "") {
      setError("Customer,Profile ,Profile Color field is empty");
      return;
    }
    if (category === "" && Profilecolor === "") {
      setError("Profile ,Profile Color field is empty");
      return;
    }
    if (customerName === "") {
      setError("Customer, field is empty");
      return;
    }
    if (category === "") {
      setError("Profile field is empty");
      return;
    }
    if (Profilecolor === "") {
      setError("Profile Color field is empty");
      return;
    }
    navigate("/quotation/window-door", {
      state: { customerName, category, Profilecolor, customerData },
    });
  };
  console.log(Profilecolor);
  const cancelError = () => {
    setError("");
  };
  return (
    <div>
      <div className="new_quotation_container">
        <div className="update_section_new_quotation">
          <div className="Header_new_quotation_setup"> New Quotation</div>

          <div className="new_quotation_setup_section">
            <select
              onChange={(e) => {
                setCustomerName(e.target.value);
                setError("");
              }}
            >
              <option value="">Select Customer</option>
              {customerData &&
                customerData.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.id}-{data.Name}
                  </option>
                ))}
            </select>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setError("");
              }}
            >
              <option value="">Select Profile</option>
              {profileData &&
                profileData.map((data, index) => (
                  <option key={index}>{data.Category}</option>
                ))}
            </select>
            <label htmlFor="" className="max_discount_quotation">
              Max Dixcount : {discount}
            </label>
            <select
              onChange={(e) => {
                setPrfilecolor(e.target.value);
                setError("");
              }}
              disabled={color.length > 0 ? false : true}
            >
              <option value="">Select Profile Color</option>
              {color &&
                color.map((color, index) => (
                  <option key={index}>{color.Colour}</option>
                ))}
            </select>
            <div className="new_quotation_setup_section_button">
              <button onClick={handleClikNext}>Next</button>
            </div>
          </div>
        </div>
        {error ? (
          <div className="error_quotation">
            {error}
            <IoMdClose
              onClick={cancelError}
              style={{ fontSize: "1.2vw", color: "red", cursor: "pointer" }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default NewQuotation;
