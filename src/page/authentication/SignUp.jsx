import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
const SignUp = () => {
  const [passShow, setPassShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [selectedRoles, setSelectedRoles] = useState("user");
  const [isDisabledOTPButton, setIsDisabledOTPButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const toastId = React.useRef(null);

  const handleOptionChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  // Handle Click From Submition
  const handleFromSubmit = async (event) => {
    event.preventDefault();

    // Input Validtion

    const newErrors = {};

    if (!userName) {
      newErrors.userName = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!OTP) {
      newErrors.OTP = "OTP is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (selectedRoles.length === 0) {
      newErrors.selectedRoles = "Select at least one role";
    }

    // If there are validation errors, display toast messages
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((error) => {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(error, {
            position: "bottom-center",
          });
        }
      });
      return;
    }
    // Input Validation End
    setIsLoading(true);
    setIsDisabledOTPButton(false);

    try {
      await fetch(
        "http://194.233.87.22:" +
          process.env.REACT_APP_BACKEND_PORT +
          "/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            OTPemail: "merinasoft.official@gmail.com",
            USERemail: email,
            OTP: OTP,
            password: password,
            roles: [selectedRoles],
          }),
        }
      ).then(async function (response) {
        const text = await response.text();
        sleep(1000).then(() => {
          setIsLoading(false);
        });
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast(text);
        }

        // toast(text);
        console.log(text); //here you can access it
      });

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Hand Click Send OTP
  const handleOtp = async (event) => {
    event.preventDefault();

    // Input validation
    if (!email) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Email is required", {
          position: "bottom-center",
        });
      }

      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Invalid email format", {
          position: "bottom-center",
        });
      }

      return;
    }
    // input validation end
    setIsLoading(true);
    setIsDisabledOTPButton(true);

    try {
      await fetch(
        "http://194.233.87.22:" +
          process.env.REACT_APP_BACKEND_PORT +
          "/api/auth/otp",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      ).then(async function (response) {
        const text = await response.text();
        sleep(1000).then(() => {
          setIsLoading(false);
        });
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast(text);
        }
        // toast(text);
        console.log(text); //here you can access it
      });

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  console.log(OTP);

  return (
    <div className="container_signup_modaweb">
      <div className="conatiner_div_signup_modaweb">
        <span>Sign-Up</span>
        <div className="rules_signup">
          <div className="input_field_roles">
            <input
              type="radio"
              id="admin"
              name="userType"
              value="admin"
              checked={selectedRoles === "admin"}
              onChange={handleOptionChange}
            />
            <label htmlFor="admin">Admin</label>
          </div>
          <div className="input_field_roles">
            <input
              type="radio"
              id="user"
              name="userType"
              value="user"
              checked={selectedRoles === "user"}
              onChange={handleOptionChange}
            />
            <label htmlFor="user">User</label>
          </div>
        </div>
        <div className="container_signup_form_modaweb">
          <form action="">
            <div className="input_field_signup_form">
              <label htmlFor="">User Name</label>
              <input
                placeholder="Enter Valid Admin Name"
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="input_field_signup_form">
              <label htmlFor="">Email</label>
              <input
                placeholder="Enter Valid Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="input_field_signup_form">
              <label htmlFor="">Password</label>
              <input
                placeholder="Enter Valid Admin Password"
                type={!passShow ? "password" : "text"}
                onChange={(event) => setPassword(event.target.value)}
              />
              {passShow ? (
                <FaEye
                  className="icon-signup"
                  onClick={() => setPassShow(!passShow)}
                />
              ) : (
                <FaEyeSlash
                  className="icon-signup"
                  onClick={() => setPassShow(!passShow)}
                />
              )}
            </div>
            <div className="input_field_signup_form">
              <label htmlFor="">OTP</label>
              <div className="container_div_separator">
                <input
                  placeholder="Enter Valid OTP"
                  style={{ width: "11vw" }}
                  onChange={(event) => setOTP(event.target.value)}
                />
                <button
                  className="sm-class"
                  disabled={isDisabledOTPButton}
                  onClick={handleOtp}
                >
                  Send
                </button>
              </div>
            </div>
            <div className="button_field_signup_form">
              <button type="submit" onClick={handleFromSubmit}>
                Sign-Up
              </button>
            </div>
          </form>
          {isLoading && (
            <div className="loader-container">
              <RotatingLines color="#333" height={50} width={50} />
            </div>
          )}
        </div>
      </div>
      <ToastContainer stacked autoClose={1000} position="bottom-center" />
    </div>
  );
};

export default SignUp;
