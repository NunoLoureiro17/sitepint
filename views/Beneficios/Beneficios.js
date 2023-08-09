import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';


import BeneficiosDetalhes from './BeneficiosDetalhes';
import BeneficiosCriar from './BeneficiosCriar';


function Beneficios() {
  const [beneficios, setBeneficios] = useState([]);
  const [filteredBeneficios, setFilteredBeneficios] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiosPerPage] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const response = await fetch('https://bacnkend.onrender.com/beneficios/list');
        if (!response.ok) {
          setIsConnected(false);
          return;
        }
        const data = await response.json();
        setBeneficios(data);
        setFilteredBeneficios(data);
      } catch (error) {
        console.log(error);
        setIsConnected(false);
      }
    };

    fetchBeneficios();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredBeneficios(beneficios);
    } else {
      const filteredBeneficios = beneficios.filter((beneficio) =>
        beneficio.TITULO.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBeneficios(filteredBeneficios);
    }
  };

  // Pagination
  const indexOfLastBeneficio = currentPage * beneficiosPerPage;
  const indexOfFirstBeneficio = indexOfLastBeneficio - beneficiosPerPage;
  const currentBeneficios = filteredBeneficios.slice(indexOfFirstBeneficio, indexOfLastBeneficio);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row>
        <Col>
          <br />
          <br />
          <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Benefícios</h1>
          <br />
          <br />
          <Form.Group className="mb-3">
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Pesquisar benefícios"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px', marginRight: '10px' }}
              />
              <Button variant="primary" onClick={handleSearch} style={{ backgroundColor: '#15659F' }}>
                Pesquisar
              </Button>
            </div>
          </Form.Group>
          <br />
          <Row className="d-flex flex-wrap">
            {isConnected ? (
              currentBeneficios.map((beneficio) => (
                <Col key={beneficio.IDBENEFICIO} xs={12} sm={6} md={6} lg={4} className="mb-4">
                  <Card className="beneficio-card">
                    <Card.Body>
                      <Card.Title style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
                        {beneficio.TITULO}
                      </Card.Title>
                      <Card.Text>{beneficio.DESCRICAO}</Card.Text>
                      <div style={{ textAlign: 'right' }}>
                        <Button
                          variant="primary"
                          style={{ backgroundColor: '#15659F' }}
                          onClick={() => navigate(`/Beneficios/detalhes/${beneficio.IDBENEFICIO}`)}
                        >
                          Ver mais
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>Não foi possível conectar ao servidor. Verifique sua conexão de rede.</p>
            )}
          </Row>
          <Pagination className="mt-3 justify-content-center">
            <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: Math.ceil(filteredBeneficios.length / beneficiosPerPage) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastBeneficio >= filteredBeneficios.length}
            />
            <Pagination.Last
              onClick={() => paginate(Math.ceil(filteredBeneficios.length / beneficiosPerPage))}
              disabled={currentPage === Math.ceil(filteredBeneficios.length / beneficiosPerPage)}
            />
          </Pagination>

          <Link to="/Beneficios/Criar">
            <svg
              width="39"
              height="37"
              viewBox="0 0 39 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_536_562799)">
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
        </Col>
      </Row>
    </Container>
  );
}

export default Beneficios;