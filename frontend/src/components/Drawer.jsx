import React from "react";
import { LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import SpinnerLoader from "./Loader/SpinnerLoader";

const Drawer = ({ isOpen, onClose, title, children, isLoading = false }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop – VERY subtle blur */}
          <motion.div
            className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="
              fixed top-[64px] right-0 z-40
              h-[calc(100dvh-64px)]
              w-full md:w-[42vw]
              bg-[#F5F3FF]
              shadow-2xl
              flex flex-col
              border-l border-violet-200
              rounded-l-3xl
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-violet-200 bg-violet-100/60 rounded-tl-3xl">
              <h3 className="text-base font-semibold text-violet-900">
                {title || "Details"}
              </h3>

              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-violet-200/60 transition"
              >
                <LuX className="text-lg text-violet-700" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <SpinnerLoader />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
