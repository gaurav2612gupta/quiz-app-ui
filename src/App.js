import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TakeQuizPage from './pages/TakeQuizPage';
import CreateQuizPage from './pages/CreateQuizPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QuizPage from './pages/QuizPage';
import CustomQuizPage from './pages/CustomQuizPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/takeQuiz" element={<TakeQuizPage />} />
        <Route path="/createQuiz" element={<CreateQuizPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/custom/:id" element={<CustomQuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
