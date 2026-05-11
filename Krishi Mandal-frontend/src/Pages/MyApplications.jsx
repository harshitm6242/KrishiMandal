import React, { useState, useEffect } from "react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchApplications = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch(
    //       "https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/Application.json"
    //     );
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const result = await response.json();
    //     console.log("Full API Response:", result);
    //     // Adjust data parsing based on the API structure
    //     const applicationsData = Array.isArray(result)
    //       ? result
    //       : result.applications || result.data || [];
    //     setApplications(
    //       Array.isArray(applicationsData) ? applicationsData : []
    //     );
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching applications:", error);
    //     setError(error.message);
    //     setIsLoading(false);
    //   }
    // };
    fetchProducts();
  }, []);
  const user = localStorage.getItem("id");
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

      console.log("hello");
      console.log(data.application);
      const applicationsData = Array.isArray(data.application)
        ? data.application
        : [];
      setApplications(applicationsData); // Set the state
      console.log("Applications Set:", applicationsData);
    } catch (err) {
      // setError(err.message || "An error occurred while fetching products");
      // Clear products state on error
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Offer Received":
        return "bg-green-100 text-green-800";
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Applied":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
  //     </div>
  //   );
  //}

  if (error) {
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div
              key={application.id || Math.random()}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{application.title}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    application.applicationStatus
                  )}`}
                >
                  {application.applicationStatus}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Applicant Name:</strong> {application.name}
                </p>
                <p>
                  <strong>Company:</strong> {application.company}
                </p>
                <p>
                  <strong>Application Date:</strong>{" "}
                  {application.applicationDate}
                </p>
                <p>
                  <strong>Salary:</strong> {application.salary}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No job applications found. Check the data source or network
            connection.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
