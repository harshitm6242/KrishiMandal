import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddJobForm from "./AddJobForm";
import ApplyForm from "./ApplyForm.jsx";

const Jobs = () => {
  //   const [jobs, setJobs] = useState([
  //     {
  //       title: "Farm Manager",
  //       employer: "Green Harvest Co.",
  //       location: "Bhopal, MP",
  //       salary: "₹10,000 - ₹15,000/month",
  //       description: "Manage daily farm operations and ensure productivity.",
  //     },
  //     {
  //       title: "Agricultural Engineer",
  //       employer: "AgroTech Solutions",
  //       location: "Indore, MP",
  //       salary: "₹20,000 - ₹25,000/month",
  //       description: "Design and develop agricultural machinery and equipment.",
  //     },
  //     {
  //       title: "Field Officer",
  //       employer: "Farm Fresh",
  //       location: "Nagpur, MH",
  //       salary: "₹12,000 - ₹18,000/month",
  //       description: "Oversee field activities and ensure crop quality.",
  //     },
  //   ]);
  const navigate = useNavigate();
  const [Title, setTitle] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const user = localStorage.getItem("id");
  useEffect(() => {
    fetchProducts();
  }, []);
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const userid = localStorage.getItem("id");
  const fetchProducts = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/JobListServlet",
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
      console.log(data.jobs);
      setJobs(data.jobs); // Update products state
    } catch (err) {
      //setError(err.message || "An error occurred while fetching products");
      setJobs([]); // Clear products state on error
    }
  };
  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
    setShowForm(false);
  };
  const handleHireClick = () => {
    if (isLoggedIn) {
      setShowForm(true);
    } else {
      alert("You must be logged in to Hire.");
      navigate("/login");
    }
  };

  const handleApplyClick = (job) => {
    if (isLoggedIn && job.user != userid) {
      setSelectedJob(job);
      setShowApplicationForm(true);
    } else if (job.user == userid) {
      alert(
        "You cannot Apply this job Listing because it was posted by your own account!"
      );
    } else {
      alert("You must be logged in to Apply for a job.");
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleHireClick}
        >
          Hire
        </button>
      </div>

      {showForm ? (
        <AddJobForm onAddJob={addJob} onClose={() => setShowForm(false)} />
      ) : showApplicationForm ? (
        <ApplyForm
          job={selectedJob}
          onClose={() => setShowApplicationForm(false)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job, index) => (
            <div key={index} className="border p-4 rounded shadow bg-green-50">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Employer:</strong> {job.employer}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Location:</strong> {job.location}
              </p>
              {job.salary && (
                <p className="text-gray-700 mb-1">
                  <strong>Salary:</strong> {job.salary}
                </p>
              )}
              <p className="text-gray-700 mb-2">{job.description}</p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleApplyClick(job);
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
