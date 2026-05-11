import React, { useState } from "react";

const AddJobForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [showFrom, setShowForm] = useState(true);
  //   const [newJob, setNewJob] = useState({
  //     title: "",
  //     employer: "",
  //     location: "",
  //     salary: "",
  //     description: "",
  //   });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Truncate the description to 50 characters
    const updatedValue =
      name === "description" && value.length > 60 ? value.slice(0, 60) : value;
    setNewJob({ ...newJob, [name]: updatedValue });
  };
  const handleButtonClick = () => {
    setTimeout(() => {
      //setConfirmationMessage("");
      onClose();
    }, 1000);
  };
  const user = localStorage.getItem("id");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(description);
    //onAddJob(newJob);
    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/JobServlet",
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials like cookies if necessary
          body: JSON.stringify({
            title: title,
            employer: employer,
            description: description,
            location: location,
            salary: salary,
            user: user,
          }), // Include the request body
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message); // Display servlet response
      } else {
        setResponseMessage("Error: Unable to send data");
      }
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("Error: Something went wrong");
    }
    setNewJob({
      title: "",
      employer: "",
      location: "",
      salary: "",
      description: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Job Listing Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Employer Name</label>
            <input
              type="text"
              name="employer"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">
              Salary Range (optional)
            </label>
            <input
              type="text"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={handleButtonClick}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Post Listing
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;
