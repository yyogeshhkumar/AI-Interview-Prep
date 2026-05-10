import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Home/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      < >
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interview-prep/:sessionId"
            element={<InterviewPrep />}
          />
        </Routes>

        <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
      </>
    </UserProvider>
  );
};

export default App;
