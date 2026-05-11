import React, { useState } from 'react';
import Weather from './Weather';
import MandiPrice from './MandiPrice';
import SchemeSubsidies from './SchemeSubsidies';
import Guidance from './Guidance';
import ChatbotAI from './ChatbotAI';

function Insights() {
    const [activeTab, setActiveTab] = useState('Agricultural Schemes & Subsidies'); // Default tab
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot((prev) => !prev);
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'MandiPrice':
                return <MandiPrice />;
            case 'Weather':
                return <Weather />;
            case 'Agricultural Schemes & Subsidies':
                return <SchemeSubsidies />;
            case 'Cultivation Guides':
                return <Guidance />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-4 border-b-2 border-gray-300 pb-2">
                {['Agricultural Schemes & Subsidies', 'Weather', 'Cultivation Guides', 'MandiPrice'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-lg font-medium ${activeTab === tab
                            ? 'border-b-2 border-green-800 text-green-800'
                            : 'text-gray-600 hover:text-green-700'
                            }`}
                    >
                        {tab.replace(/([A-Z])/g, ' $1').trim()} {/* Formats tab names */}
                    </button>
                ))}
            </div>

            {/* Active Tab Content */}
            <div className="mt-4">
                {renderActiveTab()}
            </div>

            {/* Floating Circular Support Icon with Tooltip Message */}
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    className="bg-green-800 text-white p-4 rounded-full shadow-xl transform hover:scale-110 transition duration-300 focus:outline-none flex items-center justify-center animate-bounce relative w-16 h-16 hover:bg-green-700"
                    onClick={toggleChatbot}
                    aria-label="Support Chat Toggle"
                >
                    {/* Support Icon */}
                    <span className="material-symbols-outlined text-white text-3xl">
                        support_agent
                    </span>
                </button>
            </div>

            {/* Chatbot Modal */}
            {showChatbot && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                            onClick={toggleChatbot}
                            aria-label="Close Chat Support"
                        >
                            X
                        </button>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Ask your questions</h2>
                        <ChatbotAI />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Insights;