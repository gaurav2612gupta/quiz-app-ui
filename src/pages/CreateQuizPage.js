import React, { useState } from 'react';
import { Form, Button, Container, Alert, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quizLink, setQuizLink] = useState('');

  const handleNumQuestionsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumQuestions(num);
    setQuestions(Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      questionTitle: '',
      options: ['', '', '', ''],
      correctOption: ''
    })));
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionTitle = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOption = optionIndex;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedQuestions = questions.map((question) => ({
      questionTitle: question.questionTitle,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
    }));

    const correctResponseList = questions.map((question, index) => ({
      question: question.questionTitle,
      response: question.options[question.correctOption],
    }));

    const requestBody = {
      quizTitle,
      questionList: formattedQuestions,
      correctResponseList,
    };

    try {
      console.log(requestBody)
      const response = await axios.post('http://localhost:8765/quiz-service/quiz/createcustom', requestBody);
      console.log("response : ", response.data);
      setQuizLink("http://localhost:3000/quiz/custom/" + btoa(response.data));
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quizLink);
    alert('Link copied to clipboard!');
  };

  return (
    <Container>
      <h1 className="my-4">Create a Quiz</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="quizTitle">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="numQuestions">
          <Form.Label>Number of Questions</Form.Label>
          <Form.Control
            type="number"
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            min="1"
            required
          />
        </Form.Group>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <Form.Group controlId={`question-${index}`}>
              <Form.Label className='mt-1'>Question {index + 1}</Form.Label>
              <Form.Control
                type="text"
                value={question.questionTitle}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                required
              />
            </Form.Group>
            {question.options.map((option, optionIndex) => (
              <Form.Group key={optionIndex} controlId={`option-${index}-${optionIndex}`}>
                <InputGroup className='mt-1'>
                  <InputGroup.Text>Option {optionIndex + 1}</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    required
                  />
                  <InputGroup.Radio
                    name={`correctOption-${index}`}
                    value={optionIndex}
                    checked={question.correctOption === optionIndex}
                    onChange={() => handleCorrectOptionChange(index, optionIndex)}
                  />
                  <InputGroup.Text>Correct</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            ))}
          </div>
        ))}
        <Button variant="primary" type="submit" className='mt-2'>
          Create Quiz
        </Button>
      </Form>
      {quizLink && (
        <Alert variant="success" className="mt-4">
          <p>Quiz Created! Here is your quiz link:</p>
          <InputGroup>
            <FormControl
              type="text"
              value={quizLink}
              readOnly
            />
            <Button variant="outline-secondary" onClick={handleCopy}>
              Click to Copy
            </Button>
          </InputGroup>
        </Alert>
      )}
    </Container>
  );
};

export default CreateQuiz;
