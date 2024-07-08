import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const QuizPage = () => {
  const [quizId, setQuizId] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const quizTopic = queryParams.get('topic');
  const noOfQuestions = parseInt(queryParams.get('questions'), 10);
  const quizTitle = quizTopic ? `${quizTopic} Test` : '';

  useEffect(() => {
    if (quizTopic && noOfQuestions) {
      createQuiz();
    } else {
      setLoading(false);
      setError('Missing query parameters');
    }
  }, [quizTopic, noOfQuestions]);

  const createQuiz = async () => {
    const payload = {
      topic: quizTopic,
      quizTitle,
      noOfQuestions
    };

    try {
      const response = await axios.post('http://localhost:8765/quiz-service/quiz/create', payload);
      setQuizId(response.data);
      fetchQuiz(response.data);
    } catch (error) {
      handleRequestError(error, 'Error creating quiz');
    }
  };

  const fetchQuiz = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8765/quiz-service/quiz/getQuiz/${id}`);
      setQuizData(response.data);
      initializeResponses(response.data);
      setLoading(false);
    } catch (error) {
      handleRequestError(error, 'Error fetching quiz');
    }
  };
  
  const initializeResponses = (data) => {
    const initialResponses = data.map(question => ({
      id: question.id,
      response: ''
    }));
    setResponses(initialResponses);
  };

  const handleResponseChange = (questionId, option) => {
    setResponses(prevResponses =>
      prevResponses.map(response =>
        response.id === questionId ? { ...response, response: option } : response
      )
    );
  };
  
  const submitQuiz = async () => {
    try {
      const response = await axios.post(`http://localhost:8765/quiz-service/quiz/submit/${quizId}`, responses);
      setScore(response.data);
    } catch (error) {
      handleRequestError(error, 'Error submitting quiz');
    }
  };

  const handleRequestError = (error, defaultMessage) => {
    setLoading(false);
    if (error.response) {
      setError(`${defaultMessage}: ${error.response.data.message}`);
      console.error('Server error:', error.response.data);
    } else if (error.request) {
      setError(`${defaultMessage}: No response from server`);
      console.error('No response error:', error.request);
    } else {
      setError(`${defaultMessage}: ${error.message}`);
      console.error('Error:', error.message);
    }
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Its time to check your {quizTopic} Knowledge </h1>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && quizData.length > 0 && (
        <div>
          <Form onSubmit={(e) => { e.preventDefault(); submitQuiz(); }}>
            {quizData.map((question, index) => (
              <Card key={index} className="mb-4">
                <Card.Body>
                  <Card.Title>{question.questionTitle}</Card.Title>
                  <Form.Group>
                    {['option1', 'option2', 'option3', 'option4'].map((option, optIndex) => (
                      <Form.Check
                        key={optIndex}
                        type="radio"
                        id={`question-${question.id}-${optIndex}`}
                        label={question[option]}
                        checked={responses.find(r => r.id === question.id)?.response === question[option]}
                        onChange={() => handleResponseChange(question.id, question[option])}
                      />
                    ))}
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
            <Button variant="primary" type="submit" className='mb-5'>Submit Quiz</Button>
          </Form>
        </div>
      )}
      {score !== null && (
        <Alert variant="success" className="mt-4">Your Score: {score}</Alert>
      )}
    </Container>
  );
};

export default QuizPage;
