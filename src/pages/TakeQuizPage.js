import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup} from 'react-bootstrap';
import javaLogo from '../assets/images/java.png';
import jsLogo from '../assets/images/js.png';
import pythonLogo from '../assets/images/python.png';
import htmlLogo from '../assets/images/html.png';
import sqlLogo from '../assets/images/sql.png';
import { useNavigate } from 'react-router-dom';


function TakeQuizPage() {
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const topics = [
    { name: 'Java', logo: javaLogo },
    { name: 'JavaScript', logo: jsLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'HTML', logo: htmlLogo },
    { name: 'SQL', logo: sqlLogo },
  ];
  const [questionCounts, setQuestionCounts] = useState(
    topics.reduce((acc, topic) => ({ ...acc, [topic.name]: 5 }), {})
  );

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const extractQuizIdFromLink = (link) => {
    // Logic to extract the quiz ID from the link
    const regex = /quiz\/custom\/([a-zA-Z0-9-]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const handleStartQuizWithLink = () => {
    console.log(`Starting quiz with link: ${link}`);
    if(link) {
        const quizId = extractQuizIdFromLink(link); // Function to extract quiz ID from the link
        navigate(`../quiz/custom/${quizId}`)
    }
  };

  const handleStartQuizWithTopic = (topic) => {
    console.log(`Starting ${topic} quiz with ${questionCounts[topic]} questions`);
    const numberOfQuestions = questionCounts[topic];
    navigate(`/quiz?topic=${encodeURIComponent(topic)}&questions=${numberOfQuestions}`);
  };

  const increaseCount = (topic) => {
    setQuestionCounts((prev) => ({ ...prev, [topic]: prev[topic] + 1 }));
  };

  const decreaseCount = (topic) => {
    setQuestionCounts((prev) => ({
      ...prev,
      [topic]: Math.max(1, prev[topic] - 1),
    }));
  };

  return (
    <Container className="mt-5">
      <h1>Take Quiz</h1>

      <Row className="mb-4">
        <Col>
          <h2>Start Quiz with a Link</h2>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Paste quiz link here"
              value={link}
              onChange={handleLinkChange}
            />
            <Button variant="primary" onClick={handleStartQuizWithLink}>
              Start Quiz
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Test Your Knowledge</h2>
          <Row>
            {topics.map((topic) => (
              <Col key={topic.name} md={4} className="mb-3">
                <Card className="text-center">
                  <Card.Img variant="top" src={topic.logo} alt={topic.name} style={{ height: '100px', objectFit: 'contain' }} />
                  <Card.Body>
                    <Card.Title>{topic.name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Button variant="outline-secondary" onClick={() => decreaseCount(topic.name)}>
                        -
                      </Button>
                      <span>{questionCounts[topic.name]} Questions</span>
                      <Button variant="outline-secondary" onClick={() => increaseCount(topic.name)}>
                        +
                      </Button>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => handleStartQuizWithTopic(topic.name)}
                    >
                      Start Quiz
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default TakeQuizPage;
