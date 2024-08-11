/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./glassSetup.module.css";
import { SiAddthis } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Add from "../ProfilePage/plus.png";
import Edit from "../ProfilePage/edit.png";
import Delete from "../ProfilePage/trash.png";
import { glassColors, glassThickness } from "../../components/Data/Data";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const GlassSetup = () => {
  const [toastId, setToastId] = useState(null);
  const [allGlasses, setAllGlasess] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("");
  const [Glass, setGlass] = useState("");
  const [Colour, setColour] = useState("");
  const [Price, setPrice] = useState("");
  const encodedGlass = encodeURIComponent(Glass);

  //========= getAllGlassesData================
  const getAllGlassesData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/glass/getAll`
      );
      if (res.status === 200) {
        setAllGlasess(res.data);
      } else {
        console.log(`Error while getting all glass data`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllGlassesData();
  }, []);

  // ===================addGlasses================
  const addGlasses = async () => {
    try {
      if (!Glass || !Colour || !Price) {
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
          `${process.env.REACT_APP_BASE_URL}/glass/postGlass?Glass=${encodedGlass}&Colour=${Colour}&Price=${Price}`
        );
        if (res.status === 200) {
          getAllGlassesData();
          setSelectedTabId("");
          setGlass("");
          setColour("");
          setPrice("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(`Glass Added successfully`, {
            duration: 1000,
          });
          setToastId(newToastId);
        } else {
          console.log(`Error while adding glass`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReset = () => {
    setSelectedTabId("");
    setGlass("");
    setColour("");
    setPrice("");
  };

  // ===========handleClickTableDataShowInputField=================
  const handleClickTableDataShowInputField = (glass) => {
    if (selectedTabId === glass.id) {
      handleReset();
      return;
    }
    setSelectedTabId(glass.id);
    setGlass(glass.Glass);
    setColour(glass.Colour);
    setPrice(glass.Price);
  };
  //========= editGlasses================
  const editGlasses = async () => {
    try {
      if (!selectedTabId) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`Glass is not selected !`, {
          duration: 1000,
        });
        setToastId(newToastId);
        return;
      }
      if (!Glass || !Colour || !Price) {
        const newToastId = toast.error(`Some Feild Are Required !`, {
          duration: 1000,
        });
        setToastId(newToastId);
        return;
      } else {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/glass/updateGlassTableByID?id=${selectedTabId}&Glass=${encodedGlass}&Colour=${Colour}&Price=${Price}`
        );

        if (res.status === 200) {
          getAllGlassesData();
          setSelectedTabId("");
          setGlass("");
          setColour("");
          setPrice("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(`Glass updated successfully`, {
            duration: 1000,
          });
          setToastId(newToastId);
        } else {
          console.log(`Error while updating glass`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //========= deleteGlass================
  const deleteGlass = async () => {
    try {
      if (!selectedTabId) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`Glass is not selected !`, {
          duration: 1000,
        });
        setToastId(newToastId);
      } else {
        const res = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/glass/deleteUserPasswordByID?id=${selectedTabId}`
        );

        if (res.status === 200) {
          getAllGlassesData();
          setSelectedTabId("");
          setGlass("");
          setColour("");
          setPrice("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(`Glass deleted successfully`, {
            duration: 1000,
          });
          setToastId(newToastId);
        } else {
          console.log(`Error while deleting glass`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.glass_container_new_customer_add_modaweb_wrapper}>
      <div className={style.glass_container_new_customer_add_modaweb}>
        <span className={style.glass_text_primary}>Glass</span>
        <div className={style.glass_container_first_row_div_new_customer_add}>
          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Glass Thickness</label>
            <select
              name="thickness"
              id="thickness"
              placeholder="Select Glass Thickness"
              value={Glass}
              onChange={(e) => setGlass(e.target.value)}
            >
              <option value="" disabled selected>
                Select Glass Thickness
              </option>
              {glassThickness.map((thickness) => (
                <option key={thickness.thickness} value={thickness.thickness}>
                  {thickness.thickness}
                </option>
              ))}
            </select>
          </div>
          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Glass Color</label>

            <select
              name="glasscolors"
              id="glasscolors"
              placeholder="Select Glass Color"
              value={Colour}
              onChange={(e) => setColour(e.target.value)}
            >
              <option value="" disabled selected>
                Select Color
              </option>
              {glassColors.map((color) => (
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
        </div>
        <div className={style.glass_container_second_row_div_new_customer_add}>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.first_btn_create_user}`}
          >
            <button onClick={addGlasses}>
              {/* <SiAddthis /> */}
              <img src={Add} alt="" />
            </button>
            <span>Add</span>
          </div>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.second_btn_edit_user}`}
          >
            <button onClick={editGlasses}>
              {/* <FaEdit /> */}
              <img src={Edit} alt="" />
            </button>
            <span>Edit</span>
          </div>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.third_btn_delete_user}`}
          >
            <button onClick={deleteGlass}>
              {/* <RiDeleteBin4Fill /> */}
              <img src={Delete} alt="" />
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
                  <th>Glass</th>
                  <th>Color</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {allGlasses &&
                  allGlasses.length > 0 &&
                  allGlasses.map((glass) => {
                    return (
                      <tr
                        key={glass.id}
                        className={
                          selectedTabId == glass.id
                            ? `${style.glass_tr} ${style.glass_tr_active}`
                            : `${style.glass_tr}`
                        }
                        onClick={() =>
                          handleClickTableDataShowInputField(glass)
                        }
                      >
                        <td>{glass.id}</td>
                        <td>{glass.Glass}</td>
                        <td>{glass.Colour}</td>
                        <td>{glass.Price}</td>
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

export default GlassSetup;
