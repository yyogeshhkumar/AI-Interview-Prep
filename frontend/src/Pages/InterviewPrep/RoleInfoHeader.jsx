import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div
      className="
        relative bg-[#F0F8F4]
        transition-all duration-300 ease-out
        hover:bg-[#EAF6F1]
      "
    >
      <div className="container mx-auto px-6 md:px-0 relative">
        {/* Main Content */}
        <div
          className="
            h-[200px]
            flex flex-col justify-center
            relative z-10
            transition-transform duration-300
            hover:-translate-y-[1px]
          "
        >
          {/* Role & Topics */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-emerald-900 tracking-tight">
              {role}
            </h2>

            <p className="text-sm md:text-[15px] text-emerald-700 mt-2 max-w-3xl leading-relaxed">
              {topicsToFocus}
            </p>
          </div>

          {/* Meta Pills */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <div className="text-[11px] font-semibold text-emerald-900 bg-emerald-200 px-3 py-1.5 rounded-full">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </div>

            <div className="text-[11px] font-semibold text-sky-900 bg-sky-200 px-3 py-1.5 rounded-full">
              {questions} Q&amp;A
            </div>

            <div className="text-[11px] font-semibold text-violet-900 bg-violet-200 px-3 py-1.5 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        {/* Decorative Blob Section */}
        <div className="w-[40px] md:w-[30vw] h-[200px] flex items-center justify-center overflow-hidden absolute top-0 right-0 pointer-events-none">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animateblob1">
            <div className="w-16 h-16 bg-teal-400 blur-[65px] animateblob2">
              <div className="w-16 h-16 bg-cyan-300 blur-[45px] animateblob3">
                <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animateblob1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
