import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Radio, RadioGroup, FormControlLabel, Button, LinearProgress, TextField } from '@mui/material';
import axios from 'axios';

const SurveyQuestions = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { canResubmit, submissionCount } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [textResponse, setTextResponse] = useState('');
  const [otherResponse, setOtherResponse] = useState('');
  const [error, setError] = useState(null);
  const [surveyId, setSurveyId] = useState(null);
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const studentEmail = user?.email;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/surveyquestions/${title}`, {
          headers: { Authorization: token },
        });

        let fetchedQuestions = response.data;

        if (fetchedQuestions.length > 0 && fetchedQuestions[0].shuffle_questions === 1) {
          fetchedQuestions = fetchedQuestions.sort(() => Math.random() - 0.5);
        }

        setQuestions(fetchedQuestions);

        // Create or get survey ID
        const surveyResponse = await axios.post('http://localhost:3000/create-survey', {
          survey_title: title,
          user_email: studentEmail
        }, {
          headers: { Authorization: token }
        });
        
        setSurveyId(surveyResponse.data.survey_id);
      } catch (error) {
        console.error('Error fetching survey questions:', error);
        setError('Failed to fetch survey questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, [title, token, studentEmail]);

  const handleNext = async () => {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (currentQuestion.require_answer === 1) {
      if (currentQuestion.texts === 1 && !textResponse.trim()) {
        alert('Please enter your response before proceeding.');
        return;
      } else if (currentQuestion.texts !== 1 && !selectedOption) {
        alert('Please choose an option before proceeding.');
        return;
      } else if (selectedOption === 'Other' && currentQuestion.skip_based_on_answer === 1 && !otherResponse.trim()) {
        alert('Please specify your response for "Other".');
        return;
      }
    }
  
    try {
      // Save the current response
      await axios.post('http://localhost:3000/save-response', {
        survey_id: surveyId,
        question_text: currentQuestion.question_text,
        response_text: currentQuestion.texts === 1 ? textResponse : (selectedOption === 'Other' ? otherResponse : null),
        selected_option: currentQuestion.texts === 1 ? null : (selectedOption === 'Other' ? 'Other' : selectedOption),
        student_email: studentEmail,
        survey_title: title
      }, {
        headers: { Authorization: token }
      });
  
      if (currentQuestionIndex < questions.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setTextResponse('');
        setOtherResponse('');
      } else {
        // Track the submission
        await axios.post('http://localhost:3000/track-submission', {
          survey_title: title,
          student_email: studentEmail
        }, {
          headers: { Authorization: token }
        });
        
        // Show success alert
        alert(canResubmit ? 'Your response has been updated successfully!' : 'Your response has been saved successfully!');
        navigate('/userdashboard');
      }
    } catch (error) {
      console.error('Error saving response:', error);
      alert('Failed to save your response. Please try again.');
    }
  };

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (questions.length === 0 || !surveyId) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading survey questions...</Typography>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const optionsToDisplay = currentQuestion.shuffle_options === 1
    ? [...currentQuestion.options].sort(() => Math.random() - 0.5)
    : currentQuestion.options;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f8f9fc',
      padding: '2rem'
    }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      <Box sx={{ width: '80%', mb: 3, textAlign: 'center' }}>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#1FC16B' } }} />
        <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
          {currentQuestionIndex + 1}/{questions.length}
        </Typography>
      </Box>
      <Card sx={{
        width: '80%',
        textAlign: 'center',
        boxShadow: 'none',
        backgroundColor: 'white',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CardContent sx={{ width: '80%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1FC16', textAlign: 'left' }}>
            {currentQuestionIndex + 1}. {currentQuestion.question_text}
          </Typography>

          {currentQuestion.texts === 1 ? (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your response here"
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              multiline
              minRows={4}
              sx={{ mt: 2 }}
            />
          ) : (
            <>
              <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} sx={{ width: '100%' }}>
                {optionsToDisplay.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option.option_text}
                    control={<Radio sx={{ color: 'black' }} checked={selectedOption === option.option_text} />}
                    label={
                      <Typography
                        sx={{
                          p: 1.5,
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          cursor: 'pointer',
                          gap: 1,
                        }}
                      >
                        {option.option_text}
                      </Typography>
                    }
                    sx={{ width: '100%', mb: 1, display: 'flex', alignItems: 'center' }}
                  />
                ))}
              </RadioGroup>
              {selectedOption === 'Other' && currentQuestion.skip_based_on_answer === 1 && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Please specify"
                  value={otherResponse}
                  onChange={(e) => setOtherResponse(e.target.value)}
                  sx={{ mt: 2 }}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ mt: 3, backgroundColor: '#6a4bbc', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', px: 5, py: 1.5 }}
        disabled={currentQuestion.require_answer === 1 && (currentQuestion.texts === 1 ? !textResponse.trim() : (!selectedOption || (selectedOption === 'Other' && currentQuestion.skip_based_on_answer === 1 && !otherResponse.trim())))}
      >
        {currentQuestionIndex < questions.length - 1 ? 'Next' : canResubmit ? 'Update Submission' : 'Submit Survey'}
      </Button>
    </Box>
  );
};

export default SurveyQuestions;