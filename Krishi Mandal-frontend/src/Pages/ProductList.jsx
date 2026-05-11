import React, { useState } from "react";
import ShippingForm from "./ShippingForm";
import { useNavigate } from "react-router-dom";
import ComparisonTable from "../Components/ComparisonTable";

function ProductList({ category, products, onBack }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mode, setMode] = useState("");
  const navigate = useNavigate();
  const [productname, setProductName] = useState("");
  const handleProductAction = (product, action) => {
    const loggedIn = localStorage.getItem("loggedIn"); // Example check, replace with your actual logic
    const userid = localStorage.getItem("id");
    if (loggedIn !== "true") {
      alert("You must be logged in to buy or borrow items.");
      navigate("/login"); // Redirect to login page
    } else if (product.user == userid) {
      alert("You cannot Buy your own Products");
    } else {
      setSelectedProduct(product);
      setMode(action); // Set the action (buy or borrow)
    }
  };

  const fetchProducts = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/ProductsListServlet",
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials like cookies if necessary
          body: JSON.stringify({
            productname: productname,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products"); // Handle HTTP errors
      }

      const data = await response.json();
      if (data.message) console.log(data.message);
      console.log(data.searchproducts);
      // setProducts(data.products); // Update products state
    } catch (err) {
      setError(err.message || "An error occurred while fetching products");
      setProducts([]); // Clear products state on error
    }
  };

  const handleFormSubmit = (details) => {
    //alert(`Order Confirmed for ${details.product.name} to ${details.address}!`);
    setSelectedProduct(null);
    setMode("");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products in {category}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Categories
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full h-48 mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-gray-200">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={`Image of ${product.name}`}
                className="max-w-full max-h-full object-contain"
                //onError={(e) => (e.target.src = "https://placehold.co/150")}
              />
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">₹{product.price}</p>
            <button
              className={`mt-4 w-50% px-4 py-2 rounded-lg text-white font-semibold ${
                product.price.includes("day")
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              } transition-colors`}
              onClick={() =>
                handleProductAction(
                  product,
                  product.price.includes("day") ? "borrow" : "buy"
                )
              }
            >
              {product.price.includes("day") ? "Borrow" : "Buy Now"}
            </button>
            <a
              href={`/compare?productName=${encodeURIComponent(product.name)}`}
              //onClick={setProductName(product.name)}

              className="mt-4 w-50% px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 ml-9"
            >
              Compare
            </a>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ShippingForm
          product={selectedProduct}
          mode={mode}
          onClose={() => setSelectedProduct(null)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

export default ProductList;
