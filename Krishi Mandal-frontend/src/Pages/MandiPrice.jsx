import React, { useState } from 'react';

function MandiPrice() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [market, setMarket] = useState('');
  const [commodity, setCommodity] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData([]);

    // Normalize inputs and trim whitespace
    const normalizedState = state.trim();
    const normalizedDistrict = district.trim();
    const normalizedMarket = market.trim();
    const normalizedCommodity = commodity.trim();

    // Check if state and district are provided
    if (!normalizedState || !normalizedDistrict) {
      setError("State and District are required fields.");
      setLoading(false);
      return;
    }

    try {
      // Constructing the URL with conditional filters for optional fields (market and commodity)
      const filters = [
        `filters%5Bstate.keyword%5D=${encodeURIComponent(normalizedState)}`,
        `filters%5Bdistrict%5D=${encodeURIComponent(normalizedDistrict)}`,
        normalizedMarket && `filters%5Bmarket%5D=${encodeURIComponent(normalizedMarket)}`,
        normalizedCommodity && `filters%5Bcommodity%5D=${encodeURIComponent(normalizedCommodity)}`
      ].filter(Boolean).join('&');

      const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&${filters}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data. Please check your inputs.');
      }

      const result = await response.json();

      if (!result.records || result.records.length === 0) {
        setError("No data found for the given inputs.");
      } else {
        setData(result.records);
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 ml-4 mr-4 p-1">
      <h1 className="text-2xl font-bold mb-4">Mandi Price Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <span className="absolute top-2 right-2 text-red-500">*</span> {/* Required asterisk */}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <span className="absolute top-2 right-2 text-red-500">*</span> {/* Required asterisk */}
          </div>
          <input
            type="text"
            placeholder="Market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {/* Displaying the data directly on the page */}
      {data.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Mandi Price Data</h2>
          <table className="min-w-full bg-white border border-gray-200 -ml-5">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">Commodity</th>
                <th className="py-2 px-4 border-b text-center">Arrival Date</th>
                <th className="py-2 px-4 border-b text-center">Variety</th>
                <th className="py-2 px-4 border-b text-center">Market</th>
                <th className="py-2 px-4 border-b text-center">Min Price</th>
                <th className="py-2 px-4 border-b text-center">Max Price</th>
                <th className="py-2 px-4 border-b text-center">Avg Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{item.commodity}</td>
                  <td className="py-2 px-4 border-b text-center">{item.arrival_date}</td>
                  <td className="py-2 px-4 border-b text-center">{item.variety}</td>
                  <td className="py-2 px-4 border-b text-center">{item.market}</td>
                  <td className="py-2 px-4 border-b text-center">₹{item.min_price}/Quintal</td>
                  <td className="py-2 px-4 border-b text-center">₹{item.max_price}/Quintal</td>
                  <td className="py-2 px-4 border-b text-center">₹{item.modal_price}/Quintal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MandiPrice;