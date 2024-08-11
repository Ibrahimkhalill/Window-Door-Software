/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./vatandinstalation.css";
import Add from "../ProfilePage/plus.png";
import Edit from "../ProfilePage/edit.png";
import Delete from "../ProfilePage/trash.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const VatAndInstallation = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  const [vatInstallationData, setVatInstallationData] = useState([]);
  const [vatData, setVatData] = useState([]);
  const [vat, setVat] = useState("");
  const [type, setTYpe] = useState("");
  const [installation, setInstallation] = useState("");
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/installation/getAll");
      setVatInstallationData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchVatData = async () => {
    try {
      const response = await axiosInstance.get("/vat/getAll");
      setVatData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchVatData();
  }, []);

  const handleAdd = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (type === "" && installation === "") {
      toast.warning("Please filup Type and Installation");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/installation/postInstallation?Type=${type}&Installation=${installation}`
      );
      if (response.status === 200) {
        fetchData();
        handleReset();
        toast.success("Installation Add successfully!");
      } else {
        toast.error("Failed to Add Installation ");
      }
    } catch (error) {
      console.error("Error Adding Installation :", error);
    }
  };

  const handleReset = () => {
    setActiveRowIndex(null);
    setTYpe("");
    setInstallation("");
    setId(null);
  };

  const handleRowClick = (row, index) => {
    if (activeRowIndex === index) {
      handleReset();
      return;
    }
    setActiveRowIndex(index);
    setTYpe(row.Type);
    setInstallation(row.Installation);
    setId(row.id);
  };

  const handleUpdateVat = async (event) => {
    if (vat === "") {
      alert("Please select Vat");
      return;
    }
    if (event.detail > 1) {
      return;
    }
    const rate = "7%";
    try {
      const response = await axiosInstance.put(
        `/vat/updateVatTableByID?id=${1}&Vat=${rate}`
      );
      if (response.status === 200) {
        fetchVatData();
        setVat("");
        alert("Vat successfully Updated!");
      } else {
        alert("Failed to Updated Vat");
      }
    } catch (error) {
      console.error("Error Updated vat:", error);
    }
  };

  const handleEdit = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (type === "" && installation === "") {
      alert("Please select a row");
      return;
    }

    if (!type || !installation) {
      alert("Some Field is Required!");
      return;
    }
    try {
      const response = await axiosInstance.put(
        `/installation/updateTypeInstallationByID?Type=${type}&Installation=${installation}&id=${id}`
      );
      if (response.status === 200) {
        fetchData();
        handleReset();
        alert("Data Edit Successfuly!");
      } else {
        alert("Failed to Edit Data");
      }
    } catch (error) {
      console.error("Error Edit data:", error);
    }
  };

  const handleDelete = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (id === null) {
      alert("Please select a row");

      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/installation/deleteInstallationByID?id=${id}`
      );
      if (response.status === 200) {
        fetchData();
        handleReset();
        toast("Data Deleted Successfuly!");
      } else {
        alert("Failed to Delete Data");
      }
    } catch (error) {
      console.error("Error deleted data:", error);
    }
  };
  return (
    <div className="container_vat_and_installation_modaweb">
      <ToastContainer autoClose={1000} />
      <span className="text_primary">
        Currently VAT rate is {vatData[0]?.Vat}{" "}
      </span>
      <div className="container_first_row_div_vat_and_installation">
        <div className="input_field_vat_and_installation effecttop">
          <select
            name=""
            id=""
            value={vat}
            onChange={(e) => setVat(e.target.value)}
          >
            <option value="">Update vat</option>
            <option>5%</option>
            <option>7%</option>
            <option>7.5%</option>
            <option>10%</option>
            <option>15%</option>
            <option>20%</option>
            <option>25%</option>
          </select>
        </div>
        <div className="input_field_vat_and_installation effecttop">
          <button onClick={handleUpdateVat}>Update VAT</button>
        </div>
        <div className="saparator-vat">
          <div className="input_field_vat_and_installation effectleft">
            <select
              name=""
              id=""
              value={type}
              onChange={(e) => setTYpe(e.target.value)}
            >
              <option value="">Select Type</option>
              <option>profile</option>
              <option>glass</option>
              <option>mosquitoNet</option>
            </select>
          </div>
          <div className="input_field_vat_and_installation effectright">
            <input
              type="number"
              value={installation}
              onChange={(e) => setInstallation(e.target.value)}
              placeholder="Installation"
            />
          </div>
        </div>
      </div>
      <div className="container_second_row_div_vat_and_installation">
        <div className="conatainer_button_vat_and_installation effectleft">
          <button onClick={handleAdd}>
            {/* <FaUserPlus /> */}
            <img src={Add} alt="" />
          </button>
          <span>Add</span>
        </div>
        <div className="conatainer_button_vat_and_installation effecttop">
          <button onClick={handleEdit}>
            {/* <FaUserEdit /> */}
            <img src={Edit} alt="" />
          </button>
          <span>Edit </span>
        </div>
        <div className="conatainer_button_vat_and_installation effectright">
          <button onClick={handleDelete}>
            {/* <FaUserMinus /> */}
            <img src={Delete} alt="" />
          </button>
          <span>Delete </span>
        </div>
      </div>
      <div className="container_third_row_div_vat_and_installation">
        <div className="container_table_data_vat_and_installation">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Installtion</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>
              {vatInstallationData &&
                vatInstallationData.map((vat, index) => (
                  <tr
                    key={index}
                    className={activeRowIndex === index ? "active-row" : ""}
                    onClick={() => handleRowClick(vat, index)}
                  >
                    <td>{vat.id}</td>
                    <td>{vat.Installation}</td>
                    <td>{vat.Type}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VatAndInstallation;
