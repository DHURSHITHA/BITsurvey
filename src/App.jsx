import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/dashboardnull";
import SurveyCreation from "./pages/createsurvey";
import QuestionModal from "./pages/QuestionModal";
import DashboardCreated from "./pages/dashboard";
import AssetsDict from "./pages/assets";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import FeedbackForm from "./pages/Feedbackform";
import AcademicFeedbackForm from "./pages/academicfb";
import EditableTable from "./pages/producttemplate";
import MySurvey from "./pages/survey";
import User from "./pages/userdashboard";
import Mentor from "./pages/mentor";
import StudentForm from "./pages/user-details";
// import Sidebar from "./pages/Sidebar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/survey" element={<MySurvey />} />
        <Route path="/dashboard" element={<DashboardCreated />} />
        <Route path="/dashboardnull" element={<DashboardLayout />} />
        <Route path="/templates" element={<AssetsDict />} />
        <Route path="/create-survey" element={<SurveyCreation />} />
        <Route path="/create-new" element={<SurveyCreation />} />
        <Route path="/question-modal" element={<QuestionModal />} />
        <Route path="/question-modal" element={<QuestionModal />} />
        <Route path="/Feedbackform" element={<FeedbackForm />} />
        <Route path="/academicfb" element={<AcademicFeedbackForm />} />
        <Route path="/producttemplate" element={<EditableTable />} />
        <Route path="/userdashboard" element={<User />} />
        <Route path="/user-details" element={<StudentForm />} />
        {/* <Route path="/Sidebar" element={<Sidebar />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;