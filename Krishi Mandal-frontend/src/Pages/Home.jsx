import React from "react";
import { Link } from "react-router-dom";
import Problems from "./FeaturesShowcase";

const HeroSection = () => (
  <div
    className="relative h-[100vh] bg-fixed bg-center bg-cover"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/849403/pexels-photo-849403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    }}
  >
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
        KRISHI MANDAL
      </h1>
      <p className="text-xl sm:text-2xl lg:text-3xl mb-6 max-w-2xl mx-auto">
        Transforming Agriculture through Collaboration, Innovation, and
        Technology
      </p>
    </div>
  </div>
);

const VisionMissionSection = () => (
  <div
    className="relative h-[100vh] bg-fixed bg-center bg-cover py-20"
    style={{
      backgroundImage:
        "url('https://t4.ftcdn.net/jpg/05/89/16/93/360_F_589169303_Lt2dvumkjJRaNQhwEhCkPCqRXjuOqjdA.jpg')",
    }}
  >
    <div className="absolute inset-0 bg-black/60"></div>
    <div className="relative z-10 text-center text-white px-6">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
        Our Vision & Mission
      </h2>
      <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto">
        To empower the Agricultural Community through a Unified Platform that
        enhances Productivity, Sustainability, and Profitability through
        Collaboration, Innovation, and Technology.
      </p>
      <div className="bg-white text-center p-6 rounded-lg shadow-lg text-black max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
        <p className="text-lg">
          We strive to build a sustainable agricultural ecosystem that will
          empower farmers and stakeholders, fostering innovation, and driving
          agricultural growth through advanced technology.
        </p>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ icon, title, description, link }) => (
  <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 transition-all flex flex-col items-center justify-center h-[250px] w-full">
    <div className="text-green-500 text-4xl sm:text-5xl mb-3">
      <i className={`fas ${icon}`}></i>
    </div>
    <h3 className="text-lg sm:text-xl font-bold mb-3">{title}</h3>
    <p className="text-center text-base sm:text-lg">{description}</p>
    <Link
      to={link}
      className="mt-4 text-green-500 hover:text-green-600 font-semibold text-base sm:text-lg py-2 px-6 border-2 border-green-500 rounded-lg transition-all"
    >
      Learn More
    </Link>
  </div>
);

const ServicesSection = () => (
  <div className="py-12" id="services">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          icon="fa-store"
          title="Marketplace"
          description="Buy and sell fresh produce, agricultural tools, and more."
          link="/marketplace"
        />
        <ServiceCard
          icon="fa-briefcase"
          title="Jobs"
          description="Find agricultural jobs and opportunities."
          link="/jobs"
        />
        <ServiceCard
          icon="fa-users"
          title="Community"
          description="Engage with fellow farmers and share knowledge."
          link="/community"
        />
        <ServiceCard
          icon="fa-globe"
          title="भू Mandal"
          description="Collaborate, rent, or borrow land with other farmers."
          link="/bhooMandal"
        />
        <ServiceCard
          icon="fa-lightbulb"
          title="Agriculture Insights and Guidance"
          description="Get expert insights and guidance on best farming practices."
          link="/insights"
        />
        <ServiceCard
          icon="fa-piggy-bank"
          title="Money (Investment)"
          description="Explore investment opportunities in agriculture."
          link="/money"
        />
      </div>
    </div>
  </div>
);

const AboutUsSection = () => (
  <div className="py-12 bg-gray-100">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Us</h2>
      <p className="text-lg sm:text-xl max-w-3xl mx-auto">
        KrishiMandal is a comprehensive platform designed to transform
        agriculture by providing a unified platform that enhances productivity,
        sustainability, and profitability through collaboration, innovation, and
        technology. KrishiMandal brings various stakeholders on a single digital
        platform, enabling seamless sharing of resources, market access,
        financial empowerment, and knowledge sharing. It is a transformative
        platform designed to revolutionize the agricultural sector. By
        integrating advanced technology, creating a unified platform for all
        stakeholders, and fostering a community-driven approach, we aim to drive
        sustainable growth and innovation in agriculture.
      </p>
    </div>
  </div>
);

const Home = () => (
  <div>
    <HeroSection />
    <ServicesSection />
    <VisionMissionSection />
    <Problems />
    <AboutUsSection />
  </div>
);

export default Home;
