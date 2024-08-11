/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Email.css";
const Email = () => {
  const [email, setEmail] = useState([]);
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
        setEmail(res_data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchEmailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container_div_email_data">
        <span className="mail-data">Mail Data</span>
      <div className="container_div_email">
        {email &&
          email.map((data, index) => (
            <tr key={index}>
              <td>{data.Email}</td>
            </tr>
          ))}
      </div>
    </div>
  );
};

export default Email;
