import React, { useEffect, useState } from "react";
import "./my_customer.css";
import axios from "axios";
const MyCustomer = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  const [customerData, setCustomerData] = useState([]);
  const user = localStorage.getItem("username");
  useEffect(() => {
    const fetchVatData = async () => {
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
    fetchVatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container_my_customer_modaweb">
      <span className="text_primary">My Customer </span>

      <div className="container_third_row_div_my_customer">
        <div className="container_table_data_my_customer">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customerData &&
                customerData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.Name}</td>
                    <td>{data.Phone_no}</td>
                    <td>{data.Email}</td>
                    <td>{data.Address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCustomer;
