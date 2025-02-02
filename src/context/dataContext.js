import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // Quiz State Variables
  const [quizs, setQuizs] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  // Display Control States
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showStart, setShowStart] = useState(true); // New state to show Start screen

  // Load JSON Data from API
  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX')
      .then(res => res.ok ? res.json() : Promise.reject('Network error'))
      .then(data => {
        const response = JSON.parse(data.contents);
        if (Array.isArray(response.questions)) {
          setQuizs(response.questions);
        } else {
          console.error("Data format is incorrect");
        }
      })
      .catch(err => console.error('Error fetching quiz data:', err));
  }, []);

  // Get Current Question
  const question = quizs[questionIndex] || {};

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setQuizStarted(true);
    setShowResult(false);
    setMarks(0);
    setQuestionIndex(0);
  };

  // Check Answer
  const checkAnswer = (e, selected, options) => {
    const correctOption = options.find(option => option.is_correct);
    setSelectedAnswer(selected);

    if (correctOption) {
      if (selected.description === correctOption.description) {
        setMarks((prevMarks) => prevMarks + 5);
      }
    } else {
      console.error("No correct option found for this question");
    }
  };

  // Next Question
  const nextQuestion = () => {
    if (questionIndex < quizs.length - 1) {
      setSelectedAnswer('');
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizStarted(false);
      setShowResult(true);
    }
  };

  // Restart Quiz
  const startOver = () => {
    setShowResult(true);
    setQuizStarted(true);
    setMarks(0);
    setQuestionIndex(0);
    setSelectedAnswer('');
  };

  return (
    <DataContext.Provider
      value={{
        showStart,
        quizStarted,
        startQuiz,
        showResult,
        question,
        checkAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        marks,
        startOver,
        quizs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
