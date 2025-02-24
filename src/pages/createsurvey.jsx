// import React, { useState } from "react";
// import { TextField, Button, Select,Divider, Typography,MenuItem, IconButton, Avatar, Switch, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import { Settings, Notifications, AddCircleOutline, RemoveCircleOutline, ContentCopy, Edit, Delete, PlaylistAdd } from "@mui/icons-material";

// const SurveyCreation = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       text: "",
//       type: "multiple",
//       options: ["Agree", "Disagree", "Strongly disagree"],
//       scale: 3,
//       expanded: false,
//     },
//   ]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [bulkDialogOpen, setBulkDialogOpen] = useState(false); // State for bulk dialog
//   const [bulkText, setBulkText] = useState(""); // State for bulk text input

//   const handleExpand = (index) => {
//     setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, expanded: true } : q)));
//   };

//   const handleAddOption = (index) => {
//     setQuestions((prev) =>
//       prev.map((q, i) => (i === index ? { ...q, options: [...q.options, "New Option"] } : q))
//     );
//   };

//   const handleRemoveOption = (qIndex, oIndex) => {
//     setQuestions((prev) =>
//       prev.map((q, i) =>
//         i === qIndex ? { ...q, options: q.options.filter((_, j) => j !== oIndex) } : q
//       )
//     );
//   };

//   const handleAddQuestion = () => {
//     setQuestions((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         text: "",
//         type: "multiple",
//         options: ["Agree", "Disagree", "Strongly disagree"],
//         scale: 3,
//         expanded: false,
//       },
//     ]);
//   };

//   const handleDeleteQuestion = (index) => {
//     setQuestions((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleCopyQuestion = (index) => {
//     setQuestions((prev) => {
//       const newQuestion = { ...prev[index], id: prev.length + 1 };
//       return [...prev, newQuestion];
//     });
//   };

//   const handleFinishSurvey = () => {
//     setOpenDialog(true);
//   };

//   // Function to handle saving bulk options
//   const handleSaveBulkOptions = () => {
//     const newOptions = bulkText.split("\n").filter((line) => line.trim() !== "");
//     setQuestions((prev) =>
//       prev.map((q, i) =>
//         i === activeQuestionIndex ? { ...q, options: [...q.options, ...newOptions] } : q
//       )
//     );
//     setBulkDialogOpen(false);
//     setBulkText("");
//   };

//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(null); // Track which question is active for bulk options

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
//       <div style={{ width: "80rem", maxWidth: "112rem", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
//         <div style={{ position: "fixed", top: 0, left: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 40px", backgroundColor: "white", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", zIndex: 1000 }}>
//           <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//             <span style={{ fontSize: "18px", fontWeight: "bold", color: "#6a4bbc" }}>BIT SURVEY</span>
//             <span style={{ marginLeft: "10px", fontSize: "14px", color: "#666" }}> &gt; survey creation</span>
//           </div>
//           <TextField placeholder="Search for something" size="small" variant="outlined" style={{ backgroundColor: "#f0f2f5", borderRadius: "8px", width: "250px", marginRight: "20px" }} />
//           <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//             <IconButton><Settings /></IconButton>
//             <IconButton><Notifications /></IconButton>
//             <Avatar style={{ width: "40px", height: "40px" }} src="https://via.placeholder.com/40" />
//           </div>
//         </div>
//         {/* Survey Box */}
//         <div style={{ width: "90%", maxWidth: "800px", margin: "100px auto 0", textAlign: "left" }}>
//           <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Untitled</h2>
//           {questions.map((question, qIndex) => (
//             <div key={qIndex} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff", marginBottom: "20px" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <span style={{ fontWeight: "bold", fontSize: "16px" }}>Q{question.id}</span>
//                 <div>
//                   <IconButton onClick={() => handleCopyQuestion(qIndex)} style={{ color: "#6a4bbc" }}><ContentCopy /></IconButton>
//                   <IconButton style={{ color: "#6a4bbc" }}><Edit /></IconButton>
//                   <IconButton onClick={() => handleDeleteQuestion(qIndex)} style={{ color: "#6a4bbc" }}><Delete /></IconButton>
//                 </div>
//               </div>
//               <TextField placeholder="Enter the question" fullWidth variant="outlined" size="small" style={{ marginTop: "10px" }} onClick={() => handleExpand(qIndex)} />
//               {question.expanded && (
//                 <div style={{ marginTop: "20px" }}>
//                   <strong>Predefined Options</strong>
//                   {question.options.map((option, oIndex) => (
//                     <div key={oIndex} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//                       <TextField value={option} size="small" fullWidth variant="outlined" style={{ flex: 1, marginRight: "10px" }} />
//                       <IconButton onClick={() => handleRemoveOption(qIndex, oIndex)}><RemoveCircleOutline /></IconButton>
//                       <IconButton onClick={() => handleAddOption(qIndex)}><AddCircleOutline /></IconButton>
//                     </div>
//                   ))}
//                   <FormControlLabel control={<Checkbox />} label="Score this question (enable quiz mode)" />
//                   <FormControlLabel control={<Checkbox />} label="Add an 'Other' Answer Option" />
//                 </div>
//               )}
//               <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "10px" }}>
//                 <IconButton
//                   style={{ color: "#6a4bbc" }}
//                   onClick={() => {
//                     setActiveQuestionIndex(qIndex); // Set the active question index
//                     setBulkDialogOpen(true); // Open the bulk dialog
//                   }}
//                 >
//                   <PlaylistAdd />
//                 </IconButton>
//                 <span style={{ fontSize: "14px", color: "#6a4bbc", marginLeft: "5px" }}>+ Bulk Answers</span>
//               </div>
//             </div>
//           ))}

//           <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
//             <Button variant="contained" style={{ backgroundColor: "#6a4bbc", color: "white" }} onClick={handleAddQuestion}>+ Next Question</Button>
//             <div>
//               <Button variant="outlined" style={{ marginRight: "10px", borderColor: "#6a4bbc", color: "#6a4bbc" }}>Cancel</Button>
//               <Button variant="contained" style={{ backgroundColor: "#6a4bbc", color: "white" }} onClick={handleFinishSurvey}>Finish Survey</Button>
//             </div>
//           </div>
//           <br />
//           <div style={{ textAlign: "center", padding: "10px", backgroundColor: "#f5f5f5" }}>
//           <Button
//             variant="text"
//             style={{
//               color: "black",
//               textTransform: "none",
//               fontFamily: "'Poppins', sans-serif",
//               fontSize: "14px",
//             }}
//           >
//             Copy and paste questions
//           </Button>
//         </div>
//         </div>
//       </div>
      
      

//       {/* Bulk Answers Dialog */}
//       <Dialog open={bulkDialogOpen} onClose={() => setBulkDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle style={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" ,fontSize:"35px"}}>Add answers in bulk</DialogTitle>
//         <Divider></Divider>
//         <DialogTitle style={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" ,fontSize:"20px"}}>Enter each answer choice on a seperate line</DialogTitle>
        
//         <DialogContent>
//           <TextField
//             multiline
//             rows={5}
//             fullWidth
//             variant="outlined"
//             value={bulkText}
//             onChange={(e) => setBulkText(e.target.value)}
//             style={{ fontFamily: "'Poppins', sans-serif" }}
//           />
//         </DialogContent>
//         <br />
//         <Divider></Divider>
//         <br />
//         <DialogActions>
//           <Button onClick={() => setBulkDialogOpen(false)}  variant="contained" color="black" style={{ fontFamily: "'Poppins', sans-serif" , backgroundcolor:"white",color:"black" ,textTransform:"none",minWidth:"100px"}}>Cancel</Button>
//           <Button onClick={handleSaveBulkOptions}  variant="contained" style={{ fontFamily: "'Poppins', sans-serif" , backgroundColor: "#7F56D9", color: "white",textTransform:"none",minWidth:"100px"}}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Permissions Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
//         <DialogTitle style={{ fontWeight: "bold" }}>Permissions</DialogTitle>
//         <DialogContent style={{ display: "flex", flexDirection: "column", width: "50rem", height: "35rem" }}>
//           <FormControlLabel control={<Checkbox defaultChecked />} label="Date, Start and end time allocation" />
//           <div style={{ display: "flex", gap: "20px", marginLeft: "20px" }}>
//             <TextField label="Start date & Time" variant="outlined" fullWidth placeholder="Placeholder" />
//             <TextField label="End date & Time (optional)" variant="outlined" fullWidth placeholder="Placeholder" />
//           </div>
//           <FormControlLabel control={<Checkbox defaultChecked />} label="Scheduling frequencies" style={{ marginTop: "20px" }} />
//           <div style={{ display: "flex", gap: "10px", marginLeft: "20px", flexWrap: "wrap" }}>
//             <FormControlLabel control={<Checkbox />} label="Daily" />
//             <FormControlLabel control={<Checkbox defaultChecked />} label="Weekly" />
//             <FormControlLabel control={<Checkbox />} label="Monthly" />
//           </div>
//           <div style={{ display: "flex", gap: "10px", marginLeft: "20px", flexWrap: "wrap" }}>
//             <FormControlLabel control={<Checkbox />} label="Sunday" />
//             <FormControlLabel control={<Checkbox />} label="Monday" />
//             <FormControlLabel control={<Checkbox />} label="Tuesday" />
//             <FormControlLabel control={<Checkbox />} label="Wednesday" />
//             <FormControlLabel control={<Checkbox />} label="Thursday" />
//             <FormControlLabel control={<Checkbox />} label="Friday" />
//             <FormControlLabel control={<Checkbox />} label="Saturday" />
//           </div>
//           <FormControlLabel control={<Checkbox defaultChecked />} label="Populate in random timing in a specific duration of time" />
//           <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
//             <TextField label="Time difference (optional)" variant="outlined" fullWidth defaultValue="5 minutes" />
//           </div>
//           <FormControlLabel control={<Checkbox defaultChecked />} label="Send reminders to the respondents" />
//           <FormControlLabel control={<Checkbox defaultChecked />} label="Assign to roles" />
//           <div style={{ marginLeft: "20px", width: "200px" }}>
//             <Select fullWidth defaultValue="Placeholder">
//               <MenuItem value="Placeholder">Placeholder</MenuItem>
//               <MenuItem value="Year">Year</MenuItem>
//             </Select>
//           </div>
//           <FormControlLabel control={<Checkbox />} label="Set response limit" />
//           <div style={{ marginLeft: "20px", width: "200px" }}>
//             <Select fullWidth defaultValue="Placeholder">
//               <MenuItem value="number">1</MenuItem>
//               <MenuItem value="number">2</MenuItem>
//               <MenuItem value="number">3</MenuItem>
//             </Select>
//           </div>
//           <FormControlLabel control={<Checkbox />} label="Set edit response count" />
//           <div style={{ marginLeft: "20px", width: "200px" }}>
//             <Select fullWidth defaultValue="Placeholder">
//               <MenuItem value="number">1</MenuItem>
//               <MenuItem value="number">2</MenuItem>
//               <MenuItem value="number">3</MenuItem>
//             </Select>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px" }}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default SurveyCreation;
import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  Divider,
  Typography,
  MenuItem,
  IconButton,
  Avatar,
  Switch,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Box,
} from "@mui/material";
import {
  Settings,
  Notifications,
  AddCircleOutline,
  RemoveCircleOutline,
  ContentCopy,
  Edit,
  Delete,
  PlaylistAdd,
} from "@mui/icons-material";

const SurveyCreation = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      type: "multiple",
      options: ["Agree", "Disagree", "Strongly disagree"],
      scale: 3,
      expanded: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  // State for the "Copy and paste questions" modal
  const [modalOpen, setModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [hideAnswers, setHideAnswers] = useState(false);

  const handleExpand = (index) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, expanded: true } : q)));
  };

  const handleAddOption = (index) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, options: [...q.options, "New Option"] } : q))
    );
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: q.options.filter((_, j) => j !== oIndex) } : q
      )
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: "",
        type: "multiple",
        options: ["Agree", "Disagree", "Strongly disagree"],
        scale: 3,
        expanded: false,
      },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopyQuestion = (index) => {
    setQuestions((prev) => {
      const newQuestion = { ...prev[index], id: prev.length + 1 };
      return [...prev, newQuestion];
    });
  };

  const handleFinishSurvey = () => {
    setOpenDialog(true);
  };

  const handleSaveBulkOptions = () => {
    const newOptions = bulkText.split("\n").filter((line) => line.trim() !== "");
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === activeQuestionIndex ? { ...q, options: [...q.options, ...newOptions] } : q
      )
    );
    setBulkDialogOpen(false);
    setBulkText("");
  };

  // Function to handle adding parsed questions from the modal
  const handleAddParsedQuestions = () => {
    const questionBlocks = inputText.split("\n\n");
    const parsedQuestions = questionBlocks.map((block, index) => {
      const lines = block.split("\n");
      const question = lines[0];
      const choices = lines.slice(1);
      return {
        id: questions.length + index + 1,
        text: question,
        type: "multiple",
        options: choices,
        scale: 3,
        expanded: false,
      };
    });
    setQuestions((prev) => [...prev, ...parsedQuestions]);
    setModalOpen(false);
    setInputText("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <div style={{ width: "80rem", maxWidth: "112rem", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 40px", backgroundColor: "white", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", zIndex: 1000 }}>
          <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#6a4bbc" }}>BIT SURVEY</span>
            <span style={{ marginLeft: "10px", fontSize: "14px", color: "#666" }}> &gt; survey creation</span>
          </div>
          <TextField placeholder="Search for something" size="small" variant="outlined" style={{ backgroundColor: "#f0f2f5", borderRadius: "8px", width: "250px", marginRight: "20px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <IconButton><Settings /></IconButton>
            <IconButton><Notifications /></IconButton>
            <Avatar style={{ width: "40px", height: "40px" }} src="https://via.placeholder.com/40" />
          </div>
        </div>
        {/* Survey Box */}
        <div style={{ width: "90%", maxWidth: "800px", margin: "100px auto 0", textAlign: "left" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Untitled</h2>
          {questions.map((question, qIndex) => (
            <div key={qIndex} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Q{question.id}</span>
                <div>
                  <IconButton onClick={() => handleCopyQuestion(qIndex)} style={{ color: "#6a4bbc" }}><ContentCopy /></IconButton>
                  <IconButton style={{ color: "#6a4bbc" }}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteQuestion(qIndex)} style={{ color: "#6a4bbc" }}><Delete /></IconButton>
                </div>
              </div>
              <TextField placeholder="Enter the question" fullWidth variant="outlined" size="small" style={{ marginTop: "10px" }} onClick={() => handleExpand(qIndex)} />
              {question.expanded && (
                <div style={{ marginTop: "20px" }}>
                  <strong>Predefined Options</strong>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                      <TextField value={option} size="small" fullWidth variant="outlined" style={{ flex: 1, marginRight: "10px" }} />
                      <IconButton onClick={() => handleRemoveOption(qIndex, oIndex)}><RemoveCircleOutline /></IconButton>
                      <IconButton onClick={() => handleAddOption(qIndex)}><AddCircleOutline /></IconButton>
                    </div>
                  ))}
                  <FormControlLabel control={<Checkbox />} label="Score this question (enable quiz mode)" />
                  <FormControlLabel control={<Checkbox />} label="Add an 'Other' Answer Option" />
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "10px" }}>
                <IconButton
                  style={{ color: "#6a4bbc" }}
                  onClick={() => {
                    setActiveQuestionIndex(qIndex);
                    setBulkDialogOpen(true);
                  }}
                >
                  <PlaylistAdd />
                </IconButton>
                <span style={{ fontSize: "14px", color: "#6a4bbc", marginLeft: "5px" }}>+ Bulk Answers</span>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Button variant="contained" style={{ backgroundColor: "#6a4bbc", color: "white" }} onClick={handleAddQuestion}>+ Next Question</Button>
            <div>
              <Button variant="outlined" style={{ marginRight: "10px", borderColor: "#6a4bbc", color: "#6a4bbc" }}>Cancel</Button>
              <Button variant="contained" style={{ backgroundColor: "#6a4bbc", color: "white" }} onClick={handleFinishSurvey}>Finish Survey</Button>
            </div>
          </div>
          <br />
          {/* "Copy and paste questions" button */}
          <div style={{ textAlign: "center", padding: "10px", backgroundColor: "#f5f5f5" }}>
            <Button
              variant="text"
              style={{
                color: "black",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
              }}
              onClick={() => setModalOpen(true)}
            >
              Copy and paste questions
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Answers Dialog */}
      <Dialog open={bulkDialogOpen} onClose={() => setBulkDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif", fontSize: "35px" }}>Add answers in bulk</DialogTitle>
        <Divider></Divider>
        <DialogTitle style={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif", fontSize: "20px" }}>Enter each answer choice on a separate line</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </DialogContent>
        <br />
        <Divider></Divider>
        <br />
        <DialogActions>
          <Button onClick={() => setBulkDialogOpen(false)} variant="contained" color="black" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "white", color: "black", textTransform: "none", minWidth: "100px" }}>Cancel</Button>
          <Button onClick={handleSaveBulkOptions} variant="contained" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#7F56D9", color: "white", textTransform: "none", minWidth: "100px" }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle style={{ fontWeight: "bold" }}>Permissions</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", width: "50rem", height: "35rem" }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Date, Start and end time allocation" />
          <div style={{ display: "flex", gap: "20px", marginLeft: "20px" }}>
            <TextField label="Start date & Time" variant="outlined" fullWidth placeholder="Placeholder" />
            <TextField label="End date & Time (optional)" variant="outlined" fullWidth placeholder="Placeholder" />
          </div>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Scheduling frequencies" style={{ marginTop: "20px" }} />
          <div style={{ display: "flex", gap: "10px", marginLeft: "20px", flexWrap: "wrap" }}>
            <FormControlLabel control={<Checkbox />} label="Daily" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Weekly" />
            <FormControlLabel control={<Checkbox />} label="Monthly" />
          </div>
          <div style={{ display: "flex", gap: "10px", marginLeft: "20px", flexWrap: "wrap" }}>
            <FormControlLabel control={<Checkbox />} label="Sunday" />
            <FormControlLabel control={<Checkbox />} label="Monday" />
            <FormControlLabel control={<Checkbox />} label="Tuesday" />
            <FormControlLabel control={<Checkbox />} label="Wednesday" />
            <FormControlLabel control={<Checkbox />} label="Thursday" />
            <FormControlLabel control={<Checkbox />} label="Friday" />
            <FormControlLabel control={<Checkbox />} label="Saturday" />
          </div>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Populate in random timing in a specific duration of time" />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
            <TextField label="Time difference (optional)" variant="outlined" fullWidth defaultValue="5 minutes" />
          </div>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Send reminders to the respondents" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Assign to roles" />
          <div style={{ marginLeft: "20px", width: "200px" }}>
            <Select fullWidth defaultValue="Placeholder">
              <MenuItem value="Placeholder">Placeholder</MenuItem>
              <MenuItem value="Year">Year</MenuItem>
            </Select>
          </div>
          <FormControlLabel control={<Checkbox />} label="Set response limit" />
          <div style={{ marginLeft: "20px", width: "200px" }}>
            <Select fullWidth defaultValue="Placeholder">
              <MenuItem value="number">1</MenuItem>
              <MenuItem value="number">2</MenuItem>
              <MenuItem value="number">3</MenuItem>
            </Select>
          </div>
          <FormControlLabel control={<Checkbox />} label="Set edit response count" />
          <div style={{ marginLeft: "20px", width: "200px" }}>
            <Select fullWidth defaultValue="Placeholder">
              <MenuItem value="number">1</MenuItem>
              <MenuItem value="number">2</MenuItem>
              <MenuItem value="number">3</MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px" }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for "Copy and paste questions" */}
     <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
  <Box sx={{ 
    position: "absolute", 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)", 
    width: 800, // Increased width to accommodate two sections
    bgcolor: "background.paper", 
    boxShadow: 24, 
    p: 4,
    display: "flex",
    gap: 4 // Adds space between the two sections
  }}>
    {/* Left Side - Question Input Area */}
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
        Import Questions
      </Typography>
      <TextField
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        placeholder="Paste your questions here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </Box>

    {/* Right Side - Preview Section */}
    <Box sx={{ flex: 1, backgroundColor: "#f9f9f9", p: 2, borderRadius: 1 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
        Preview
      </Typography>
      <Box sx={{ mt: 2 }}>
        {inputText.split("\n\n").map((block, index) => {
          const lines = block.split("\n");
          const question = lines[0];
          const choices = lines.slice(1);
          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>{question}</Typography>
              {!hideAnswers && ( // Conditionally render answers
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {choices.map((choice, idx) => (
                    <li key={idx} style={{ marginBottom: "8px" }}>
                      <Typography>A{idx + 1}. {choice}</Typography>
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          );
        })}
      </Box>
      <Button
        variant="text"
        sx={{ color: "#6a4bbc", textTransform: "none" }}
        onClick={() => setHideAnswers(!hideAnswers)} // Toggle hide/show answers
      >
        {hideAnswers ? "Show Answers" : "Hide Answers"}
      </Button>
    </Box>

    {/* Bottom Buttons */}
    <Box sx={{ 
      position: "absolute", 
      bottom: 16, 
      right:28, 
      display: "flex", 
      gap: 2 
    }}>
      <Button
        variant="contained"
        onClick={handleAddParsedQuestions}
        sx={{ 
          backgroundColor: "#6a4bbc", 
          color: "white", 
          textTransform: "none",
          borderRadius: 2,
          px: 19,
          py: 1,
          fontSize: "14px", // Match the font size in the screenshot
          fontWeight: "bold", // Match the bold text in the screenshot
        }}
      >
        Add Questions
      </Button>
    </Box>
  </Box>
</Modal>
    </div>
  );
};

export default SurveyCreation;