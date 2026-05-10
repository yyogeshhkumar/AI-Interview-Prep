import React, { useState, useContext } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuCheck } from "react-icons/lu";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* 🌿 Soft Baby Green Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="w-[520px] h-[520px] bg-emerald-300/25 blur-[140px] rounded-full absolute top-[-120px] left-[-120px]" />
        <div className="w-[420px] h-[420px] bg-teal-300/20 blur-[140px] rounded-full absolute bottom-[10%] right-[-120px]" />
      </div>

      <div className="w-full min-h-full bg-[#F3FBF6] relative">
        {/* Header */}
        <header className="flex justify-between items-center px-6 md:px-12 pt-6 mb-20 relative z-20">
          <div className="text-xl font-extrabold tracking-tight text-gray-900">
            Prepare Interviews with AI
          </div>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="
                bg-gradient-to-r from-sky-300 to-cyan-300
                text-sm font-semibold text-white
                px-7 py-2.5 rounded-full
                transition-all duration-300
                hover:scale-105
                hover:shadow-[0_12px_35px_-10px_rgba(56,189,248,0.65)]
                active:scale-95
              "
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 px-6 md:px-12 pb-36">
          {/* LEFT */}
          <div className="w-full md:w-1/2 animate-fadeInUp">
            <div
              className="
                inline-flex items-center gap-2
                text-[13px] font-semibold
                text-emerald-800
                bg-emerald-100
                px-3 py-1 rounded-full
                border border-emerald-300
                mb-4
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:bg-emerald-200
                hover:shadow-[0_8px_20px_-6px_rgba(16,185,129,0.6)]
                group
              "
            >
              <LuSparkles className="transition-transform duration-300 group-hover:rotate-12" />
              AI Powered
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Ace Interviews with <br />
              <span
                className="
                  text-transparent bg-clip-text
                  bg-[radial-gradient(circle,_#065F46_0%,_#34D399_100%)]
                  bg-[length:200%_200%]
                  animate-text-shine
                  font-extrabold
                "
              >
                AI-Powered
              </span>{" "}
              Learning
            </h1>

            <p className="text-[17px] text-gray-700 max-w-xl mb-8">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts, and organize everything your way.
            </p>

            <button
              onClick={handleCTA}
              className="
                bg-gray-900 text-white
                px-8 py-3 rounded-full text-sm font-semibold
                transition-all duration-300
                hover:bg-emerald-100 hover:text-gray-900
                hover:shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)]
                hover:scale-105
                active:scale-95
              "
            >
              Get Started
            </button>
          </div>

          {/* RIGHT PARAGRAPH BLOCK */}
          <div className="w-full md:w-1/2 animate-fadeInUp delay-200">
            <div
              className="
                bg-emerald-50/70
                backdrop-blur-xl
                border border-emerald-200
                rounded-2xl p-8
                shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)]
                transition-all duration-300
                hover:shadow-[0_25px_70px_-15px_rgba(16,185,129,0.45)]
              "
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                What you get instantly
              </h3>

              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "AI-generated interview questions",
                  "Expandable answers with explanations",
                  "Role & experience based sessions",
                  "Organized prep dashboard",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <LuCheck className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="flex justify-center -mt-24 mb-28 animate-float">
          <img
            src={HERO_IMG}
            alt="Hero"
            className="
              w-[80vw] rounded-xl
              shadow-lg
              transition-all duration-500
              hover:shadow-[0_30px_80px_-20px_rgba(16,185,129,0.5)]
            "
          />
        </section>

        {/* FEATURES — NOW BABY GREEN (NOT WHITE) */}
        <section className="bg-[#F3FBF6] pt-10 pb-24">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold text-center mb-14 text-gray-900">
              Top Tier Features To Shine Preparation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="
                    bg-emerald-50/80
                    backdrop-blur-lg
                    p-6 rounded-xl
                    border border-emerald-200
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_18px_45px_-15px_rgba(16,185,129,0.4)]
                  "
                >
                  <h3 className="text-base font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="
                    bg-emerald-50/80
                    backdrop-blur-lg
                    p-6 rounded-xl
                    border border-emerald-200
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_18px_45px_-15px_rgba(16,185,129,0.4)]
                  "
                >
                  <h3 className="text-base font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  );
};

export default LandingPage;
