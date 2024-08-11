/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Phone.css";
const Phone = () => {
  const [phone, setPhone] = useState([]);
  // http://194.233.87.22:1001/api/customer/getAll
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  useEffect(() => {
    const fatchEmailData = async () => {
      try {
        const response = await axiosInstance.get("/customer/getAll");
        const res_data = response.data;
        console.log(res_data);
        setPhone(res_data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchEmailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container_div_phone_data">
      <span className="phone-data">Phone Data</span>
      <div className="container_div_phone">
        {phone &&
          phone.map((data, index) => (
            <tr key={index}>
              <td>{data.Phone_no}</td>
            </tr>
          ))}
      </div>
    </div>
  );
};

export default Phone;
