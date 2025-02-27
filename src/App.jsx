import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/dashboardnull";
import SurveyCreation from "./pages/createsurvey";
import QuestionModal from "./pages/QuestionModal";
import DashboardCreated from "./pages/dashboard";
import AssetsDict from "./pages/assets";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<DashboardLayout />} /> */}
        <Route path="/" element={<DashboardCreated />} />
        <Route path="/create-new" element={<SurveyCreation />} />
        <Route path="/templates" element={<AssetsDict />} />
        <Route path="/create-survey" element={<SurveyCreation />} /> 
        <Route path="/question-modal" element={<QuestionModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

