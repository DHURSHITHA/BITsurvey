import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Alert, Link, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo (1).png";
const primaryColor200 = "#7B3DFF";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password_: "", // Matches database column name
    role: "", // New field for role
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.email || !formData.password_ || !formData.role) {
      setMessage({ type: "error", text: "❌ Please fill all fields." });
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", formData);
      if (res.data.success) {
        setMessage({ type: "success", text: "✅ Login successful! Redirecting..." });
        localStorage.setItem("staffEmail", res.data.staffEmail);



       
        localStorage.setItem("token", res.data.token);

        
        if (formData.role === "faculty") {
          if (res.data.hasCreatedSurvey) {
            setTimeout(() => navigate("/dashboard"), 1000); // Redirect to dashboard
          } else {
            setTimeout(() => navigate("/dashboardnull"), 1000); // Redirect to dashboardnull
          }
        } else if (formData.role === "student") {
          setTimeout(() => navigate("/userdashboard"), 1000); // Redirect to userdetails
        }
      } else {
        setMessage({ type: "error", text: res.data.message });
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage({ type: "error", text: "⚠️ Invalid credentials or server error." });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
      <Box sx={{ width: 400, padding: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper", textAlign: "center" }}>
        <Typography
                variant="h6"
                sx={{ ml:"110px",fontWeight: "bold", color: primaryColor200, mb: 2, fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center" }}
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ width: "20px", height: "19px", marginRight: "8px" }}
                />
                BIT SURVEY
              </Typography>
        {/* <Typography variant="h5">BIT SURVEY</Typography> */}
        {message && <Alert severity={message.type} sx={{ mt: 2 }}>{message.text}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Password" name="password_" type="password" value={formData.password_} onChange={handleChange} margin="normal" required />

          <FormControl fullWidth margin="normal" required>
  <InputLabel>Role</InputLabel>
  <Select
    label="Role"
    name="role"
    value={formData.role}
    onChange={handleChange}
  >
    <MenuItem value="student">Student</MenuItem>
    <MenuItem value="faculty">Faculty</MenuItem>
  </Select>
</FormControl>

<Button
  fullWidth
  variant="contained"
  type="submit"
  sx={{
    mt: 2,
    backgroundColor: "#7B3DFF", // Custom background color
    "&:hover": {
      backgroundColor: "#5E2DB3", // Optional: Custom hover color
    },
  }}
>
  Login
</Button>
        </form>

        {/* Register Link */}
        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link component="button" variant="body2" onClick={() => navigate("/register")}>Register here</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
