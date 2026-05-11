import React, { useState } from "react";
import { Marketplace } from "../Pages/Marketplace";

const Layout = () => {
    const [activePage, setActivePage] = useState("Home");

    // Function to dynamically render body content based on activePage
    const renderBodyContent = () => {
        switch (activePage) {
            case "Home":
                return <p className="text-center text-lg">Welcome to the Home Page of KRISHIMANDAL!</p>;
            case "Jobs":
                return <p className="text-center text-lg">Explore agricultural job opportunities here.</p>;
            case "Marketplace":
                return <Marketplace />
            case "Community":
                return (
                    <p className="text-center text-lg">
                        Join the Community and connect with fellow farmers and experts.
                    </p>
                );
            case "Money":
                return (
                    <p className="text-center text-lg">
                        Manage your finances and agricultural investments on the Money page.
                    </p>
                );
            case "Insights and Guidance":
                return <p className="text-center text-lg">Reach out to KRISHIMANDAL for any inquiries or support.</p>;
            default:
                return <p className="text-center text-lg">404 - Page not found.</p>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            {/* <Header setActivePage={setActivePage} /> */}

            {/* Body */}
            <main className="flex-grow p-6 bg-gray-100">{renderBodyContent()}</main>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;