import React, { useState, useEffect } from "react";

const AgriculturePlatformListings = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [data, setData] = useState({
    Jobs: [],
    // Marketplace: [],
    // LandListings: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobApplications, setSelectedJobApplications] = useState([]);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const user = localStorage.getItem("id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:2004/KrishiMandal/JobListServlet",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              user: user,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const responseData = await response.json();
        if (responseData.message) {
          console.log(responseData.message);
        }

        console.log(responseData.myjobs);
        console.log(responseData.myapplication);
        setSelectedJobApplications(responseData.myapplication);
        setData({
          Jobs: responseData.myjobs || [],
          Marketplace: responseData.marketplace || [],
          LandListings: responseData.landListings || [],
        });
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching products");
        setData({ Jobs: [], Marketplace: [], LandListings: [] });
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  const renderJobCard = (job) => {
    const openApplicationModal = () => {
      //setSelectedJobApplications(job.applications || []);
      setIsApplicationModalOpen(true);
    };

    return (
      <div
        key={job.jobId}
        className="bg-white shadow-md rounded-lg p-4 mb-4 relative"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
            {job.type}
          </span>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Company:</strong> {job.companyName}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Salary:</strong> {job.Salary}
          </p>
          <p>
            <strong>Posted:</strong> {job.postedDate}
          </p>
          <p className="mt-2">{job.description}</p>
        </div>

        <button
          onClick={openApplicationModal}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Applications Received
          {/* ({}
          {selectedJobApplications ? selectedJobApplications.length : 0}) */}
        </button>
        {isApplicationModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Applications for {job.title}
                </h2>
                <button
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {selectedJobApplications.length === 0 ? (
                <p className="text-center text-gray-500">
                  No applications received yet.
                </p>
              ) : (
                <div className="max-h-[400px] overflow-y-auto">
                  {selectedJobApplications.map((application, index) => (
                    <div
                      key={index}
                      className="border-b last:border-b-0 pb-4 mb-4 last:mb-0"
                    >
                      <div className="flex justify-between items-center mb-2">
                        {/* <h4 className="font-semibold">{application.name}</h4> */}
                        <span className="text-sm text-gray-600">
                          {application.applicationDate}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p>
                          <strong>Applicant Name:</strong> {application.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {application.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {application.phone}
                        </p>
                        <p className="mt-2">
                          <strong>Experience:</strong> {application.experience}
                        </p>
                        <p>
                          <strong>Qualifications:</strong>{" "}
                          {application.qualifications}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // const renderMarketplaceCard = (item) => {
  //   return (
  //     <div key={item.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
  //       <h3 className="text-lg font-semibold">{item.name}</h3>
  //       <p className="text-gray-600">{item.description}</p>
  //       <div className="mt-2">
  //         <strong>Price:</strong> {item.price}
  //         <br />
  //         <strong>Location:</strong> {item.location}
  //       </div>
  //     </div>
  //   );
  // };

  // const renderLandListingCard = (listing) => {
  //   return (
  //     <div key={listing.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
  //       <h3 className="text-lg font-semibold">{listing.title}</h3>
  //       <p className="text-gray-600">{listing.description}</p>
  //       <div className="mt-2">
  //         <strong>Area:</strong> {listing.size}
  //         <br />
  //         <strong>Price:</strong> {listing.price}
  //         <br />
  //         <strong>Location:</strong> {listing.location}
  //       </div>
  //     </div>
  //   );
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agriculture Platform</h1>

      <div className="flex border-b mb-4">
        {["Jobs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 ${
              activeTab === tab.toLowerCase()
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "jobs" && data.Jobs.map(renderJobCard)}
      {/* {activeTab === "marketplace" &&
        data.Marketplace.map(renderMarketplaceCard)}
      {activeTab === "land" && data.LandListings.map(renderLandListingCard)} */}
    </div>
  );
};

export default AgriculturePlatformListings;
