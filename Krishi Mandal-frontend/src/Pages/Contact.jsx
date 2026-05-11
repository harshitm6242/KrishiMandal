import React, { useState } from "react";

const ContactForm = () => {
  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // State to manage submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    success: false,
    error: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone number validation (simple check for 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset submission status
    setSubmissionStatus({
      isSubmitting: false,
      success: false,
      error: null,
    });

    // Validate form
    if (validateForm()) {
      // Set submitting state
      setSubmissionStatus((prev) => ({ ...prev, isSubmitting: true }));

      try {
        // Simulate API call to send email and save contact form data
        const response = await sendContactFormEmail(formData);

        // Handle successful submission
        setSubmissionStatus({
          isSubmitting: false,
          success: true,
          error: null,
        });

        // Reset form fields
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          message: "",
        });
      } catch (error) {
        // Handle submission error
        setSubmissionStatus({
          isSubmitting: false,
          success: false,
          error: error.message || "Failed to submit form. Please try again.",
        });
      }
    }
  };

  // Function to send contact form email (would be implemented on backend)
  const sendContactFormEmail = async (formData) => {
    // This is a placeholder for actual backend API call
    // In a real-world scenario, you would:
    // 1. Send this data to your backend service
    // 2. Backend would:
    //    - Validate the data again
    //    - Send an acknowledgment email to the user
    //    - Save the contact form submission to a database
    //    - Potentially notify your support team
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    return response.json();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

      {submissionStatus.error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {submissionStatus.error}
        </div>
      )}
      {submissionStatus.success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          Thank you for your message! We will get back to you within 24-48
          working hours.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={submissionStatus.isSubmitting}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${
              submissionStatus.isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={submissionStatus.isSubmitting}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phoneNumber
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${
              submissionStatus.isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            placeholder="10-digit Phone Number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={submissionStatus.isSubmitting}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${
              submissionStatus.isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={submissionStatus.isSubmitting}
            rows="4"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${
              submissionStatus.isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            placeholder="Your message..."
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={submissionStatus.isSubmitting}
            className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
              submissionStatus.isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {submissionStatus.isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
