// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "./pages/dashboardnull";
// import SurveyCreation from "./pages/createsurvey";
// import QuestionModal from "./pages/QuestionModal";
// import DashboardCreated from "./pages/dashboard";
// import AssetsDict from "./pages/assets";
// import Login from "./pages/login/login";
// import Register from "./pages/register/register";
// import FeedbackForm from "./pages/Feedbackform";
// import AcademicFeedbackForm from "./pages/academicfb";
// import EditableTable from "./pages/producttemplate";
// import MySurvey from "./pages/survey";
// import User from "./pages/userdashboard";
// import Mentor from "./pages/mentor";
// import StudentForm from "./pages/user-details";
// // import Sidebar from "./pages/Sidebar";
// import SurveyQuestions from "./pages/surveyquestions";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/mentor" element={<Mentor />} />
//         <Route path="/survey" element={<MySurvey />} />
//         <Route path="/dashboard" element={<DashboardCreated />} />
//         <Route path="/dashboardnull" element={<DashboardLayout />} />
//         <Route path="/templates" element={<AssetsDict />} />
//         <Route path="/create-survey" element={<SurveyCreation />} />
//         <Route path="/create-new" element={<SurveyCreation />} />
//         <Route path="/question-modal" element={<QuestionModal />} />
//         <Route path="/question-modal" element={<QuestionModal />} />
//         <Route path="/Feedbackform" element={<FeedbackForm />} />
//         <Route path="/academicfb" element={<AcademicFeedbackForm />} />
//         <Route path="/producttemplate" element={<EditableTable />} />
//         <Route path="/userdashboard" element={<User />} />
//         <Route path="/user-details" element={<StudentForm />} />
//         <Route path="/surveyquestions/:title" element={<SurveyQuestions />} />
//         {/* <Route path="/Sidebar" element={<Sidebar />} /> */}

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import DashboardNull from "./pages/dashboardnull";
import AcademicFB from "./pages/academicfb";
import Assets from "./pages/assets";
import CreateSurvey from "./pages/createsurvey";
import FeedbackForm from "./pages/Feedbackform";
import EditableTable from "./pages/producttemplate";
import Survey from "./pages/survey";
import SurveyQuestions from "./pages/surveyquestions";
import UserDetails from "./pages/user-details";
import UserDashboard from "./pages/userdashboard";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./context/authcontext";
import AssetsDict from "./pages/assets";
import MentorDashboard from "./pages/mentor";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/surveyquestions/:title" element={<SurveyQuestions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboardnull" element={<DashboardNull />} />
           <Route path="/templates" element={<AssetsDict />} />
           <Route path="/producttemplate" element={<EditableTable />} />
           <Route path="/dashboardnull" element={<DashboardNull />} />
           <Route path="/academic-feedback" element={<AcademicFB />} />
           <Route path="/assets" element={<Assets />} />
           <Route path="/create-survey" element={<CreateSurvey />} />
           <Route path="/feedback-form" element={<FeedbackForm />} />
           <Route path="/mentor" element={<MentorDashboard />} />
           <Route path="/survey" element={<Survey />} />
           {/* <Route path="/survey-questions" element={<SurveyQuestions />} /> */}
           <Route path="/user-details" element={<UserDetails />} />
           <Route path="/userdashboard" element={<UserDashboard />} />
          </Route>
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
  
}

export default App;
