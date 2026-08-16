import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

export default function NgoRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: "Education",
      priority: "Medium",
    },
  });

  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  const onSubmit = async (data) => {
    setServerMessage({ type: "", text: "" });

    try {
      // Send data to backend endpoint (e.g., /requests)
      const response = await api.post("/requests", data);
      console.log("Response from server:", response.data);

      setServerMessage({
        type: "success",
        text: "Request submitted successfully to backend!",
      });
      reset(); // Reset form values after success
    } catch (error) {
      console.error("API Error:", error);
      setServerMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to submit request. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Request Assistance
      </h2>

      {/* Success / Error Feedback Banner */}
      {serverMessage.text && (
        <div
          className={`p-3 mb-4 text-sm rounded ${
            serverMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {serverMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            {...register("category")}
          >
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Food & Shelter">Food & Shelter</option>
            <option value="Disaster Relief">Disaster Relief</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows="3"
            className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("description", {
              required: "Please describe the request",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Priority Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority Level
          </label>
          <select
            className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            {...register("priority")}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}