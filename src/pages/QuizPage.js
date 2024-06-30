import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function QuizPage() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null); // Placeholder for quiz data
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Example quiz data for demonstration
  useEffect(() => {
    // Fetch quiz data based on quizId (e.g., from backend)
    const fetchedQuizData = {
      quizId: quizId,
      questions: [
        {
          id: 1,
          question: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Rome'],
          correctAnswer: 'Paris',
        },
        {
          id: 2,
          question: 'Who painted the Mona Lisa?',
          options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
          correctAnswer: 'Leonardo da Vinci',
        },
      ],
    };
    setQuizData(fetchedQuizData);
  }, [quizId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    // Calculate score logic
    let score = 0;
    Object.keys(answers).forEach((questionId) => {
      if (answers[questionId] === quizData.questions.find((q) => q.id === parseInt(questionId)).correctAnswer) {
        score++;
      }
    });
    setShowResult(true);
    // Mock display of score, replace with your own logic
    alert(`Your score: ${score} / ${quizData.questions.length}`);
  };

  if (!quizData) {
    return <Container className="mt-5">Loading...</Container>;
  }

  return (
    <Container className="mt-5">
      <h1>Quiz Page - {quizData.quizId}</h1>

      <Form onSubmit={handleSubmitQuiz}>
        {quizData.questions.map((question) => (
          <div key={question.id} className="mb-4">
            <h5>{question.question}</h5>
            {question.options.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                id={`${question.id}-${index}`}
                label={option}
                name={`question-${question.id}`}
                onChange={() => handleAnswerChange(question.id, option)}
                checked={answers[question.id] === option}
              />
            ))}
          </div>
        ))}

        <Button variant="primary" type="submit">
          Submit Quiz
        </Button>
      </Form>

      {showResult && (
        <Alert variant="info" className="mt-4">
          Quiz submitted! Check your score.
        </Alert>
      )}
    </Container>
  );
}

export default QuizPage;
