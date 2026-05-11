import React, { useState, useEffect } from 'react';

function SchemeSubsidies() {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('central'); // Default to "central"
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allStates] = useState([
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]);

  useEffect(() => {
    setLoading(true);
    fetch('https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/agricultural-schemes.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSchemes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to fetch schemes. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter schemes based on selected category and state
    if (selectedCategory === 'state') {
      setFilteredSchemes(schemes.state?.filter(scheme => !selectedState || scheme.state === selectedState) || []);
    } else if (selectedCategory) {
      setFilteredSchemes(schemes[selectedCategory] || []);
    } else {
      setFilteredSchemes([]);
    }
  }, [schemes, selectedCategory, selectedState]);

  if (loading) {
    return <p className="text-center mt-4">Loading schemes...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="flex flex-col items-start">
      {/* Heading and Filters */}
      <div className="flex flex-wrap items-center gap-10 w-full mb-6">
        <h1 className="text-3xl font-bold underline underline-offset-2 mt-4">Agricultural Schemes & Subsidies</h1>
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedState(''); // Reset state when category changes
            }}
            className="border border-gray-300 rounded p-2"
          >
            <option value="central">Central</option>
            <option value="state">State</option>
            <option value="private">Private</option>
          </select>

          {selectedCategory === 'state' && (
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">All States</option>
              {allStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Display Schemes */}
      <div className="flex flex-wrap -mt-4">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme, index) => (
            <div key={index} className="w-auto h-auto rounded-lg shadow-lg p-4 bg-white m-2">
              <div className="font-bold text-xl mb-2">{scheme.name}</div>
              <p className="text-gray-700 text-base">
                {scheme.description}
              </p>
              <a href={scheme.more_details_link} target="_blank" rel="noopener noreferrer">
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  More Details
                </button>
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No schemes available for the selected filter.</p>
        )}
      </div>
    </div>
  );
}

export default SchemeSubsidies;