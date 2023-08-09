import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Button, Form, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function Negocios() {
  const [negocios, setNegocios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [negociosPerPage] = useState(3); // Quantidade de negócios por página
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/Negocios/list');
        const data = response.data;
        setNegocios(data);
        setTotalPages(Math.ceil(data.length / negociosPerPage));
      } catch (error) {
        console.log('Error fetching negocios:', error);
      }
    };

    fetchNegocios();
  }, [negociosPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    // Filtrar negócios pelo título
    const filtered = negocios.filter((negocio) =>
      negocio.TITULO.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNegocios(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / negociosPerPage));
  };

  const indexOfLastNegocio = currentPage * negociosPerPage;
  const indexOfFirstNegocio = indexOfLastNegocio - negociosPerPage;
  const currentNegocios = negocios.slice(indexOfFirstNegocio, indexOfLastNegocio);

  return (
<Container>
  <br />
  <br />
  <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Negócios</h1>
  <br />
        <Row>
          <Col>
            <div className="negocios-list">
              <div className="mb-3 d-flex justify-content-between">
                <Col md={4} className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    placeholder="Pesquisar negócios"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </Col>

                <Col md={4} className="d-flex align-items-center">
                  <Button
                    variant="primary"
                    onClick={handleSearch}
                    style={{ backgroundColor: '#15659F', marginLeft: '10px' }}
                  >
                    Pesquisar
                  </Button>
                </Col>
                
                <Col md={6} className="d-flex align-items-left">
                  <Button
                    variant="primary"
                    onClick={() => navigate('/AreaNegocio')}
                    style={{ backgroundColor: '#15659F', marginLeft: '10px' }}
                  >
                    Lista de Área de Negócios
                  </Button>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      {currentNegocios && currentNegocios.length > 0 ? (
        <Row>
          {currentNegocios.map((negocio) => (
            <Col key={negocio.IDNEGOCIO} md={12}>
              <Card className="negocio-card">
                <Card.Body>
                  <Card.Title style={{ color: '#15659F', textAlign: 'left' }}>
                    {negocio.TITULO}
                    <br />
                    <small className="text-muted">
                      {new Date(negocio.DATAINICIOSERVICO).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </small>
                  </Card.Title>
                  <Card.Text className="descricao">
                    {negocio.DESCRICAO.length > 50
                      ? negocio.DESCRICAO.substring(0, 50) + '...'
                      : negocio.DESCRICAO}
                  </Card.Text>
                  <div style={{ textAlign: 'right' }}>
                    <Link to={`/Negocios/Detalhes/${negocio.IDNEGOCIO}`}>
                      <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
                        Ver mais
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              <br />
            </Col>
          ))}
        </Row>
      ) : (
        <p>Nenhum negócio encontrado.</p>
      )}

      <Pagination className="mt-3 justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastNegocio >= negocios.length}
        />
        <Pagination.Last
          onClick={() => handlePageChange(Math.ceil(negocios.length / negociosPerPage))}
          disabled={currentPage === Math.ceil(negocios.length / negociosPerPage)}
        />
      </Pagination>
      <Link to="/Negocios/Criar">
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
       </Container>
  );
}

export default Negocios;
