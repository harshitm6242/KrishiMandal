import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShippingForm from "../Pages/ShippingForm"; // Ensure you have this component imported

const ComparisonTable = () => {
  const location = useLocation();
  const navigate = useNavigate(); // To navigate between pages

  const [selectedProduct, setSelectedProduct] = useState(null); // Use null initially
  const [productData, setProductData] = useState([]);

  // Extract the product name from the query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const productName = queryParams.get("productName");
    if (productName) {
      fetchProducts(productName);
    }
  }, [location]);
  const userid = localStorage.getItem("id");
  const fetchProducts = async (productName) => {
    console.log(productName);

    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/ProductsListServlet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ productName }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (data.products) {
        console.log(data.searchproducts);
        setProductData(data.searchproducts || []);
      } else {
        setProductData([]);
        console.error("No products found.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProductData([]);
    }
  };

  const handleProductAction = (product, action) => {
    if (action === "buy" && userid != product.user) {
      setSelectedProduct(product); // Set the selected product when "Buy Now" is clicked
    } else {
      alert("You Cannot Buy Your Own Products");
    }
  };

  const handleFormSubmit = (details) => {
    // alert(`Order Confirmed for ${details.product.name} to ${details.address}!`);
    setSelectedProduct(null); // Reset selected product after form submission
  };

  return (
    <div style={{ margin: "20px", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Farmer Product Comparison
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr>
            <th style={headerStyle}>Attributes</th>
            {productData.map((product, index) => (
              <th key={index} style={headerStyle}>
                {product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Feedback Row */}
          <tr>
            <td style={cellStyle}>Description</td>
            {productData.map((product, index) => (
              <td key={index} style={cellStyle}>
                {product.description || "N/A"}
              </td>
            ))}
          </tr>
          {/* Quality Row */}
          <tr>
            <td style={cellStyle}>Quality</td>
            {productData.map((product, index) => (
              <td key={index} style={cellStyle}>
                {product.quality || "N/A"}
              </td>
            ))}
          </tr>
          {/* Sales Row */}
          <tr>
            <td style={cellStyle}>Sales</td>
            {productData.map((product, index) => (
              <td key={index} style={cellStyle}>
                {product.sales ? `${product.sales} units` : "N/A"}
              </td>
            ))}
          </tr>
          {/* Price Row */}
          <tr>
            <td style={cellStyle}>Price</td>
            {productData.map((product, index) => (
              <td key={index} style={cellStyle}>
                ₹{product.price || "N/A"}
              </td>
            ))}
          </tr>
          {/* Action Buttons */}
          <tr>
            <td style={cellStyle}></td>
            {productData.map((product, index) => (
              <td key={index} style={cellStyle}>
                <button
                  className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold ${
                    product.price && product.price.toString().includes("day")
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  } transition-colors`}
                  onClick={() =>
                    handleProductAction(
                      product,
                      product.price && product.price.toString().includes("day")
                        ? "borrow"
                        : "buy"
                    )
                  }
                >
                  {product.price && product.price.toString().includes("day")
                    ? "Borrow"
                    : "Buy Now"}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Show the ShippingForm when a product is selected */}
      {selectedProduct && (
        <ShippingForm
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

const headerStyle = {
  backgroundColor: "#f4f4f4",
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
  fontWeight: "bold",
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

export default ComparisonTable;
