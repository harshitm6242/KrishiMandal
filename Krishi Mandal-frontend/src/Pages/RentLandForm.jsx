import React, { useState, useEffect } from "react";
import axios from "axios";

const RentLandForm = ({ onSubmit, onBack, handleFileChange }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const response = await fetch(
      "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    );
    const data = await response.json();
    setStates(data.states);
  };

  const fetchDistricts = async (stateId) => {
    const response = await fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
    );
    const data = await response.json();
    setDistricts(data.districts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);
    fetchDistricts(stateId);
    setFormData({ ...formData, state: stateId });
  };

  const validateForm = () => {
    const requiredFields = [
      "area",
      "address",
      "state",
      "district",
      "khasraNo",
      "location",
      "price",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      district: districtId,
    }));
  };

  return (
    <div className="rent-land-form max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
        Add Land for Rent
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="area"
              className="block text-lg font-medium text-gray-700"
            >
              Area (in sqft/acres)
            </label>
            <input
              type="text"
              id="area"
              name="area"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            />
          </div>

          {/* State */}
          <div className="mb-4">
            <label htmlFor="state" className="block text-lg font-semibold">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              className="w-full p-2 mt-2 border rounded-md"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-lg font-semibold">
              District
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              className="w-full p-2 mt-2 border rounded-md"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="khasraNo"
              className="block text-lg font-medium text-gray-700"
            >
              Khasra No.
            </label>
            <input
              type="text"
              id="khasraNo"
              name="khasraNo"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-lg font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="disputedLand"
              className="block text-lg font-medium text-gray-700"
            >
              Disputed Land
            </label>
            <select
              id="disputedLand"
              name="disputedLand"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="rentDuration"
              className="block text-lg font-medium text-gray-700"
            >
              Rent Duration (in months)
            </label>
            <input
              type="text"
              id="rentDuration"
              name="rentDuration"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-lg font-medium text-gray-700"
            >
              Price (in INR)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="pictures"
              className="block text-lg font-medium text-gray-700"
            >
              Upload Pictures
            </label>
            <input
              type="file"
              id="pictures"
              name="pictures"
              onChange={(e) => {
                handleFileChange(e);
                handleInputChange(e);
              }}
              multiple
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentLandForm;
