import React, { useState } from "react";
import { toast } from "sonner";
import Button from "../components/ButtonComponents";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    // Send form data to backend API here
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Have a question, suggestion, or need support? Reach out to us and
          we’ll get back to you promptly.
        </p>
      </section>

      {/* Form Section */}
      <section className="flex justify-center items-center flex-1 px-4 md:px-6 mt-12 mb-5">
        <div className="bg-black shadow-lg rounded-xl p-10 w-full max-w-2xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-2 font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="mb-2 font-semibold text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded-lg shadow-md transition"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
