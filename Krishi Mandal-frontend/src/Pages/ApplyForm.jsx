import React, { useState } from "react";

const ApplyForm = ({ job, onClose }) => {
  //   const [application, setApplication] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     gender: "",
  //     address: "",
  //     occupation: "",
  //     message: "",
  //   });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setaddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [message, setMessage] = useState("");
  console.log(job.jobid);

  //   const handleApplicationChange = (e) => {
  //     const { name, value } = e.target;
  //     setApplication({ ...application, [name]: value });
  //   };
  const user = localStorage.getItem("id");
  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    jobsApplication();
  };
  const jobsApplication = async () => {
    // e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/JobApplicationServlet",
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials like cookies if necessary
          body: JSON.stringify({
            name: name,
            address: address,
            email: email,
            phone: phone,
            gender: gender,
            occupation: occupation,
            message: message,
            user: user,
            jobid: job.jobid,
          }), // Include the request body
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setConfirmationMessage(data.message);
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //   if (response.ok) {
      //     const result = await response.json();
      //     setResponseMessage(result.message); // Display servlet response
      //   } else {
      //     setResponseMessage("Error: Unable to send data");
      //   }
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("Error: Something went wrong");
    }
    setTimeout(() => {
      setConfirmationMessage("");
      onClose();
    }, 8000);
    //console.log(formData);
  };

  return (
    <div className="inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-2xl w-full max-w-md max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>
        {confirmationMessage && (
          <p className="mt-4 text-green-600">{confirmationMessage}</p>
        )}
        <form onSubmit={handleApplicationSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Previous Occupation</label>
            <input
              type="text"
              name="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Message to Employer</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Application
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
        {/* {confirmationMessage && (
          <p className="mt-4 text-green-600">{confirmationMessage}</p>
        )} */}
      </div>
    </div>
  );
};

export default ApplyForm;
