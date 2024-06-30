import React from 'react';
import { Container, Button } from 'react-bootstrap';

function HomePage() {
  return (
    <Container className="mt-5">
      <h1>Welcome to the Quiz App</h1>
      <p>This app allows you to take and create quizzes with ease.</p>
      <Button variant="primary" href="/takeQuiz" className="me-3">
        Take Quiz
      </Button>
      <Button variant="secondary" href="/createQuiz">
        Create Quiz
      </Button>
    </Container>
  );
}

export default HomePage;
