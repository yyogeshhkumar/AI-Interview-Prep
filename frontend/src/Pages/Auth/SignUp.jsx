import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) return setError("Please enter full name.");
    if (!validateEmail(email)) return setError("Please enter valid email.");
    if (!password) return setError("Please enter password.");

    setError(null);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl =
          imgUploadRes.imageUrl?.replace("import.meta.env.VITE_API_URL", "") || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        updateUser({ ...user, token });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Signup error:", err.response?.data);
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div
      className="w-[92vw] md:w-[380px] bg-white rounded-2xl p-8
                 shadow-xl animate-fadeInUp
                 transition-all duration-500 ease-out
                 hover:shadow-[0_20px_60px_-15px_rgba(250,204,21,0.45)]"
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h3
          className="text-2xl font-bold text-gray-900
                     transition-all duration-300
                     hover:text-yellow-500"
        >
          Create an Account
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Join us today by entering your details below
        </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Profile Image */}
        <div
          className="flex justify-center transition-all duration-300
                     hover:scale-[1.05]"
        >
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        {/* Full Name */}
        <div
          className="transition-all duration-300
                     hover:scale-[1.01]
                     focus-within:scale-[1.02]
                     focus-within:drop-shadow-[0_0_12px_rgba(250,204,21,0.45)]"
        >
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="ex- Abc"
          />
        </div>

        {/* Email */}
        <div
          className="transition-all duration-300
                     hover:scale-[1.01]
                     focus-within:scale-[1.02]
                     focus-within:drop-shadow-[0_0_12px_rgba(250,204,21,0.45)]"
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="ex- abc@example.com"
          />
        </div>

        {/* Password */}
        <div
          className="transition-all duration-300
                     hover:scale-[1.01]
                     focus-within:scale-[1.02]
                     focus-within:drop-shadow-[0_0_12px_rgba(250,204,21,0.45)]"
        >
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="Minimum 8 characters"
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="text-xs text-red-600 bg-red-50
                       border border-red-200 rounded-lg px-3 py-2
                       animate-shake"
          >
            {error}
          </div>
        )}

        {/* SIGN UP Button – Yellow Premium */}
        <button
          type="submit"
          className="w-full h-11 rounded-xl
                     bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400
                     text-black text-sm font-bold
                     transition-all duration-300 ease-out
                     hover:scale-[1.04]
                     hover:shadow-[0_14px_40px_-10px_rgba(250,204,21,0.75)]
                     active:scale-[0.97]"
        >
          SIGN UP
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 pt-2">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-yellow-500
                       transition-all duration-300
                       hover:text-yellow-600
                       hover:underline
                       hover:drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
