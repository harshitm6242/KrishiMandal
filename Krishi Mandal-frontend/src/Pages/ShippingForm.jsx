import React, { useState, useEffect } from "react";

export default function ShippingForm({ product, mode, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [duration, setDuration] = useState(0);
  const [paymentMode, setPaymentMode] = useState("cash");
  const [quantity, setQuantity] = useState(product?.unitValue || 1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [upiId, setUpiId] = useState(""); // State for UPI ID
  const [convience, setConvience] = useState(2);

  // Use the product price directly passed from ProductList
  const unitPrice = parseFloat(product?.price) || 100;
  const user = localStorage.getItem("id");
  useEffect(() => {
    if (quantity > 0 && unitPrice > 0) {
      const updatedConvience = 2 * quantity;
      setConvience(updatedConvience);
      const baseAmount = updatedConvience + unitPrice * quantity;

      const calculatedAmount =
        mode === "borrow" ? baseAmount + updatedConvience : baseAmount;
      setTotalAmount(calculatedAmount);
    } else {
      setTotalAmount(unitPrice);
    }
  }, [quantity, duration, mode, unitPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    purchase();
    const formData = {
      product,
      address,
      name,
      email,
      contactNumber,
      duration,
      paymentMode,
      totalAmount,
      quantity,
    };

    if (paymentMode === "upi") {
      formData.upiId = upiId; // Add UPI ID to formData if UPI is selected
    }

    onSubmit(formData);
  };
  const purchase = async () => {
    // e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2004/KrishiMandal/PurchaseServlet",
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials like cookies if necessary
          body: JSON.stringify({
            name: name,
            address: address,
            email: email,
            contactNumber: contactNumber,
            duration: duration,
            paymentMode: paymentMode,
            totalAmount: totalAmount,
            upiId: upiId,
            quantity: quantity,
            user: user,
          }), // Include the request body
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          console.log(user);
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //   if (response.ok) {
      //     const result = await response.json();
      //     setResponseMessage(result.message); // Display servlet response
      //   } else {
      //     setResponseMessage("Error: Unable to send data");
      //   }
    } catch (error) {
      alert("Input Valid Data");
      console.log("Error:", error);
      setResponseMessage("Error: Something went wrong");
    }
    //console.log(formData);
    //Handle form submission logic here
  };

  return (
    <div className="fixed mt-10 top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-11/12 lg:w-10/12 xl:w-8/12">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Order {mode === "borrow" ? "Borrow" : "Purchase"} Details
        </h3>
        <div className="flex space-x-8">
          <div className="flex-1">
            <h4 className="text-xl font-semibold mb-2">Product Details</h4>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <img
                  src={product.img || "https://placehold.co/150"}
                  alt={`Image of ${product.name}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-green-600 font-bold">
                  {unitPrice} {mode === "borrow" && "/day"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                value={name}
                onChange={setName}
                required
              />
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />
              <InputField
                label="Contact Number"
                value={contactNumber}
                onChange={setContactNumber}
                required
              />
              <TextAreaField
                label="Address"
                value={address}
                onChange={setAddress}
                required
              />

              {mode === "borrow" && (
                <InputField
                  label="Duration (in days)"
                  type="number"
                  value={duration}
                  onChange={(value) => setDuration(Math.max(1, Number(value)))}
                  min={1}
                  required
                />
              )}

              <InputField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(value) => setQuantity(Math.max(1, Number(value)))}
                min={1}
                max={12}
                required
              />

              <PaymentMethod
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
              />

              {/* Conditionally render UPI ID field if UPI is selected */}
              {paymentMode === "upi" && (
                <InputField
                  label="Enter UPI ID"
                  value={upiId}
                  onChange={setUpiId}
                  required
                />
              )}
              <div>Convience Fee ₹{convience}</div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Amount</label>
                <p className="text-xl font-bold">{`${totalAmount}`}</p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  min = 0,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, required = false }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

function PaymentMethod({ paymentMode, setPaymentMode }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">Payment Method</label>
      <select
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
      >
        <option value="cash">Cash on Delivery</option>
        <option value="upi">UPI</option>
      </select>
    </div>
  );
}
