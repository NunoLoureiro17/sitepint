import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CandidaturasFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const idFromURL = location.pathname.split('/').pop();

  const [candidatura, setCandidatura] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchCandidatura = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/candidaturas/get/${id}`);
        setCandidatura(response.data);
        setFeedback(response.data.FEEDBACK);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCandidatura();
  }, [id]);

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://bacnkend.onrender.com/candidaturas/update/${id}`, {
        FEEDBACK: feedback,
      });

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="candidaturas-criar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Enviar Feedback</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <br />
          <Row>
            <Col md={12}>
              <Form.Group controlId="formFeedback">
                <Form.Label className="label-left">Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Enviar Feedback
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CandidaturasFeedback;