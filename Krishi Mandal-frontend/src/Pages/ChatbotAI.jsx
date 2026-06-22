import { useState } from "react";

function ChatbotAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Read API key from Vite env. Keep in mind: putting keys in frontend
  // exposes them to clients. For production, use a server-side proxy.
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.5-flash";
  const API_URL = API_KEY
    ? `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`
    : null;

  // For debugging: mask the API key so we don't print it fully to the UI/console.
  const maskKey = (k) => {
    if (!k) return null;
    if (k.length <= 8) return k.replace(/.(?=.{2})/g, "*");
    return `${k.slice(0, 4)}...${k.slice(-4)}`;
  };

  const fetchChatbotAI = async () => {
    setLoading(true);
    setAnswer("");

    if (!API_URL) {
      setAnswer(
        "Missing API key configuration. Please add VITE_GEMINI_API_KEY to your .env file and restart the dev server. See /GET_API_KEY.md for instructions."
      );
      setLoading(false);
      return;
    }

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

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const text = await resp.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        // non-json response - ignore parse error
      }

      if (!resp.ok) {
        const message = (data && (data.error?.message || data.message)) || text || resp.statusText;
        console.error("API error:", resp.status, message);
        setAnswer(`API error ${resp.status}: ${message}`);
        setLoading(false);
        return;
      }

      if (data?.candidates && data.candidates.length > 0) {
        setAnswer(
          data.candidates[0]?.content?.parts[0]?.text || "No response available"
        );
      } else {
        // Provide more helpful diagnostic information if there is no candidate
        setAnswer(
          "No answer returned by the model. Response: " +
            (text ? text.slice(0, 1000) : "(empty response)")
        );
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      setAnswer("Network error: " + (error?.message || String(error)));
    } finally {
      setLoading(false);
    }
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
      {import.meta.env.DEV && (
        <p className="text-xs text-center text-gray-500">
          {API_KEY
            ? `Gemini API key present for model ${GEMINI_MODEL} (masked): ${maskKey(API_KEY)}`
            : "No Gemini API key found in environment"}
        </p>
      )}
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
          <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ChatbotAI;
