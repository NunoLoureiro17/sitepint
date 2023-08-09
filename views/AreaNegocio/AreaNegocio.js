import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function AreaNegocioList() {
  const [areasNegocio, setAreasNegocio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalAreasNegocio, setOriginalAreasNegocio] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreasNegocio = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/areaNegocio/list');
        setAreasNegocio(response.data);
        setOriginalAreasNegocio(response.data);
      } catch (error) {
        console.log('Error fetching areas de negocio:', error);
      }
    };

    fetchAreasNegocio();
  }, []);

  const handleEdit = (id) => {
    navigate(`/AreaNegocio/Editar/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Tem certeza de que deseja remover esta área de negócio?');
    if (!confirmed) return;

    try {
      await axios.delete(`https://bacnkend.onrender.com/areaNegocio/delete/${id}`);
      const updatedAreasNegocio = areasNegocio.filter((area) => area.IDAREANEGOCIO !== id);
      setAreasNegocio(updatedAreasNegocio);
    } catch (error) {
      console.log('Error deleting area de negocio:', error);
    }
  };

  const handleSearch = () => {
    const filtered = originalAreasNegocio.filter((area) =>
      area.NOMEAREANEGOCIO.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAreasNegocio(filtered);
  };

  return (
    <Container>
      <br />
      <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
        Áreas de Negócio
      </h1>
      <br />
      <Row>
        <Col md={4}>
          <Form.Group className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Pesquisar áreas de negócio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={handleSearch}
              style={{ backgroundColor: '#15659F', marginLeft: '10px' }}
            >
              Pesquisar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row>
        {areasNegocio.map((area) => (
          <Col key={area.IDAREANEGOCIO} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{area.NOMEAREANEGOCIO}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(area.IDAREANEGOCIO)}
                  style={{ backgroundColor: '#15659F', marginTop: '10px', marginRight: '5px' }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(area.IDAREANEGOCIO)}
                  style={{ marginTop: '10px' }}
                >
                  Remover
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
     <Link to="/AreaNegocio/Criar">
        <svg
          width="39"
          height="37"
          viewBox="0 0 39 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: '20px' }}
        >
          <g clipPath="url(#clip0_536_562799)">
            <path
              d="M39 18.5C39 23.4065 36.9455 28.1121 33.2886 31.5815C29.6316 35.0509 24.6717 37 19.5 37C14.3283 37 9.36838 35.0509 5.71142 31.5815C2.05446 28.1121 0 23.4065 0 18.5C0 13.5935 2.05446 8.88795 5.71142 5.41852C9.36838 1.9491 14.3283 0 19.5 0C24.6717 0 29.6316 1.9491 33.2886 5.41852C36.9455 8.88795 39 13.5935 39 18.5V18.5ZM20.7188 10.4062C20.7188 10.0996 20.5903 9.8055 20.3618 9.58866C20.1332 9.37182 19.8232 9.25 19.5 9.25C19.1768 9.25 18.8668 9.37182 18.6382 9.58866C18.4097 9.8055 18.2812 10.0996 18.2812 10.4062V17.3438H10.9688C10.6455 17.3438 10.3355 17.4656 10.107 17.6824C9.8784 17.8992 9.75 18.1933 9.75 18.5C9.75 18.8067 9.8784 19.1008 10.107 19.3176C10.3355 19.5344 10.6455 19.6562 10.9688 19.6562H18.2812V26.5938C18.2812 26.9004 18.4097 27.1945 18.6382 27.4113C18.8668 27.6282 19.1768 27.75 19.5 27.75C19.8232 27.75 20.1332 27.6282 20.3618 27.4113C20.5903 27.1945 20.7188 26.9004 20.7188 26.5938V19.6562H28.0312C28.3545 19.6562 28.6645 19.5344 28.893 19.3176C29.1216 19.1008 29.25 18.8067 29.25 18.5C29.25 18.1933 29.1216 17.8992 28.893 17.6824C28.6645 17.4656 28.3545 17.3438 28.0312 17.3438H20.7188V10.4062Z"
              fill="#15659F"
            />
          </g>
          <defs>
            <clipPath id="clip0_536_562799">
              <rect width="39" height="37" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </Link>
    </Container>
  );
}

export default AreaNegocioList;
