import React from "react";
import "./createnewcustomer.css";
import { FaUserPlus } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";
const CreateNewCustomer = () => {
  return (
    <div className="container_new_customer_add_modaweb">
      <span className="text_primary">Create New User</span>
      <div className="container_first_row_div_new_customer_add">
        <div className="input_field_new_customer_add">
          <label htmlFor="">UserName</label>
          <input placeholder="Enter Your Valid UserName" />
        </div>
        <div className="input_field_new_customer_add">
          <label htmlFor="">Password</label>
          <input placeholder="Enter Your Valid Password" />
        </div>
        <div className="input_field_new_customer_add">
          <label htmlFor="">Discount</label>
          <input placeholder="Enter Maximum Discount" />
        </div>
      </div>
      <div className="container_second_row_div_new_customer_add">
        <div className="conatainer_button_new_customer_add">
          <button>
            <FaUserPlus />
          </button>
          <span>Create User</span>
        </div>
        <div className="conatainer_button_new_customer_add">
          <button>
            <FaUserEdit className="user_icon" />
          </button>
          <span>Edit User</span>
        </div>
        <div className="conatainer_button_new_customer_add">
          <button>
            <FaUserMinus />
          </button>
          <span>Delete User</span>
        </div>
      </div>
      <div className="container_third_row_div_new_customer_add">
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
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateNewCustomer;
