// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DashboardLayout from "./pages/dashboardnull";
// import SurveyCreation from "./pages/createsurvey";
// import QuestionModal from "./pages/QuestionModal";
// import DashboardCreated from "./pages/dashboard";
// import AssetsDict from "./pages/assets";
// import Login from "./pages/login/login";
// import Register from "./pages/register/register";
// import { AuthProvider } from "./context/authcontext"; // Import AuthProvider
// import ProtectedRoute from "./pages/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider> {/* Wrap the app with AuthProvider */}
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/create-new" element={<SurveyCreation />} />
//           <Route element={<ProtectedRoute />}>
//           <Route path="/dashboard" element={<DashboardCreated />} />
//         </Route>
//           <Route path="/login" element={<Login />} />
//           <Route path="/templates" element={<AssetsDict />} />
//           <Route path="/create-survey" element={<SurveyCreation />} />
//           <Route path="/question-modal" element={<QuestionModal />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route,useNavigate ,Navigate} from "react-router-dom";
import DashboardLayout from "./pages/dashboardnull";
import SurveyCreation from "./pages/createsurvey";
import QuestionModal from "./pages/QuestionModal";
import DashboardCreated from "./pages/dashboard";
import AssetsDict from "./pages/assets";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { AuthProvider } from "./context/authcontext"; // Import AuthProvider
import ProtectedRoute from "./pages/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardCreated />} />
            <Route path="/create-new" element={<SurveyCreation />} />
            <Route path="/templates" element={<AssetsDict />} />
            <Route path="/create-survey" element={<SurveyCreation />} />
            <Route path="/question-modal" element={<QuestionModal />} />
          </Route>

          {/* Default Redirect to Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;