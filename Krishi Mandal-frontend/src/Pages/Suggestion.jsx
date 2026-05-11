import React from "react";
import FarmPredictionDisplay from "./FarmPredictionDisplay";

function Suggestion(data) {
  const dummyFarmData = {
    district: "Nashik",
    state: "Maharashtra",
    area: 10,
    rentalDuration: 12,
    purpose: "Agriculture",
    totalRentPrice: 50000,
  };
  return (
    <div>
      <FarmPredictionDisplay farmData={dummyFarmData} />
    </div>
  );
}

export default Suggestion;
