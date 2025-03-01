// import React from "react";
// import { BrowserRouter, Routes, Route,useNavigate ,Navigate} from "react-router-dom";
// import DashboardLayout from "./pages/dashboardnull";
// import SurveyCreation from "./pages/createsurvey";
// import QuestionModal from "./pages/QuestionModal";
// import DashboardCreated from "./pages/dashboard";
// import AssetsDict from "./pages/assets";
// import Login from "./pages/login/login";
// import Register from "./pages/register/register";
// import { AuthProvider } from "./context/authcontext"; // Import AuthProvider
// import ProtectedRoute from "./pages/ProtectedRoute"; // Import ProtectedRoute

// function App() {
//   return (

//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<DashboardCreated />} />
//             <Route path="/create-new" element={<SurveyCreation />} />
//             <Route path="/templates" element={<AssetsDict />} />
//             <Route path="/create-survey" element={<SurveyCreation />} />
//             <Route path="/question-modal" element={<QuestionModal />} />
//           </Route>

//           {/* Default Redirect to Login */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;