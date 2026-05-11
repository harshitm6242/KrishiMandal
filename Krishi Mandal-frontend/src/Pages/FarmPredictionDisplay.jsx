import React, { useState } from "react";

const FarmPredictionVisualization = () => {
  const [farmData, setFarmData] = useState({
    district: "Mumbai",
    state: "Maharashtra",
    area: 10,
    rentalDuration: 12,
    purpose: "Agricultural Cultivation",
    totalRentPrice: 150000,
  });

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockPredictions = {
    AnnualRevenueProjection: "₹2,400,000",
    CropSuitability: "Highly suitable for wheat and vegetables",
    WaterAvailability: "Good (groundwater table at 15-20 feet)",
    SoilNutrientStatus: "Medium fertility, recommended fertilizer mix provided",
    MarketAccessibility: "Excellent (close to Mumbai agricultural markets)",
    RiskAssessment: "Low to moderate risk",
    PotentialCrops: ["Wheat", "Tomatoes", "Onions", "Spinach"],
    EstimatedInvestmentReturn: "15-18% per annum",
  };

  const generatePredictions = () => {
    setLoading(true);
    setTimeout(() => {
      setPredictions(mockPredictions);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-700 text-white p-4">
          <h2 className="text-2xl font-bold">Farm Analysis</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Farm Details
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>District:</strong> {farmData.district}
                </p>
                <p>
                  <strong>State:</strong> {farmData.state}
                </p>
                <p>
                  <strong>Area:</strong> {farmData.area} acres
                </p>
                <p>
                  <strong>Rental Duration:</strong> {farmData.rentalDuration}{" "}
                  months
                </p>
                <p>
                  <strong>Purpose:</strong> {farmData.purpose}
                </p>
                <p>
                  <strong>Total Rent:</strong> ₹
                  {farmData.totalRentPrice.toLocaleString()}/month
                </p>
              </div>
            </div> */}

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Analysis Results
              </h3>
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : predictions ? (
                <div className="space-y-2">
                  {Object.entries(predictions).map(([key, value]) => (
                    <div key={key} className="bg-green-50 p-2 rounded">
                      <strong className="text-green-800">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </strong>{" "}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  No Analysis generated yet
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={generatePredictions}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Analysis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmPredictionVisualization;
