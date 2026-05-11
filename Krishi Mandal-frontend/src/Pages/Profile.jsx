import React from "react";
import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  // const [name, setName] = useState("");
  // const [name, setName] = useState("");
  const user = localStorage.getItem("id");
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/ProfileServlet",
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials like cookies if necessary
          body: JSON.stringify({
            user: user,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products"); // Handle HTTP errors
      }

      const data = await response.json();
      if (data.message) console.log(data.message);
      setName(data.Name);
      setEmail(data.Email);
      setMobile(data.Number);
      console.log(email);
      console.log("hello");
    } catch (err) {
      // setError(err.message || "An error occurred while fetching products");
      // Clear products state on error
    }
  };

  //   if (!profile) {
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         Loading...
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Profile
          </div>
          <h1 className="block mt-1 text-2xl leading-tight font-bold text-black">
            {name}
          </h1>
          <div className="mt-4">
            <div className="flex items-center mt-2">
              <i className="fas fa-envelope text-indigo-500 mr-2"></i>
              <p className="text-gray-700">{email}</p>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-phone text-indigo-500 mr-2"></i>
              <p className="text-gray-700">{mobile}</p>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-birthday-cake text-indigo-500 mr-2"></i>
              <p className="text-gray-700">{"25"} years old</p>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-map-marker-alt text-indigo-500 mr-2"></i>
              <p className="text-gray-700">{"Bhopal,Madhya Pradesh"}</p>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-venus-mars text-indigo-500 mr-2"></i>
              <p className="text-gray-700">{"Male"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
