import React, { useState } from "react";

const AddJobForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const user = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    try {
      const response = await fetch("http://localhost:2004/KrishiMandal/JobServlet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          employer,
          description,
          location,
          salary,
          user,
        }),
      });

      const data = await response.json();
      const message = data.message || "Unexpected response from server.";

      if (response.ok) {
        alert(message);
        setResponseMessage(message);
        onClose();
      } else {
        alert(message);
        setResponseMessage(message);
      }
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("Error: Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Posting..." : "Post Listing"}
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
        {responseMessage && <p className="mt-4 text-sm text-red-600">{responseMessage}</p>}
      </div>
    </div>
  );
};

export default AddJobForm;
