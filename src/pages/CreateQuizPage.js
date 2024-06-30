import React, { useState } from 'react';
import { Container, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state, replace with actual authentication logic
  const [quizData, setQuizData] = useState({
    topic: '',
    description: '',
    numberOfQuestions: 5,
    questions: [],
  });
  const [shareableLink, setShareableLink] = useState('');
  const [showLinkCopiedAlert, setShowLinkCopiedAlert] = useState(false);

  const handleLoginPrompt = () => {
    return (
      <Container className="mt-5">
        <Alert variant="info">
          You need to <Alert.Link href="/login">log in</Alert.Link> for creating a quiz.
        </Alert>
      </Container>
    );
  };

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    // Handle quiz creation logic here, e.g., save to database
    // Mock logic for generating shareable link
    const link = `https://example.com/quiz/${quizData.topic.replace(/\s+/g, '-')}`;
    setShareableLink(link);
    const quizId = 'unique-quiz-id'; // Replace with actual logic to get unique identifier
    // Redirect to quiz page with quizId
    navigate(`/quiz/${quizId}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setShowLinkCopiedAlert(true);
    setTimeout(() => setShowLinkCopiedAlert(false), 3000); // Hide alert after 3 seconds
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-5">
      {!isLoggedIn && handleLoginPrompt()}

      {isLoggedIn && (
        <div>
          <h1>Create Quiz</h1>
          <Form onSubmit={handleCreateQuiz}>
            <Form.Group controlId="topic">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter topic"
                name="topic"
                value={quizData.topic}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={quizData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="numberOfQuestions">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of questions"
                name="numberOfQuestions"
                value={quizData.numberOfQuestions}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Additional logic for adding questions and options */}

            <Button variant="primary" type="submit">
              Create Quiz
            </Button>
          </Form>

          {shareableLink && (
            <div className="mt-3">
              <p>Shareable Link:</p>
              <InputGroup className="mb-3">
                <Form.Control type="text" value={shareableLink} readOnly />
                <Button variant="outline-secondary" onClick={handleCopyLink}>
                  Copy Link
                </Button>
              </InputGroup>

              {showLinkCopiedAlert && (
                <Alert variant="success" className="mt-2">
                  Link copied to clipboard!
                </Alert>
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default CreateQuiz;
