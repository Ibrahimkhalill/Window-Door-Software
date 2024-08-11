/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./profilePage.module.css";
import { SiAddthis } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import Add from "./plus.png";
import Edit from "./edit.png";
import Delete from "./trash.png";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import {
  materials,
  categories,
  profileColour,
} from "../../components/Data/Data";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [toastId, setToastId] = useState(null);
  const [allProfileData, setAllProfileData] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("");
  const [Material, setMaterial] = useState("");
  const [Category, setCategory] = useState("");
  const [Colour, setColour] = useState("");
  const [Price, setPrice] = useState("");
  const [Discount, setDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //========= getAllGlassesData================
  const getAllProfileData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/material/getAll`
      );

      if (res.status === 200) {
        setAllProfileData(res.data);
      } else {
        console.log(`Error while getting all material/profile`);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getAllProfileData();
  }, []);

  // ===================addMosquito================
  const addProfile = async () => {
    try {
      if (!Material || !Category || !Colour || !Price || !Discount) {
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
          `${process.env.REACT_APP_BASE_URL}/material/postMaterial?Material=${Material}&Category=${Category}&Colour=${Colour}&Price=${Price}&MaxDiscount=${Discount}`
        );

        if (res.status === 200) {
          getAllProfileData();
          setMaterial("");
          setCategory("");
          setColour("");
          setPrice("");
          setDiscount("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(`Material Added successfully`, {
            duration: 1000,
          });
          setToastId(newToastId);
        } else {
          console.log(`Error while adding  material/profile`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReset = () => {
    setSelectedTabId("");
    setMaterial("");
    setCategory("");
    setColour("");
    setPrice("");
    setDiscount("");
  };

  // ===========handleClickTableDataShowInputField=================
  const handleClickTableDataShowInputField = (material) => {
    if (selectedTabId === material.id) {
      handleReset();
      return;
    }
    setSelectedTabId(material.id);
    setMaterial(material.Material);
    setCategory(material.Category);
    setColour(material.Colour);
    setPrice(material.Price);
    setDiscount(material.MaxDiscount);
  };
  //========= editMosquito================
  const editProfile = async () => {
    try {
      if (!selectedTabId) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`Profile is not selected !`, {
          duration: 1000,
        });
        setToastId(newToastId);
        return;
      }
      if (!Material || !Category || !Colour || !Price || !Discount) {
        const newToastId = toast.error(`Some Field Are Required !`, {
          duration: 1000,
        });
        setToastId(newToastId);
        return;
      } else {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/material/updateMaterialTableByID?Material=${Material}&Category=${Category}&Colour=${Colour}&Price=${Price}&MaxDiscount=${Discount}&id=${selectedTabId}`
        );

        if (res.status === 200) {
          getAllProfileData();
          setSelectedTabId("");
          setMaterial("");
          setCategory("");
          setColour("");
          setPrice("");
          setDiscount("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(`Profile updated successfully`, {
            duration: 1000,
          });
          setToastId(newToastId);
        } else {
          console.log(`Error while updating  material/profile`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //========= deleteMosquito================
  const deleteProfile = async () => {
    try {
      if (!selectedTabId) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`Profile is not selected !`, {
          duration: 1000,
        });
        setToastId(newToastId);
      } else {
        const res = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/material/deleteMaterialByID?id=${selectedTabId}`
        );

        if (res.status === 200) {
          getAllProfileData();
          setSelectedTabId("");
          setMaterial("");
          setCategory("");
          setPrice("");
          setDiscount("");
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(`Profile deleted successfully`, {
            duration: 1000,
          });
          setToastId(newToastId);
        } else {
          console.log(`Error while deleting  material/profile`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.glass_container_new_customer_add_modaweb_wrapper}>
      <div className={style.glass_container_new_customer_add_modaweb}>
        <span className={style.glass_text_primary}>Profile</span>
        <div className={style.glass_container_first_row_div_new_customer_add}>
          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Material</label>
            <select
              name="material"
              id="material"
              placeholder="Select material"
              value={Material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="" disabled selected>
                Select material
              </option>
              {materials.map((material) => (
                <option key={material.material} value={material.material}>
                  {material.material}
                </option>
              ))}
            </select>
          </div>
          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Category</label>

            <select
              name="category"
              id="category"
              placeholder="Select category"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled selected>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <div className={style.glass_input_field_new_customer_add}>
            <label htmlFor="">Colour</label>

            <select
              name="Colour"
              id="Colour"
              placeholder="Select Colour"
              value={Colour}
              onChange={(e) => setColour(e.target.value)}
            >
              <option value="" disabled selected>
                Select colour
              </option>
              {profileColour.map((color) => (
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
            <label htmlFor="">Max-Discount</label>
            <input
              type="number"
              placeholder="Enter Discount"
              value={Discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>
        <div className={style.glass_container_second_row_div_new_customer_add}>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.first_btn_create_user}`}
          >
            <button onClick={addProfile}>
              {/* <SiAddthis /> */}
              <img src={Add} alt="" className={style.button} />
            </button>
            <span>Add</span>
          </div>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.second_btn_edit_user}`}
          >
            <button onClick={editProfile}>
              {/* <FaEdit /> */}
              <img src={Edit} alt="" className={style.button} />
            </button>
            <span>Edit</span>
          </div>
          <div
            className={`${style.glass_conatainer_button_new_customer_add} ${style.third_btn_delete_user}`}
          >
            <button onClick={deleteProfile}>
              {/* <RiDeleteBin4Fill /> */}
              <img src={Delete} alt="" className={style.button} />
            </button>
            <span>Delete</span>
          </div>
        </div>
        <div className={style.glass_container_third_row_div_new_customer_add}>
          {isLoading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="64"
              visible={true}
            />
          ) : (
            <div className={style.glass_container_table_data_new_customer_add}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Material</th>
                    <th>Category</th>
                    <th>Colour</th>
                    <th>Price</th>
                    <th>Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {allProfileData &&
                    allProfileData.length > 0 &&
                    allProfileData.map((material) => {
                      return (
                        <tr
                          key={material.id}
                          className={
                            selectedTabId == material.id
                              ? `${style.glass_tr} ${style.glass_tr_active}`
                              : `${style.glass_tr}`
                          }
                          onClick={() =>
                            handleClickTableDataShowInputField(material)
                          }
                        >
                          <td>{material.id}</td>
                          <td>{material.Material}</td>
                          <td>{material.Category}</td>
                          <td>{material.Colour}</td>
                          <td>{material.Price}</td>
                          <td>{material.MaxDiscount}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
