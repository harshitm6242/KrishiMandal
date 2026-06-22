import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [otp, setOtp] = useState(""); // Added otp state
  const [useOtp, setUseOtp] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:2004/KrishiMandal";


  const handlesignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    try {
      const response = await fetch(`${BACKEND_URL}/SignUpServlet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          mobileNumber: mobileNumber,
          password: password,
          email: email,
          name: name,
          otp: otp,
          useOtp: useOtp,
          gender: gender,
          state: selectedState,
        }),
      });
      const message = await response.text();
        if (response.ok) {
          console.log(message);
          alert(message);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("id", email);
          window.dispatchEvent(new Event("loginStateChanged"));
          navigate("/");
        } else {
          alert(message);
        }
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("Error: Something went wrong");
    }
  };

  const handleSendOtp = () => {
    if (!email) {
      alert("Please enter your email to send OTP.");
      return;
    }
    (async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/SignUpServlet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, useOtp: true }),
        });
        const text = await response.text();
        if (response.ok) {
          setUseOtp(true);
          alert(text || "OTP sent to your email.");
        } else {
          alert(text || "Failed to send OTP.");
        }
      } catch (err) {
        console.error("Send signup OTP error:", err);
        setResponseMessage("Error sending OTP");
      }
    })();
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Sign Up
        </h2>
        <form onSubmit={handlesignup}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="usermobile"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="usermobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
              <button type="button" onClick={handleSendOtp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
                Send OTP
              </button>
            </div>
            {useOtp && (
              <div className="mt-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupOtp">OTP</label>
                <input
                  type="text"
                  id="signupOtp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter OTP received on email"
                />
              </div>
            )}
          </div>

          {/*Gender*/}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-lg font-semibold">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)} // Corrected
              className="w-full p-2 mt-2 border rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* State */}
          {/* <div className="mb-4">
            <label htmlFor="state" className="block text-lg font-semibold">
              State
            </label>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              className="w-full p-2 mt-2 border rounded-md"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div> */}

          {/* District */}
          {/* <div className="mb-4">
            <label htmlFor="districts" className="block text-lg font-semibold">
              District
            </label>
            <select
              id="districts"
              name="districts"
              className="w-full p-2 mt-2 border rounded-md"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
