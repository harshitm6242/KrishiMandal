import React, { useEffect, useState } from "react";
import { Calendar, Package, User, ShoppingCart, Repeat, X } from "lucide-react";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("purchases");
  const [selectedItem, setSelectedItem] = useState(null);
  const [purchase, setPurchase] = useState([]);
  const [rentals, setRental] = useState([]);
  // Dummy data for purchases
  // const purchases = [
  //   {
  //     orderid: "ORD001",
  //     usermobile: "9876543210",
  //     username: "John Farmer",
  //     productid: "PROD123",
  //     productName: "Advanced Seed Planter",
  //     email: "john@farmstead.com",
  //     quantity: 2,
  //     address: "Rural Route 1, Greenfield Farm, Iowa 50001",
  //     paymentid: "PAY789",
  //     upimode: "Bank Transfer",
  //     contact: 9876543210,
  //     orderamount: 2499.99,
  //     orderdate: "2024-03-15",
  //     status: "Delivered",
  //   },
  //   {
  //     orderid: "ORD002",
  //     usermobile: "9876543211",
  //     username: "Jane Agricorp",
  //     productid: "PROD456",
  //     productName: "Organic Fertilizer Pack",
  //     email: "jane@farmstead.com",
  //     quantity: 1,
  //     address: "Sunshine Valley Farm, California 94123",
  //     paymentid: "PAY790",
  //     upimode: "Direct Deposit",
  //     contact: 9876543211,
  //     orderamount: 1299.99,
  //     orderdate: "2024-03-16",
  //     status: "Shipped",
  //   },
  // ];
  const userid = localStorage.getItem("id");
  // Dummy data for rentals
  // const rentals = [
  //   {
  //     rentalid: "RENT001",
  //     usermobile: "9876543210",
  //     name: "John Farmer",
  //     pid: "RPROD123",
  //     productName: "Tractor Harvester",
  //     email: "john@farmstead.com",
  //     quantity: 1,
  //     address: "Rural Route 1, Greenfield Farm, Iowa 50001",
  //     paymentmode: "Seasonal Lease",
  //     contact: 9876543210,
  //     totalrentamount: 499.99,
  //     duration: 90,
  //     rentdate: "2024-03-15",
  //     status: "Active",
  //   },
  //   {
  //     rentalid: "RENT002",
  //     usermobile: "9876543211",
  //     name: "Jane Agricorp",
  //     pid: "RPROD456",
  //     productName: "Irrigation System",
  //     email: "jane@farmstead.com",
  //     quantity: 2,
  //     address: "Sunshine Valley Farm, California 94123",
  //     paymentmode: "Seasonal Agreement",
  //     contact: 9876543211,
  //     totalrentamount: 799.99,
  //     duration: 180,
  //     rentdate: "2024-03-16",
  //     status: "Completed",
  //   },
  // ];
  const fetchProducts = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/OrderDetailsServlet",
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials like cookies if necessary
          body: JSON.stringify({
            userid: userid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products"); // Handle HTTP errors
      }

      const data = await response.json();
      if (data.message) console.log(data.message);
      console.log(data.orders); // Log or show the success message
      console.log(data.rentorders);
      setRental(data.rentorders);
      setPurchase(data.orders); // Update products state
    } catch (err) {
      // setError(err.message || "An error occurred while fetching products");
      setJobs([]); // Clear products state on error
    }
  };
  //fetchProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const StatusBadge = ({ status }) => {
    const statusColors = {
      Delivered: "bg-green-100 text-green-800",
      Shipped: "bg-amber-100 text-amber-800",
      Active: "bg-emerald-100 text-emerald-800",
      Completed: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const DetailModal = ({ item, isOpen, onClose, type }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {type === "purchase" ? "Order" : "Rental"} Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">
                  {type === "purchase" ? "Order ID" : "Rental ID"}
                </p>
                <p className="text-gray-800 font-semibold">
                  {type === "purchase" ? item.orderid : item.rentalid}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Status</p>
                <StatusBadge status={item.status} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Product Name</p>
                <p className="text-gray-800 font-semibold">
                  {item.productName}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Quantity</p>
                <p className="text-gray-800 font-semibold">{item.quantity}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">
                  {type === "purchase" ? "Order Date" : "Rental Date"}
                </p>
                <p className="text-gray-800 font-semibold">
                  {formatDate(
                    type === "purchase" ? item.orderdate : item.rentdate
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">
                  {type === "purchase" ? "Order Amount" : "Rental Amount"}
                </p>
                <p className="text-emerald-700 font-semibold">
                  ₹
                  {type === "purchase"
                    ? item.orderamount.toFixed(2)
                    : item.totalrentamount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8 mt-4">
        <div className="bg-white rounded-full shadow-lg p-1.5 flex space-x-2">
          <button
            onClick={() => setActiveTab("purchases")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === "purchases"
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-green-100"
            }`}
          >
            <ShoppingCart className="inline-block mr-2 -mt-1" size={18} />
            Purchases
          </button>
          <button
            onClick={() => setActiveTab("rentals")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === "rentals"
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-green-100"
            }`}
          >
            <Repeat className="inline-block mr-2 -mt-1" size={18} />
            Rentals
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "purchases"
            ? purchase.map((order) => (
                <div
                  key={order.orderid}
                  className="bg-white border border-green-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-4 border-b border-green-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="text-green-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">
                          Order #{order.orderid}
                        </h2>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                        <Package className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Product</p>
                        <h3 className="font-semibold text-gray-800">
                          {order.productName}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 border-t pt-3 border-green-200">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-green-500" size={16} />
                          <span className="text-sm text-gray-600">
                            {formatDate(order.orderdate)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-emerald-700">
                            ₹{order.orderamount}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="text-green-500" size={16} />
                          <span className="text-sm text-gray-600">
                            {order.username}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="text-green-500" size={16} />
                          <span className="text-sm text-gray-600">
                            {order.usermobile}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-3 border-green-200">
                      <button
                        onClick={() =>
                          setSelectedItem({ ...order, type: "purchase" })
                        }
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : rentals.map((rental) => (
                <div
                  key={rental.rentalid}
                  className="bg-white border border-green-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-4 border-b border-green-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Repeat className="text-green-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">
                          Rental #{rental.rentalid}
                        </h2>
                      </div>
                      <StatusBadge status={rental.status} />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                        <Package className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Product</p>
                        <h3 className="font-semibold text-gray-800">
                          {rental.productName}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 border-t pt-3 border-green-200">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-green-500" size={16} />
                          <span className="text-sm text-gray-600">
                            {formatDate(rental.rentdate)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-emerald-700">
                            ₹{rental.totalrentamount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="text-green-500" size={16} />
                          <span className="text-sm text-gray-600">
                            {rental.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="text-green-500" size={16} />
                          <span className="text-sm text-gray-600">
                            {rental.usermobile}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-3 border-green-200">
                      <button
                        onClick={() => setSelectedItem({ ...rental, purchase })}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          type={selectedItem.type}
        />
      )}
    </div>
  );
};

export default Orders;
