/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./mosquitoNetting.module.css";
import { SiAddthis } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Add from "../ProfilePage/plus.png";
import Edit from "../ProfilePage/edit.png";
import Delete from "../ProfilePage/trash.png";
import {
  mosquitonettingcolour,
  mosquitonettingdesign,
} from "../../components/Data/Data";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MosquitoNetting = () => {
  const [toastId, setToastId] = useState(null);
  const [allMosquito, setallMosquito] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("");
  const [Design, setDesign] = useState("");
  const [Colour, setColour] = useState("");
  const [Price, setPrice] = useState("");
  const [Discount, setDiscount] = useState("");

  //========= getAllGlassesData================
  const getAlladdMosquitoData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/mosquitonetting/getAll`
      );
      if (res.status === 200) {
        setallMosquito(res.data);
      } else {
        console.log(`Error while getting all mosquitonetting`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAlladdMosquitoData();
  }, []);

  // ===================addMosquito================
  const addMosquito = async () => {
    try {
      if (!Design || !Colour || !Price || !Discount) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`One or Many field is empty !`, {
          duration: 1000,
        });
        setToastId(newToastId);
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/mosquitonetting/postMosquitoNetting?Design=${Design}&Colour=${Colour}&Price=${Price}&Discount=${Discount}`
        );
        if (res.status === 200) {
          getAlladdMosquitoData();
          setDesign("");
          setColour("");
          setPrice("");
          setDiscount("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(
            `MosquitoNetting Added successfully`,
            {
              duration: 1000,
            }
          );
          setToastId(newToastId);
        } else {
          console.log(`Error while adding MosquitoNetting`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReset = () => {
    setSelectedTabId("");
    setDesign("");
    setColour("");
    setPrice("");
    setDiscount("");
  };

  // ===========handleClickTableDataShowInputField=================
  const handleClickTableDataShowInputField = (mosquito) => {
    if (selectedTabId === mosquito.id) {
      handleReset();
      return;
    }
    setSelectedTabId(mosquito.id);
    setDesign(mosquito.Design);
    setColour(mosquito.Colour);
    setPrice(mosquito.Price);
    setDiscount(mosquito.Discount);
  };

  //========= editMosquito================
  const editMosquito = async () => {
    try {
      if (!selectedTabId) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`MosquitoNetting is not selected !`, {
          duration: 1000,
        });
        setToastId(newToastId);
        return;
      }
      if (!Design || !Colour || !Price || !Discount) {
        const newToastId = toast.error(`Some Field Is Required !`, {
          duration: 1000,
        });
        setToastId(newToastId);
        return;
      } else {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/mosquitonetting/updateMosquitoNettingTableByID?Design=${Design}&Colour=${Colour}&Price=${Price}&Discount=${Discount}&id=${selectedTabId}`
        );

        if (res.status === 200) {
          getAlladdMosquitoData();
          setSelectedTabId("");
          setDesign("");
          setColour("");
          setPrice("");
          setDiscount("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(
            `MosquitoNetting updated successfully`,
            {
              duration: 1000,
            }
          );
          setToastId(newToastId);
        } else {
          console.log(`Error while updating MosquitoNetting`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //========= deleteMosquito================
  const deleteMosquito = async () => {
    try {
      if (!selectedTabId) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`MosquitoNetting is not selected !`, {
          duration: 1000,
        });
        setToastId(newToastId);
      } else {
        const res = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/mosquitonetting/deleteUserPasswordByID?id=${selectedTabId}`
        );

        if (res.status === 200) {
          getAlladdMosquitoData();
          setSelectedTabId("");
          setDesign("");
          setColour("");
          setPrice("");
          setDiscount("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(
            `MosquitoNetting deleted successfully`,
            {
              duration: 1000,
            }
          );
          setToastId(newToastId);
        } else {
          console.log(`Error while deleted MosquitoNetting`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.glass_container_new_customer_add_modaweb_wrapper}>
      <div className={style.glass_container_new_customer_add_modaweb}>
        <span className={style.glass_text_primary}>Mosquito Netting</span>
        <div className={style.glass_container_first_row_div_new_customer_add}>
          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Select Design</label>
            <select
              name="Design"
              id="Design"
              placeholder="Select MosquitoNetting Design"
              value={Design}
              onChange={(e) => setDesign(e.target.value)}
            >
              <option value="" disabled selected>
                Select Design
              </option>
              {mosquitonettingdesign.map((design) => (
                <option key={design.design} value={design.design}>
                  {design.design}
                </option>
              ))}
            </select>
          </div>
          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Select Color</label>

            <select
              name="MosquitoNettingcolors"
              id="MosquitoNettingcolors"
              placeholder="Select MosquitoNetting Color"
              value={Colour}
              onChange={(e) => setColour(e.target.value)}
            >
              <option value="" disabled selected>
                Select Color
              </option>
              {mosquitonettingcolour.map((color) => (
                <option key={color.color} value={color.color}>
                  {color.color}
                </option>
              ))}
            </select>
          </div>
          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Price</label>
            <input
              placeholder="Enter Price"
              type="number"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Discount</label>
            <input
              placeholder="Enter Discount"
              type="number"
              value={Discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>
        <div className={style.glass_container_second_row_div_new_customer_add}>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.first_btn_create_user}`}
          >
            <button onClick={addMosquito}>
              {/* <SiAddthis /> */}
              <img src={Add} alt="" className={style.button} />
            </button>
            <span>Add</span>
          </div>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.second_btn_edit_user}`}
          >
            <button onClick={editMosquito}>
              {/* <FaEdit /> */}
              <img src={Edit} alt="" className={style.button} />
            </button>
            <span>Edit</span>
          </div>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.third_btn_delete_user}`}
          >
            <button onClick={deleteMosquito}>
              {/* <RiDeleteBin4Fill /> */}
              <img src={Delete} alt="" className={style.button} />
            </button>
            <span>Delete</span>
          </div>
        </div>
        <div className={style.glass_container_third_row_div_new_customer_add}>
          <div className={style.glass_container_table_data_new_customer_add}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Design</th>
                  <th>Colour</th>
                  <th>Price</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {allMosquito &&
                  allMosquito.length > 0 &&
                  allMosquito.map((mosquito) => {
                    return (
                      <tr
                        key={mosquito.id}
                        className={
                          selectedTabId == mosquito.id
                            ? `${style.glass_tr} ${style.glass_tr_active}`
                            : `${style.glass_tr}`
                        }
                        onClick={() =>
                          handleClickTableDataShowInputField(mosquito)
                        }
                      >
                        <td>{mosquito.id}</td>
                        <td>{mosquito.Design}</td>
                        <td>{mosquito.Colour}</td>
                        <td>{mosquito.Price}</td>
                        <td>{mosquito.Discount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default MosquitoNetting;
