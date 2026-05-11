import React, { useState } from "react";

function ChatbotAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyAlBAQaoME2A5-LWADyi3N93HljhtSpmN4";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  const fetchChatbotAI = async () => {
    setLoading(true);
    setAnswer("");

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `${question}\nPlease provide a response in around 100 words.`,
            },
          ],
        },
      ],
    };

    fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.candidates && data.candidates.length > 0) {
          console.log("Success");
          setAnswer(
            data.candidates[0].content.parts[0].text || "No response available"
          );
        } else {
          setAnswer("Please check the input or try again later.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setAnswer("An error occurred. Please try again later.");
        setLoading(false);
      });
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === "") {
      setAnswer("Please enter a question.");
      return;
    }
    fetchChatbotAI();
  };

  return (
    <div className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">Chatbot AI</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Your Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ask me anything..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Loading..." : "Get Answer"}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-medium text-gray-900">Answer</h2>
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ChatbotAI;
