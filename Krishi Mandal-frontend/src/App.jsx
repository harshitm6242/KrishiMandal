import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Marketplace from "./Pages/Marketplace";
import Community from "./Pages/Community";
import Insights from "./Pages/Insights";
import BhooMandal from "./Pages/BhooMandal";
import Listings from "./Pages/Listings";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ScrollToTop from "./Pages/ScrollToTop";
import Orders from "./Pages/Orders";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import ComparisonTable from "./Components/ComparisonTable";
// import FarmPlanning from "./Components/FarmerPlanning";
import Suggestion from "./Pages/Suggestion";
import "./App.css";
import "./index.css";
import MyApplications from "./Pages/MyApplications";
//import { Contact } from "lucide-react";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const location = useLocation();

  // Update activePage state based on the current route
  useEffect(() => {
    const currentPath =
      location.pathname === "/" ? "Home" : location.pathname.slice(1);
    setActivePage(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
  }, [location]);

  return (
    <>
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="min-h-screen">
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/community" element={<Community />} />
            <Route path="/bhooMandal" element={<BhooMandal />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/applications" element={<MyApplications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="compare" element={<ComparisonTable />} />
            {/* <Route path="/cropPlanning" element={<FarmPlanning />} /> */}
            <Route path="/suggestion" element={<Suggestion />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
