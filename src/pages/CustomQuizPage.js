import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Spinner, Alert, Form, Card, Button } from 'react-bootstrap';

const QuizPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [quizTopic, setQuizTopic] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8765/quiz-service/quiz/getcustom/${id}`
        );
        console.log(response.data);
        const { questions, quizTitle } = response.data;
        setQuizData(questions || []);
        setQuizTopic(quizTitle || '');
        setResponses(questions?.map(q => ({ question: q.questionTitle, response: '' })) || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch quiz data:', err);
        setError('Failed to fetch quiz data');
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleResponseChange = (questionTitle, response) => {
    setResponses(prevResponses =>
      prevResponses.map(r => (r.question === questionTitle ? { ...r, response } : r))
    );
  };

  const submitQuiz = async () => {
    console.log("responses : ", responses)
    try {
      const response = await axios.post(
        `http://localhost:8765/quiz-service/quiz/submitcustom/${id}`,
        responses
      );

      if (response.status !== 200) {
        throw new Error(`Failed to submit quiz: ${response.statusText}`);
      }

      console.log(response.data);
      setScore(response.data);
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      setError('Failed to submit quiz');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h1 className="mt-4 mb-4">It's time to check your {quizTopic} Knowledge</h1>
      <Form onSubmit={(e) => { e.preventDefault(); submitQuiz(); }}>
        {quizData?.map((question, index) => (
          <Card key={index} className="mb-4">
            <Card.Body>
              <Card.Title>{question.questionTitle}</Card.Title>
              <Form.Group>
                {['option1', 'option2', 'option3', 'option4'].map(
                  (option, optIndex) => (
                    <Form.Check
                      key={optIndex}
                      type="radio"
                      id={`question-${question.id}-${optIndex}`}
                      label={question[option]}
                      checked={
                        responses.find(r => r.question === question.questionTitle)?.response ===
                        question[option]
                      }
                      onChange={() =>
                        handleResponseChange(question.questionTitle, question[option])
                      }
                    />
                  )
                )}
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
        <Button variant="primary" type="submit" className="mb-5">
          Submit Quiz
        </Button>
      </Form>
      {score !== null && (
        <Alert variant="success" className="mt-4">
          Your Score: {score}
        </Alert>
      )}
    </Container>
  );
};

export default QuizPage;
