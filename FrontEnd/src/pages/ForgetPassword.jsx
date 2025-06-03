import { useState } from "react";
import Button from "../components/ButtonComponents";
import { GoArrowRight } from "react-icons/go";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is Required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid Email!";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Verify Successful!");
    }
  };
  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-600 to-purple-600 h-screen items-center">
      <div className="inline-flex items-center shadow-2xl p-15 max-h-110 rounded-md bg-gradient-to-r from-blue-700 to-purple-700">
        <div className="w-[300px] space-y-10 space-x-10">
          <h1 className="text-2xl">Forget Password</h1>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div className="flex flex-col">
              <label htmlFor="email">Verify Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none focus:border-b-2 focus:bg-blue-600 "
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <span className="text-red-400 text-[12px]">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col justify-center items-end gap-2 ">
              <Button
                type="submit"
                className="border hover:border-l-transparent hover:border-r-transparent hover:border-t-transparent hover:shadow-xl hover:border-pink-600 flex items-center"
              >
                Verify
                <GoArrowRight className="text-xl pt-1" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
