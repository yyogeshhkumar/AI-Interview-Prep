import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const profileImage = user?.profileImageUrl
    ? user.profileImageUrl.startsWith("http")
      ? user.profileImageUrl
      : `${import.meta.env.VITE_API_URL}${user.profileImageUrl}`
    : "/default-avatar.png";

  return (
    <div className="flex items-center gap-3">
      <img
        src={profileImage}
        alt="Profile"
        className="w-11 h-11 rounded-full object-cover bg-gray-300"
        onError={(e) => {
          e.target.src = "/default-avatar.png";
        }}
      />

      <div>
        <div className="text-[15px] font-bold text-black leading-4">
          {user?.name || ""}
        </div>
        <button
          onClick={handleLogout}
          className="text-amber-600 text-sm font-semibold hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
