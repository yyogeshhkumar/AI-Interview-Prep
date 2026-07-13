import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        w-[90vw] md:w-[36vw]
        p-8
        flex flex-col justify-center
        bg-white
        rounded-2xl
        shadow-lg
        animate-fadeInUp
        transition-all duration-500 ease-out
        hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.45)]
      "
    >
      {/* Header */}
      <h3
        className="
          text-xl font-semibold text-gray-900
          tracking-wide
          transition-colors duration-300
        "
      >
        Start a New Interview Journey
      </h3>

      <p className="text-xs text-slate-600 mt-2 mb-6 leading-relaxed">
        Fill out a few quick details and unlock your personalized set of
        interview questions.
      </p>

      {/* Form */}
      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        {/* Role */}
        <div
          className="
            transition-all duration-300
            hover:scale-[1.01]
            focus-within:scale-[1.02]
            focus-within:drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]
          "
        >
          <Input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Target Role"
            placeholder="Frontend Developer, UI/UX Designer, etc."
            type="text"
          />
        </div>

        {/* Experience */}
        <div
          className="
            transition-all duration-300
            hover:scale-[1.01]
            focus-within:scale-[1.02]
            focus-within:drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]
          "
        >
          <Input
            value={formData.experience}
            onChange={({ target }) => handleChange("experience", target.value)}
            label="Years of Experience"
            placeholder="1, 3, 5+"
            type="number"
          />
        </div>

        {/* Topics */}
        <div
          className="
            transition-all duration-300
            hover:scale-[1.01]
            focus-within:scale-[1.02]
            focus-within:drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]
          "
        >
          <Input
            value={formData.topicsToFocus}
            onChange={({ target }) =>
              handleChange("topicsToFocus", target.value)
            }
            label="Topics to Focus On"
            placeholder="React, Node.js, MongoDB"
            type="text"
          />
        </div>

        {/* Description */}
        <div
          className="
            transition-all duration-300
            hover:scale-[1.01]
            focus-within:scale-[1.02]
            focus-within:drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]
          "
        >
          <Input
            value={formData.description}
            onChange={({ target }) => handleChange("description", target.value)}
            label="Description (Optional)"
            placeholder="Any specific goals or notes"
            type="text"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs mt-2 animate-shake">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            mt-4 w-full py-2 rounded-lg
            font-semibold text-white
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            transition-all duration-300 ease-out
            hover:scale-[1.03]
            hover:shadow-[0_12px_35px_-8px_rgba(236,72,153,0.6)]
            active:scale-[0.98]
            disabled:opacity-70
          "
        >
          {isLoading ? <SpinnerLoader /> : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
