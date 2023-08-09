  import React, { useState, useEffect } from 'react';
  import { Col, Row, Container, Card, Pagination, Button, Form, Dropdown } from 'react-bootstrap';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import '../../App.css';

  function Ideias() {
    const [ideias, setIdeias] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filteredIdeias, setFilteredIdeias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ideiasPerPage] = useState(3); // Quantidade de ideias por página
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    useEffect(() => {
      const fetchIdeias = async () => {
        try {
          const response = await axios.get('https://bacnkend.onrender.com/ideias/list');
          const data = response.data;
          setIdeias(data);
          setFilteredIdeias(data);
          setTotalPages(Math.ceil(data.length / ideiasPerPage));
        } catch (error) {
          console.log('Error fetching ideias:', error);
        }
      };

      const fetchCategorias = async () => {
        try {
          const response = await axios.get('https://bacnkend.onrender.com/categoriaideias/list');
          const data = response.data;
          setCategorias(data);
        } catch (error) {
          console.log('Error fetching categorias:', error);
        }
      };

      fetchIdeias();
      fetchCategorias();
    }, [ideiasPerPage]);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleSearch = () => {
      const filtered = ideias.filter((ideia) =>
        ideia.TITULO.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIdeias(filtered);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filtered.length / ideiasPerPage));
    };

    const handleCategoriaChange = (categoria) => {
      setSelectedCategoria(categoria);
      if (categoria === 'nenhum') {
        setFilteredIdeias(ideias);
      } else {
        const filtered = ideias.filter((ideia) => ideia.IDCATEGORIAIDEIA === categoria.IDCATEGORIAIDEIA);
        setFilteredIdeias(filtered);
      }
      setCurrentPage(1);
      setTotalPages(Math.ceil(filteredIdeias.length / ideiasPerPage));
    };

    const clearFilters = () => {
      setSelectedCategoria(null);
      setFilteredIdeias(ideias);
      setCurrentPage(1);
      setTotalPages(Math.ceil(ideias.length / ideiasPerPage));
    };

    const indexOfLastIdeia = currentPage * ideiasPerPage;
    const indexOfFirstIdeia = indexOfLastIdeia - ideiasPerPage;
    const currentIdeias = filteredIdeias.slice(indexOfFirstIdeia, indexOfLastIdeia);
    
    return (
      <Container>
        <br />
        <br />
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Ideias</h1>
        <br />
        <Row>
        <div className="ideias-list row">
          <div className="mb-3 d-flex justify-content-between">
            <Col md={4}>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Pesquisar ideias"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%' }}
                />
                <Button variant="primary" onClick={handleSearch} style={{ backgroundColor: '#15659F', marginLeft: '10px' }}>
                  Pesquisar
                </Button>
                &nbsp;
              </div>
            
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ backgroundColor: '#15659F' }}>
                  {selectedCategoria ? selectedCategoria.NOMECATEGORIA : 'Filtrar por Categoria'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categorias.map((categoria) => (
                    <Dropdown.Item
                      key={categoria.IDCATEGORIAIDEIA}
                      onClick={() => handleCategoriaChange(categoria)}
                    >
                      {categoria.NOMECATEGORIA}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={2} className="d-flex align-items-center justify-content-end">
              <Button variant="link" onClick={clearFilters} style={{ color: '#15659F' }}>
                Limpar filtros
              </Button>
            </Col>
          </div>
        </div>
      </Row>
  <br />
    
        {currentIdeias && currentIdeias.length > 0 ? (
          currentIdeias.map((ideia) => (
            <div key={ideia.IDIDEIA} className="col-md-12">
              <Card className="ideia-card">
                <Card.Body>
                  <Card.Title style={{ color: '#15659F', textAlign: 'left' }}>
                    {ideia.TITULO}
                    <br />
                    <small className="text-muted">
                      {new Date(ideia.DATA).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </small>
                  </Card.Title>
                  <Card.Text className="descricao">
                    {ideia.DESCRICAO.length > 50 ? ideia.DESCRICAO.substring(0, 50) + '...' : ideia.DESCRICAO}
                  </Card.Text>
                  <div style={{ textAlign: 'right' }}>
                    <Link to={`/Ideias/Detalhes/${ideia.IDIDEIA}`}>
                      <Button variant="primary" style={{ backgroundColor: '#15659F' }}>Ver mais</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              <br />
            </div>
          ))
        ) : (
          <p>Nenhuma ideia encontrada.</p>
        )}
    
          
          <Pagination className="mt-3 justify-content-center">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
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
              disabled={indexOfLastIdeia >= filteredIdeias.length}
              />
              <Pagination.Last
              onClick={() => handlePageChange(Math.ceil(filteredIdeias.length / ideiasPerPage))}
              disabled={currentPage === Math.ceil(filteredIdeias.length / ideiasPerPage)}
              />
          </Pagination>

          <Link to="/Ideias/Criar">
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

  export default Ideias;
