import React, { useState, useEffect } from "react";

const CollabLandForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    area: "",
    address: "",
    district: "",
    khasraNo: "",
    location: "",
    disputedLand: "",
    duration: "",
    pictures: [],
    purpose: "",
    price: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");

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

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setFormData((prevData) => ({
      ...prevData,
      state: stateId,
      district: "", // Reset district when state changes
    }));
    fetchDistricts(stateId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      district: districtId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      pictures: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Add Land for Collaboration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Area */}
        <div>
          <label
            htmlFor="area"
            className="block text-gray-700 font-medium mb-2"
          >
            Area (sqft/acres):
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter area"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-2"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
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

        {/* Khasra No */}
        <div>
          <label
            htmlFor="khasraNo"
            className="block text-gray-700 font-medium mb-2"
          >
            Khasra No.:
          </label>
          <input
            type="text"
            id="khasraNo"
            name="khasraNo"
            value={formData.khasraNo}
            onChange={handleChange}
            placeholder="Enter Khasra number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location (Pin on Map):
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location or map pin"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Disputed Land */}
        <div>
          <label
            htmlFor="disputedLand"
            className="block text-gray-700 font-medium mb-2"
          >
            Disputed Land? (y/n):
          </label>
          <select
            id="disputedLand"
            name="disputedLand"
            value={formData.disputedLand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-gray-700 font-medium mb-2"
          >
            Duration of Collaboration (months):
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        {/* Pictures */}
        <div>
          <label
            htmlFor="pictures"
            className="block text-gray-700 font-medium mb-2"
          >
            Pictures of Land:
          </label>
          <input
            type="file"
            id="pictures"
            name="pictures"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            multiple
          />
        </div>

        {/* Purpose */}
        <div>
          <label
            htmlFor="purpose"
            className="block text-gray-700 font-medium mb-2"
          >
            Purpose:
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Enter the purpose for collaboration"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollabLandForm;
