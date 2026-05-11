import React, { useState } from 'react';
import { Flower, Droplet, Sun, Leaf, Award, DollarSign } from 'lucide-react';

const KesarFarmingInvestment = () => {
  const [showModal, setShowModal] = useState(false);

  const projectDetails = {
    title: "Himalayan Kesar Farming Project",
    location: "Pampore, Kashmir",
    totalInvestmentNeeded: 500000,
    currentFunding: 275000,
    expectedYield: 1.5,
    minimumInvestment: 50000,
    projectDuration: 3,
    owner: "Kashmir Saffron Cooperative",
    description: "Invest in a premium saffron cultivation project in the world-renowned saffron fields of Kashmir. Our sustainable farming practices and premium location guarantee exceptional quality and returns."
  };

  const FundingProgressBar = () => {
    const progressPercentage = (projectDetails.currentFunding / projectDetails.totalInvestmentNeeded) * 100;

    return (
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-green-600 h-4 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };

  const InvestmentModal = () => {
    const [investmentAmount, setInvestmentAmount] = useState(projectDetails.minimumInvestment);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Invest in Kesar Farming
          </h2>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Investment Amount</span>
              <span className="font-bold text-green-700">₹{investmentAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={projectDetails.minimumInvestment}
              max={projectDetails.totalInvestmentNeeded - projectDetails.currentFunding}
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Min ₹{projectDetails.minimumInvestment.toLocaleString()}</span>
              <span>Max ₹{(projectDetails.totalInvestmentNeeded - projectDetails.currentFunding).toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-100 p-3 rounded-lg">
              <DollarSign className="mx-auto text-green-600 mb-2" size={24} />
              <p className="font-medium text-gray-700">Expected Return</p>
              <p className="font-bold text-green-800">{projectDetails.expectedYield}x</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Clock className="mx-auto text-green-600 mb-2" size={24} />
              <p className="font-medium text-gray-700">Project Duration</p>
              <p className="font-bold text-green-800">{projectDetails.projectDuration} Years</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Confirm Investment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {showModal && <InvestmentModal />}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {projectDetails.title}
        </h2>
        <p className="text-gray-600 mb-4">{projectDetails.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Funding Progress</span>
            <span>
              ₹{projectDetails.currentFunding.toLocaleString()} /
              ₹{projectDetails.totalInvestmentNeeded.toLocaleString()}
            </span>
          </div>
          <FundingProgressBar />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Flower className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Premium Crop</p>
          </div>
          <div className="text-center">
            <Sun className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Optimal Climate</p>
          </div>
          <div className="text-center">
            <Award className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Certified Quality</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <DollarSign className="mr-2" size={20} />
          Fund This Project
        </button>
      </div>
    </div>
  );
};

export default KesarFarmingInvestment;