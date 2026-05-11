import React, { useState, useEffect } from "react";

function Community() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [error, setError] = useState(null);

  const api =
    "https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/Community.json";

  // Fetch messages from the API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.Community && Array.isArray(data.Community)) {
          const formattedMessages = data.Community.map((item, index) => ({
            id: index + 1,
            name: item.name || "Anonymous",
            text: item.comment || "No comment provided",
          }));
          setMessages(formattedMessages);
        } else {
          throw new Error("Unexpected data structure");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Could not load messages. Please try again later.");
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        name: "Farmer John",
        text: inputMessage,
      };
      setMessages([...messages, newMessage]); // Add new message to the existing messages
      setInputMessage(""); // Clear the input field
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-green-50 rounded-lg shadow-lg">
      {/* Form for adding comments */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Share your thoughts or tips..."
            className="border border-green-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm bg-green-100"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Display error if fetch fails */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display messages */}
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white border border-green-200 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-3 gap-2">
              <i className="fas fa-user-circle text-2xl"></i>
              <span className="font-bold text-sm text-green-800">
                {message.name}
              </span>
            </div>
            <p className="text-gray-800 text-xl">{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
