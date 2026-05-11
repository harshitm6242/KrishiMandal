import React, { useState, useEffect } from "react";

function SellMSP({ onBack }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [isRent, setIsRent] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [imagePreview, setImagePreview] = useState(null);

  const user = localStorage.getItem("id");

  //   const rentCategories = [
  //     "Farming Tools On Rent",
  //     "Machineries On Rent",
  //     "Heavy Equipments On Rent",
  //     "Others",
  //   ];

  const buyCategories = ["Seeds"];

  const items = {
    "Paddy (Common)": { min: 23, max: 27.6 },
    "Paddy (Grade-A)": { min: 23.2, max: 27.84 },
    "Jowar (Hybrid)": { min: 33.71, max: 40.45 },
    Bajra: { min: 26.25, max: 31.5 },
    Maize: { min: 22.25, max: 26.7 },
    "Tur/Arhar": { min: 75.5, max: 90.6 },
    Moong: { min: 86.82, max: 104.18 },
    Urad: { min: 74, max: 88 },
    Groundnut: { min: 67.83, max: 81.4 },
    "Sunflower Seed": { min: 72.8, max: 87.36 },
    "Soybean (Yellow)": { min: 48.92, max: 58.7 },
    Sesamum: { min: 92.67, max: 111.2 },
    Nigerseed: { min: 87.17, max: 104.6 },
    "Cotton (Medium Staple)": { min: 71.21, max: 85.45 },
  };

  useEffect(() => {
    if (itemName && items[itemName]) {
      setPriceRange(items[itemName]);
    }
  }, [itemName]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productImage) {
        const formData = new FormData();
        formData.append("productImage", productImage);
        formData.append("name", itemName);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("category", productCategory);
        formData.append("price", price);
        formData.append("duration", duration);
        formData.append("isrent", isRent);
        formData.append("userid", user);

        const response = await fetch(
          "http://localhost:2004/KrishiMandal/Servlet",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setResponseMessage(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error: Something went wrong");
    }
  };

  return (
    <div className="relative flex flex-col justify-start items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-xl mt-16 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRent ? "Rent Your Product" : "Sell on MSP"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name
              </label>
              <select
                value={itemName}
                onChange={(e) => handleInputChange(e, setItemName)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Item</option>
                {Object.keys(items).map((item) => (
                  <option key={item} value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={productCategory}
                onChange={(e) => handleInputChange(e, setProductCategory)}
                className="pointer-events-none w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                required
              >
                {(isRent ? rentCategories : buyCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => handleInputChange(e, setDescription)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
              placeholder="Describe your product..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleInputChange(e, setQuantity)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => handleInputChange(e, setPrice)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={priceRange.min}
                max={priceRange.max}
                required
              />
              {itemName && (
                <p className="text-sm text-gray-600 mt-1">
                  Price range: ₹{priceRange.min} - ₹{priceRange.max}(per Kg)
                </p>
              )}
            </div>
          </div>

          {isRent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => handleInputChange(e, setDuration)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. per day, per week"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              accept="image/*"
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {responseMessage && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex items-center">
              <span className="text-sm">{responseMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellMSP;
