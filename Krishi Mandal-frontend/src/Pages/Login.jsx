import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const loginData = useOtp
      ? { mobileNumber, otp }
      : { mobileNumber, password };
    if (!useOtp) {
      try {
        setUseOtp(false);
        const response = await fetch(
          "http://localhost:2004/KrishiMandal/LoginServlet",
          {
            method: "POST", // Change to POST
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials like cookies if necessary
            body: JSON.stringify({
              mobileNumber: mobileNumber,
              password: password,
              useOtp: useOtp,
            }), // Include the request body
          }
        );
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Success:", data);
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });

        // if (response.ok) {
        //   const result = await response.json();
        //   setResponseMessage(result.message); // Display servlet response
        // } else {
        //   setResponseMessage("Error: Unable to send data");
        // }
        const message = await response.text();
        if (response.ok) {
          console.log(message);
          const mess = response.message;
          alert(message);
          const isLoggedIn = localStorage.getItem("loggedIn") === "true";
          // if (isLoggedIn) {
          //   navigate("/");
          // }
          // [navigate];
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("id", mobileNumber);
          // Dispatch custom event to update header
          window.dispatchEvent(new Event("loginStateChanged"));
          //alert("Login Successfully!");
          navigate("/");
        } else {
          alert(message);
        }
      } catch (error) {
        console.log("Error:", error);
        setResponseMessage("Error: Something went wrong");
      }
    } else {
      setUseOtp(false);
      console.log("otp");
      try {
        const response = await fetch(
          "http://localhost:2004/KrishiMandal/LoginServlet",
          {
            method: "POST", // Change to POST
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials like cookies if necessary
            body: JSON.stringify({
              mobileNumber: mobileNumber,
              otp: otp,
              useOtp: useOtp,
            }), // Include the request body
          }
        );
        const message = await response.text();
        if (response.ok) {
          console.log(message);
          const mess = response.message;
          alert(message);
          const isLoggedIn = localStorage.getItem("loggedIn") === "true";
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("id", mobileNumber);
          window.dispatchEvent(new Event("loginStateChanged"));
          //alert("Login Successfully!");
          navigate("/");
        } else {
          alert(message);
        }
      } catch (error) {
        console.log("Error:", error);
        setResponseMessage("Error: Something went wrong");
      }
    }
  };
  const handleSendOtp = async () => {
    if (mobileNumber) {
      console.log("Sending OTP to:", mobileNumber);
      setUseOtp(true);
      alert("OTP sent to your mobile number.");
      try {
        const response = await fetch(
          "http://localhost:2004/KrishiMandal/LoginServlet",
          {
            method: "POST", // Change to POST
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials like cookies if necessary
            body: JSON.stringify({
              mobileNumber: mobileNumber,
              useOtp: true,
            }), // Include the request body
          }
        );
      } catch (error) {
        console.log("Error:", error);
        setResponseMessage("Error: Something went wrong");
      }
    } else {
      alert("Please enter your mobile number.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <input
              type="number"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          {!useOtp ? (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the OTP"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send OTP
              </button>
            </div>
          )}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={useOtp}
                onChange={() => setUseOtp(!useOtp)}
                className="form-checkbox text-green-600"
              />
              <span className="ml-2 text-gray-700">
                Use OTP instead of Password
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
