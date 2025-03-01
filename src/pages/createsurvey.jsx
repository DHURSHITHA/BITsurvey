import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // For generating unique survey IDs
import {
  TextField,
  Button,
  Select,
  Divider,
  Typography,
  MenuItem,
  IconButton,
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
  const [surveyId, setSurveyId] = useState(uuidv4()); // Generate a unique survey ID
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      type: "multiple",
      options: ["Agree", "Disagree", "Strongly disagree"],
      scale: 3,
      expanded: false,
      showOptions: false,
      require_answer: false,
      shuffle_answers: false,
      shuffle_questions: false,
      skip_based_on_answer: false,
      score_question: false,
      add_other_option: false,
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

  // State for checkboxes
  const [dateTimeAllocationChecked, setDateTimeAllocationChecked] = useState(false);
  const [schedulingFrequencyChecked, setSchedulingFrequencyChecked] = useState(false);
  const [randomTimingChecked, setRandomTimingChecked] = useState(false);
  const [weeklyChecked, setWeeklyChecked] = useState(false);
  const [assignRolesChecked, setAssignRolesChecked] = useState(false);
  const [setResponseLimitChecked, setSetResponseLimitChecked] = useState(false);

  // State to track which option is being edited
  const [editingOption, setEditingOption] = useState({ qIndex: null, oIndex: null });

  // State to track the active page (edit or options)
  const [activePage, setActivePage] = useState("edit");

  // State to store the survey title
  const [surveyTitle, setSurveyTitle] = useState("Untitled");

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
        showOptions: false,
        require_answer: false,
        shuffle_answers: false,
        shuffle_questions: false,
        skip_based_on_answer: false,
        score_question: false,
        add_other_option: false,
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
        showOptions: false,
        require_answer: false,
        shuffle_answers: false,
        shuffle_questions: false,
        skip_based_on_answer: false,
        score_question: false,
        add_other_option: false,
      };
    });
    setQuestions((prev) => [...prev, ...parsedQuestions]);
    setModalOpen(false);
    setInputText("");
  };

  const handleToggleOptions = (index) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, showOptions: !q.showOptions } : q)));
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((option, j) => (j === oIndex ? value : option)),
            }
          : q
      )
    );
  };

  // Function to handle editing an option
  const handleEditOption = (qIndex, oIndex) => {
    setEditingOption({ qIndex, oIndex });
  };

  // Function to save the edited option
  const handleSaveEditedOption = (qIndex, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((option, j) => (j === oIndex ? value : option)),
            }
          : q
      )
    );
    setEditingOption({ qIndex: null, oIndex: null });
  };

  // Function to save survey data to the database
  const saveSurveyToDatabase = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const payload = {
        survey_id: surveyId, // Include the survey ID
        questions: questions, // Include the questions
      };
      const response = await axios.post(
        "http://localhost:3000/save-survey",
        payload,
        {
          headers: {
            Authorization: token, // Pass the token in the headers
          },
        }
      );
      if (response.status === 200) {
        alert("Survey saved successfully!");
      }
    } catch (error) {
      console.error("Error saving survey:", error);
      alert("Failed to save survey.");
    }
  };

  // Function to handle survey title change
  const handleSurveyTitleChange = (e) => {
    setSurveyTitle(e.target.value);
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
          </div>
        </div>
        {/* Survey Box */}
        <div style={{ width: "90%", maxWidth: "800px", margin: "100px auto 0", textAlign: "left" }}>
          <TextField
            value={surveyTitle}
            onChange={handleSurveyTitleChange}
            variant="outlined"
            fullWidth
            style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}
          />
          {questions.map((question, qIndex) => (
            <div key={qIndex} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff", marginBottom: "20px" }}>
              <div>
                <Button
                  variant="text"
                  style={{
                    color: "black",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                    borderBottom: activePage === "edit" ? "1.5px solid red" : "none",
                    paddingBottom: "2px",
                    outline: "none",
                  }}
                  onClick={() => {
                    setActivePage("edit");
                    setQuestions((prev) => prev.map((q, i) => (i === qIndex ? { ...q, showOptions: false } : q)));
                  }}
                >
                  EDIT
                </Button>
                <Button
                  variant="text"
                  style={{
                    color: "black",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    borderBottom: activePage === "options" ? "1.5px solid red" : "none",
                    paddingBottom: "2px",
                    outline: "none",
                  }}
                  onClick={() => {
                    setActivePage("options");
                    handleToggleOptions(qIndex);
                  }}
                >
                  OPTIONS
                </Button>
              </div>
              {question.showOptions && (
                <div style={{ marginTop: "10px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.require_answer}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].require_answer = e.target.checked;
                          setQuestions(newQuestions);
                        }}
                      />
                    }
                    label="Require an answer to this question"
                    style={{ display: "block" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.shuffle_answers}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].shuffle_answers = e.target.checked;
                          setQuestions(newQuestions);
                        }}
                      />
                    }
                    label="Shuffle answers for each respondent (does not apply to 'Other' or 'None of the Above' answer choices)"
                    style={{ display: "block" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.shuffle_questions}
                        onChange={(e) => {
                          const newQuestions = questions.map((q, index) =>
                            index === qIndex ? { ...q, shuffle_questions: e.target.checked } : q
                          );
                          setQuestions(newQuestions);
                        }}
                      />
                    }
                    label="Shuffle questions for each respondent"
                    style={{ display: "block" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.skip_based_on_answer}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].skip_based_on_answer = e.target.checked;
                          setQuestions(newQuestions);
                        }}
                      />
                    }
                    label="Skip based on respondent’s answer"
                    style={{ display: "block" }}
                  />
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Q{question.id}</span>
                <div>
                  <IconButton onClick={() => handleCopyQuestion(qIndex)} style={{ color: "#6a4bbc" }}><ContentCopy /></IconButton>
                  <IconButton style={{ color: "#6a4bbc" }}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteQuestion(qIndex)} style={{ color: "#6a4bbc" }}><Delete /></IconButton>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <TextField
                  placeholder="Enter the question"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={question.text}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].text = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  onClick={() => handleExpand(qIndex)}
                />
                <Select
                  value={question.type}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].type = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  size="small"
                  style={{ minWidth: "150px" }}
                >
                  <MenuItem value="multiple">Multiple Choice</MenuItem>
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="scale">Scale</MenuItem>
                </Select>
              </div>
              {question.expanded && (
                <div style={{ marginTop: "20px" }}>
                  <strong>Predefined Options</strong>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                      {editingOption.qIndex === qIndex && editingOption.oIndex === oIndex ? (
                        <TextField
                          value={option}
                          size="small"
                          fullWidth
                          variant="outlined"
                          style={{ flex: 1, marginRight: "10px" }}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          onBlur={() => handleSaveEditedOption(qIndex, oIndex, option)}
                        />
                      ) : (
                        <TextField
                          value={option}
                          size="small"
                          fullWidth
                          variant="outlined"
                          style={{ flex: 1, marginRight: "10px" }}
                          onClick={() => handleEditOption(qIndex, oIndex)}
                        />
                      )}
                      <IconButton onClick={() => handleRemoveOption(qIndex, oIndex)}><RemoveCircleOutline /></IconButton>
                      <IconButton onClick={() => handleAddOption(qIndex)}><AddCircleOutline /></IconButton>
                    </div>
                  ))}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.score_question}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].score_question = e.target.checked;
                          setQuestions(newQuestions);
                        }}
                      />
                    }
                    label="Score this question (enable quiz mode)"
                    style={{ display: "block" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.add_other_option}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].add_other_option = e.target.checked;
                          setQuestions(newQuestions);
                        }}
                      />
                    }
                    label="Add an 'Other' Answer Option"
                    style={{ display: "block" }}
                  />
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
              <Button variant="contained" style={{ backgroundColor: "#6a4bbc", color: "white" }} onClick={() => {
                handleFinishSurvey();
                saveSurveyToDatabase();
              }}>Finish Survey</Button>
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
        <DialogTitle style={{ fontWeight: "bold", backgroundColor: "white", padding: "15px" }}>
          Permissions
        </DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", width: "50rem", height: "35rem", backgroundColor: "#ebebeb" }}>
          <div style={{ backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px" }}>
            <FormControlLabel
              control={<Checkbox checked={dateTimeAllocationChecked} onChange={(e) => setDateTimeAllocationChecked(e.target.checked)} />}
              label="Date, Start and end time allocation"
            />
            {dateTimeAllocationChecked && (
              <div style={{ display: "flex", gap: "20px", marginLeft: "20px" }}>
                <TextField label="Start date & Time" variant="outlined" fullWidth placeholder="Placeholder" />
                <TextField label="End date & Time (optional)" variant="outlined" fullWidth placeholder="Placeholder" />
              </div>
            )}
          </div>
          <hr style={{ width: "100%", border: "1px solid #ccc", margin: "15px 0", border: "2px solid #bdbdbd" }} />

          <div style={{ backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px" }}>
            <FormControlLabel
              control={<Checkbox checked={schedulingFrequencyChecked} onChange={(e) => setSchedulingFrequencyChecked(e.target.checked)} />}
              label="Scheduling frequencies"
            />
            {schedulingFrequencyChecked && (
              <div style={{ display: "flex", gap: "10px", marginLeft: "20px", flexWrap: "wrap" }}>
                <FormControlLabel control={<Checkbox />} label="Daily" />
                <FormControlLabel control={<Checkbox checked={weeklyChecked} onChange={(e) => setWeeklyChecked(e.target.checked)} />} label="Weekly" />
                <FormControlLabel control={<Checkbox />} label="Monthly" />
              </div>
            )}
            {schedulingFrequencyChecked && weeklyChecked && (
              <div style={{ display: "flex", gap: "10px", marginLeft: "20px", flexWrap: "wrap" }}>
                <FormControlLabel control={<Checkbox />} label="Sunday" />
                <FormControlLabel control={<Checkbox />} label="Monday" />
                <FormControlLabel control={<Checkbox />} label="Tuesday" />
                <FormControlLabel control={<Checkbox />} label="Wednesday" />
                <FormControlLabel control={<Checkbox />} label="Thursday" />
                <FormControlLabel control={<Checkbox />} label="Friday" />
                <FormControlLabel control={<Checkbox />} label="Saturday" />
              </div>
            )}
          </div>
          <hr style={{ width: "100%", border: "1px solid #ccc", margin: "15px 0", border: "2px solid #bdbdbd" }} />

          <div style={{ backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px" }}>
            <FormControlLabel
              control={<Checkbox checked={randomTimingChecked} onChange={(e) => setRandomTimingChecked(e.target.checked)} />}
              label="Populate in random timing in a specific duration of time"
            />
            {randomTimingChecked && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
                <TextField label="Time difference (optional)" variant="outlined" fullWidth defaultValue="5 minutes" />
              </div>
            )}
          </div>
          <hr style={{ width: "100%", border: "1px solid #ccc", margin: "15px 0", border: "2px solid #bdbdbd" }} />

          <div style={{ backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px" }}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Send reminders to the respondents" />
          </div>
          <hr style={{ width: "100%", border: "1px solid #ccc", margin: "15px 0", border: "2px solid #bdbdbd" }} />

          <div style={{ backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px" }}>
            <FormControlLabel
              control={<Checkbox checked={assignRolesChecked} onChange={(e) => setAssignRolesChecked(e.target.checked)} />}
              label="Assign to roles"
            />
            {assignRolesChecked && (
              <div style={{ marginLeft: "20px", width: "200px" }}>
                <Select fullWidth defaultValue="Placeholder">
                  <MenuItem value="Placeholder">Placeholder</MenuItem>
                  <MenuItem value="Year">Year</MenuItem>
                </Select>
              </div>
            )}
          </div>
          <hr style={{ width: "100%", border: "1px solid #ccc", margin: "15px 0", border: "2px solid #bdbdbd" }} />

          <div style={{ backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px" }}>
            <FormControlLabel
              control={<Checkbox checked={setResponseLimitChecked} onChange={(e) => setSetResponseLimitChecked(e.target.checked)} />}
              label="Set response limit"
            />
            {setResponseLimitChecked && (
              <div style={{ marginLeft: "20px", width: "200px" }}>
                <Select fullWidth defaultValue="Placeholder">
                  <MenuItem value="number">1</MenuItem>
                  <MenuItem value="number">2</MenuItem>
                  <MenuItem value="number">3</MenuItem>
                </Select>
              </div>
            )}
          </div>
          <hr style={{ width: "100%", border: "1px solid #ccc", margin: "15px 0", border: "2px solid #bdbdbd" }} />
        </DialogContent>

        <DialogActions style={{ backgroundColor: "white", padding: "15px" }}>
          <Button onClick={() => setOpenDialog(false)} style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for "Copy and paste questions" */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          gap: 4
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
                    {!hideAnswers && (
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
              onClick={() => setHideAnswers(!hideAnswers)}
            >
              {hideAnswers ? "Show Answers" : "Hide Answers"}
            </Button>
          </Box>

          {/* Bottom Buttons */}
          <Box sx={{
            position: "absolute",
            bottom: 16,
            right: 28,
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
                fontSize: "14px",
                fontWeight: "bold",
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