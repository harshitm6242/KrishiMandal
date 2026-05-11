import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import SellRent from "./SellRent";

function Marketplace() {
  const navigate = useNavigate();
  const shopCategories = [
    {
      name: "Fresh Fruits and Vegetables",
      img: "Public/Images/fresh fruits & vegetables.png",
    },
    {
      name: "Dry Fruits and Spices",
      img: "Public/Images/Dry fruits and spices.jpg",
    },
    { name: "Seeds", img: "Public/Images/Seeds.jpg" },
    { name: "Pulses & Cereals", img: "Public/Images/Pulses.jpg" },
    {
      name: "Soil Fertilizers & Pesticides",
      img: "Public/Images/Fertilizers.jpg",
    },
    { name: "Farming Tools", img: "Public/Images/Farming tools.png" },
    { name: "Machineries", img: "Public/Images/Machineries.jpg" },
    { name: "Others", img: "Public/Images/Others.png" },
  ];

  const borrowCategories = [
    { name: "Farming Tools On Rent", img: "Public/Images/Farming tools.png" },
    { name: "Machineries On Rent", img: "Public/Images/Machineries.jpg" },
    {
      name: "Heavy Equipments On Rent",
      img: "Public/Images/Heavy Equipment.jpg",
    },
    { name: "Others", img: "Public/Images/Others.png" },
  ];

  const products = {
    Shop: {
      "Fresh Fruits and Vegetables": [
        {
          name: "Apples",
          price: "$3/kg",
          description: "Fresh red apples",
          img: "https://via.placeholder.com/150",
        },
        {
          name: "Carrots",
          price: "$2/kg",
          description: "Organic carrots",
          img: "https://via.placeholder.com/150",
        },
      ],
      "Dry Fruits and Spices": [
        {
          name: "Almonds",
          price: "$10/kg",
          description: "Premium quality almonds",
          img: "https://via.placeholder.com/150",
        },
      ],
      Seeds: [
        {
          name: "Wheat Seeds",
          price: "$5/kg",
          description: "High-quality wheat seeds",
          img: "https://via.placeholder.com/150",
        },
      ],
    },
    Borrow: {
      "Farming Tools": [
        {
          name: "Tractor",
          price: "$100/day",
          description: "High-power tractor for farming",
          img: "https://via.placeholder.com/150",
        },
        {
          name: "Plow",
          price: "$20/day",
          description: "Efficient soil plow",
          img: "https://via.placeholder.com/150",
        },
      ],
      Machineries: [
        {
          name: "Combine Harvester",
          price: "$300/day",
          description: "Harvest crops efficiently",
          img: "https://via.placeholder.com/150",
        },
      ],
    },
  };

  const [view, setView] = useState("Categories");
  const [selectedType, setSelectedType] = useState(""); // "Shop" or "Borrow"
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sellcategory, setsellcategory] = useState("");
  const [Loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [Product, setProducts] = useState([]);
  const [rentcategory, setRentcategory] = useState("");
  const [imageurl, setImageUrl] = useState("");

  const handleCategoryClick = (type, category) => {
    setSelectedType(type);
    setSelectedCategory(category);
    setsellcategory(category);
    setView("ProductList");
  };
  const handleRentCategoryClick = (type, category) => {
    setSelectedType(type);
    setSelectedCategory(category);
    setRentcategory(category);
    setView("ProductList");
  };

  useEffect(
    () => {
      if (sellcategory) {
        fetchProducts(sellcategory);
        setsellcategory("");
      } else if (rentcategory) {
        fetchProducts(rentcategory);
        setRentcategory("");
      }
    },
    [selectedCategory],
    [rentcategory]
  );

  const handleSellRentClick = () => {
    const loggedIn = localStorage.getItem("loggedIn"); // Example check (you can replace it with your actual login check)

    if (loggedIn === "true") {
      setView("SellRent"); // Update the view state to "SellRent"
    } else {
      // Show alert and redirect to login page if not logged in
      alert("You must be logged in to Sell or Rent items.");
      navigate("/login");
    }
  };

  const fetchProducts = async (e) => {
    //e.preventDefault();

    // Fetch the image from the backend
    const responseimage = await fetch(
      "http://localhost:2004/KrishiMandal/ProductsListServlet",
      {
        responseType: "arraybuffer", // Important for BLOB data
      }
    )
      .then((responseimage) => {
        // Create a Blob URL from the response
        const blob = new Blob([responseimage.data], { type: "image/jpeg" }); // Adjust type if needed
        const url = URL.createObjectURL(blob);
        console.log(blob);
        console.log(url);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });

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
            sellcategory: sellcategory,
            rentcategory: rentcategory,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products"); // Handle HTTP errors
      }

      const data = await response.json();
      //console.log(rentcategory);
      if (data.message) console.log(data.message);
      console.log(data.products);
      //console.log(data.image); // Log or show the success message
      const blob = new Blob([data.image], { type: "image/jpeg" }); // Adjust type if needed
      const url = URL.createObjectURL(blob);
      console.log(url);
      setProducts(data.products); // Update products state
    } catch (err) {
      setError(err.message || "An error occurred while fetching products");
      setProducts([]); // Clear products state on error
    }
  };

  return (
    <div className="container mx-auto p-4">
      {view === "Categories" && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            onClick={handleSellRentClick}
          >
            Sell/Rent
          </button>
        </div>
      )}
      {view === "Categories" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {shopCategories.map((category, index) => (
              <div
                key={index}
                className="border p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCategoryClick("Shop", category.name)}
              >
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-gray-200">
                  <img
                    src={category.img || "https://via.placeholder.com/150"}
                    alt={category.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">Borrow by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {borrowCategories.map((category, index) => (
              <div
                key={index}
                className="border p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleRentCategoryClick("Borrow", category.name)}
              >
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-gray-200">
                  <img
                    src={category.img || "https://via.placeholder.com/150"}
                    alt={category.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "ProductList" && (
        <ProductList
          category={selectedCategory}
          image={imageurl}
          products={Product || []}
          onBack={() => setView("Categories")}
        />
      )}

      {view === "SellRent" && <SellRent onBack={() => setView("Categories")} />}
    </div>
  );
}

export default Marketplace;
