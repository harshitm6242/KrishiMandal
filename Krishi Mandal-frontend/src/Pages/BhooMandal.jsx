import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RentLandForm from "./RentLandForm";
import CollabLandForm from "./CollabLandForm";
import Suggestion from "./Suggestion";

// Popup Component
const Popup = ({ onClose, landDetails }) => {
  const isCollabLand = "Purpose" in landDetails;
  localStorage.setItem("district", landDetails.Address);
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.02]">
        {/* Image Section */}
        {/* <div className="w-full h-72 relative">
          <img
            src={landDetails.PictureOfLand}
            alt={landDetails.Name}
            className="w-full h-full object-cover rounded-t-2xl filter brightness-90 hover:brightness-100 transition-all duration-300"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div> */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-6">
          <h2 className="text-3xl font-bold text-green-900 mb-4 border-b-2 border-green-200 pb-2">
            {landDetails.Name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <DetailItem label="Area" value={landDetails.Size} />
              <DetailItem label="District" value={landDetails.District} />
              <DetailItem label="Khasra No" value={landDetails.KhasraNo} />
            </div>

            <div className="space-y-4">
              <DetailItem
                label={isCollabLand ? "Deposit" : "Cost"}
                value={isCollabLand ? landDetails.Deposit : landDetails.Cost}
              />
              <DetailItem
                label="Duration"
                value={
                  isCollabLand
                    ? landDetails.DurationOfCollaboration
                    : landDetails.DurationOfRent
                }
              />
              <DetailItem
                label="Disputed Land"
                value={landDetails.DisputedLand}
              />
              {isCollabLand && (
                <DetailItem label="Purpose" value={landDetails.Purpose} />
              )}
            </div>
          </div>

          {/* Map Location Link */}
          <div className="mt-6 text-center">
            <a
              href={landDetails.LocationPin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors duration-300 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              View Location on Map
            </a>
          </div>
          <div className="flex gap-8">
            <a
              href="/suggestion"
              className="bg-red-500 p-3 rounded-lg font-bold text-white cursor-pointer"
            >
              कृषि मित्र Analysis
            </a>
            <a className="bg-green-500 p-3 rounded-lg font-bold text-white cursor-pointer">
              Interested
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detail Item Component for consistent display
const DetailItem = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
    <span className="block text-sm text-gray-600 mb-1">{label}</span>
    <span className="text-base font-medium text-gray-800">{value}</span>
  </div>
);

// Card Component for Land Details
const Card = ({ land, buttonText, onShowDetails }) => (
  <div className="card bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-2xl font-bold text-green-900">{land.Name}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
    <div className="space-y-2 mb-4">
      <p className="text-gray-700">
        <strong>Size:</strong> {land.Size}
      </p>
      <p className="text-gray-700">
        <strong>Location:</strong> {land.District}
      </p>
      {land.Cost && (
        <p className="text-gray-700">
          <strong>Cost:</strong> {land.Cost}
        </p>
      )}
      {land.Deposit && (
        <p className="text-gray-700">
          <strong>Deposit:</strong> {land.Deposit}
        </p>
      )}
    </div>
    <button
      onClick={() => onShowDetails(land)}
      className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
    >
      <span>{buttonText}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
);

// Main BhooMandal Component
const BhooMandal = () => {
  const [activeTab, setActiveTab] = useState("rent");
  const [isFormVisible, setFormVisible] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedLandDetails, setSelectedLandDetails] = useState(null);
  const [landsForRent, setLandsForRent] = useState([]);
  const [landsForCollaboration, setLandsForCollaboration] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/BhooMandal.json"
        );
        const data = await response.json();
        setLandsForRent(data.BhooMandal.LandForRent);
        setLandsForCollaboration(data.BhooMandal.LandForCollab);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleShowDetails = (landDetails) => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      alert("Please log in to view the land details!");
      navigate("/login");
    } else {
      setSelectedLandDetails(landDetails);
      setPopupOpen(true);
    }
  };

  const handleClosePopup = () => setPopupOpen(false);

  const handleShowForm = (formType) => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      alert("Please log in to add land or view details!");
      navigate("/login");
    } else {
      setFormVisible(formType);
    }
  };

  const handleBackToBhooMandal = () => {
    setFormVisible(null);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-lg p-1.5 flex space-x-2">
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === "rent"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-green-100"
              }`}
            >
              Borrow a Land
            </button>
            <button
              onClick={() => setActiveTab("collab")}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === "collab"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-green-100"
              }`}
            >
              Land As Stock
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {activeTab === "rent" && (
            <>
              {isFormVisible === "rent" ? (
                <RentLandForm onBack={handleBackToBhooMandal} />
              ) : (
                <>
                  <div className="bg-green-100/50 p-6 flex justify-between items-center border-b border-green-200">
                    <h1 className="text-3xl font-bold text-green-900">
                      Borrow a Land
                    </h1>
                    <button
                      onClick={() => handleShowForm("rent")}
                      className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Add Land for Rent</span>
                    </button>
                  </div>
                  <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {landsForRent.map((land) => (
                      <Card
                        key={land.Name}
                        land={land}
                        buttonText="More Details"
                        onShowDetails={handleShowDetails}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "collab" && (
            <>
              {isFormVisible === "collab" ? (
                <CollabLandForm onBack={handleBackToBhooMandal} />
              ) : (
                <>
                  <div className="bg-green-100/50 p-6 flex justify-between items-center border-b border-green-200">
                    <h1 className="text-3xl font-bold text-green-900">
                      Land As a Stock
                    </h1>
                    <button
                      onClick={() => handleShowForm("collab")}
                      className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg> */}
                      {/* <span>Add Land for Collab</span> */}
                    </button>
                  </div>
                  <div>
                    <div className="bg-green-50 p-6 rounded-2xl shadow-lg text-2xl">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">"Land as stock"</span>{" "}
                        refers to the concept of land being treated as a fixed
                        resource or asset available for use. In environmental
                        science, economics, and geography, land is often
                        considered a
                        <span className="font-bold"> natural stock</span> that
                        provides various ecosystem services and resources. It is
                        a finite resource that can be used for agriculture,
                        forestry, urban development, or conservation.
                      </p>

                      {/* <h3 className="mt-4 text-2xl font-semibold text-green-800">
                        Understanding Land as Stock
                      </h3>

                      <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                        <li>
                          <span className="font-semibold">
                            Finite Resource:
                          </span>{" "}
                          Land is a limited resource, meaning there is only a
                          fixed amount available on Earth.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Stock of Natural Resources:
                          </span>{" "}
                          Land contains
                          <span className="font-bold">natural stocks</span> such
                          as soil, minerals, forests, and biodiversity.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Economic Perspective:
                          </span>{" "}
                          In economics, land is classified as a
                          <span className="font-bold">
                            factor of production
                          </span>
                          , along with labor and capital.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Ecosystem Services:
                          </span>{" "}
                          Land provides essential ecological functions such as
                          supporting plant growth, storing carbon, regulating
                          water cycles, and maintaining biodiversity.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Sustainable Management:
                          </span>{" "}
                          Sustainable land use planning is crucial to prevent
                          depletion, degradation (like soil erosion), and loss
                          of productivity.
                        </li>
                      </ul> */}

                      <h2 className="text-6xl font-bold text-green-900 mb-4 text-center mx-auto mt-6">
                        Coming Soon!
                      </h2>
                    </div>
                  </div>

                  {/* <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {landsForCollaboration.map((land) => (
                      <Card
                        key={land.Name}
                        land={land}
                        buttonText="More Details"
                        onShowDetails={handleShowDetails}
                      />
                    ))}
                  </div> */}
                </>
              )}
            </>
          )}
        </div>

        {/* Popup for More Details */}
        {isPopupOpen && (
          <Popup onClose={handleClosePopup} landDetails={selectedLandDetails} />
        )}
      </div>
    </section>
  );
};

export default BhooMandal;
