import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:2004/KrishiMandal";

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/LoginServlet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, useOtp: true }),
      });
      const text = await response.text();
      if (response.ok) {
        setUseOtp(true);
        alert(text || "OTP sent to your registered email.");
      } else {
        alert(text || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setResponseMessage("Error: Something went wrong while sending OTP.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (useOtp) {
      if (!otp) {
        alert("Please enter the OTP");
        return;
      }
      try {
        const response = await fetch(`${BACKEND_URL}/LoginServlet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, otp: Number(otp), useOtp: true }),
        });
        const text = await response.text();
        if (response.ok) {
          alert(text || "Login successful");
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("id", email);
          window.dispatchEvent(new Event("loginStateChanged"));
          navigate("/");
        } else {
          alert(text || "Invalid OTP or login failed.");
        }
      } catch (err) {
        console.error("OTP login error:", err);
        setResponseMessage("Error: Something went wrong during OTP login.");
      }
    } else {
      // password-based login
      try {
        const response = await fetch(`${BACKEND_URL}/LoginServlet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password, useOtp: false }),
        });
        const text = await response.text();
        if (response.ok) {
          alert(text || "Login successful");
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("id", email);
          window.dispatchEvent(new Event("loginStateChanged"));
          navigate("/");
        } else {
          alert(text || "Login failed. Check credentials.");
        }
      } catch (err) {
        console.error("Password login error:", err);
        setResponseMessage("Error: Something went wrong during login.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>

          {!useOtp ? (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
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
              <button type="button" onClick={handleSendOtp} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send OTP
              </button>
            </div>
          )}

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={useOtp} onChange={() => setUseOtp(!useOtp)} className="form-checkbox text-green-600" />
              <span className="ml-2 text-gray-700">Use OTP instead of Password</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
        {responseMessage && <p className="mt-4 text-sm text-red-600">{responseMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
