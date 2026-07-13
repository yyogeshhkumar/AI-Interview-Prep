import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import toast from "react-hot-toast";

const CARD_THEMES = [
  { bg: "bg-emerald-50", glow: "rgba(16,185,129,0.22)" },
  { bg: "bg-sky-50", glow: "rgba(56,189,248,0.22)" },
  { bg: "bg-teal-50", glow: "rgba(20,184,166,0.22)" },
  { bg: "bg-lime-50", glow: "rgba(163,230,53,0.22)" },
  { bg: "bg-cyan-50", glow: "rgba(34,211,238,0.22)" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const sessionsData =
        response.data.sessions || response.data.data || response.data || [];
      setSessions(sessionsData);
    } catch {
      setSessions([]);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch {}
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      {/* 🌤 Very light baby-green page background */}
      <div className="absolute inset-0 -z-10 bg-[#F7FCF9]" />

      {/* 🎨 Typography clarity for cards (scoped & safe) */}
      <style>
        {`
          .summary-card h3 {
            font-weight: 600;
            font-size: 1.05rem;
            color: #111827; /* gray-900 */
            letter-spacing: -0.01em;
          }

          .summary-card p {
            color: #374151; /* gray-700 */
            line-height: 1.6;
            font-size: 0.95rem;
          }

          .summary-card .meta {
            color: #4B5563; /* gray-600 */
            font-size: 0.85rem;
            font-weight: 500;
          }
        `}
      </style>

      <div className="container mx-auto pt-8 pb-8 relative animate-fadeInUp">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 px-4 md:px-0">
          {(sessions || []).map((data, index) => {
            const theme = CARD_THEMES[index % CARD_THEMES.length];

            return (
              <div
                key={data._id}
                className={`
                  relative rounded-3xl
                  ${theme.bg}
                  p-1
                  transition-all duration-300
                  hover:-translate-y-2
                `}
                style={{
                  boxShadow: `0 16px 36px -14px ${theme.glow}`,
                }}
              >
                {/* Card shell */}
                <div className="summary-card bg-white/70 backdrop-blur-xl rounded-[22px] p-7">
                  <SummaryCard
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data.role || ""}
                    topicsToFocus={data.topicsToFocus || ""}
                    experience={data.experience || "--"}
                    questions={data.questions?.length || "--"}
                    description={data.description || ""}
                    lastUpdated={
                      data.updatedAt
                        ? moment(data.updatedAt).format("Do MMM YYYY")
                        : ""
                    }
                    onSelect={() => navigate(`/interview-prep/${data._id}`)}
                    onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ➕ Floating Add Button */}
        <button
          className="
            h-12 flex items-center justify-center gap-3
            bg-gradient-to-r from-emerald-400 to-sky-400
            text-sm font-semibold text-white
            px-8 py-3 rounded-full
            fixed bottom-10 md:bottom-20 right-10 md:right-20
            transition-all duration-300
            hover:scale-110
            hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.6)]
            active:scale-95
          "
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl" />
          Add New
        </button>
      </div>

      {/* Modals */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm
          onSuccess={() => {
            fetchAllSessions();
            setOpenCreateModal(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure about deleting this session?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
