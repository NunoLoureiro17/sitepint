import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { AppRoutes } from './Routes';
import { getAuth, signOut } from 'firebase/auth';

function App() {
  const navigate = useNavigate();
  const title = 'Softinsa';
  
  document.title = title;

  function logout() {
    const auth = getAuth();

    try {
      signOut(auth);
      console.log('Logout realizado com sucesso');
  
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  }

  // Função para verificar se o local storage está vazio
  function isLocalStorageEmpty() {
    return localStorage.getItem('user') === null;
  }

  return (
    <div className="App" style={{ backgroundColor: '#E1E5F5' }}>
      <div style={{ minHeight: 'calc(100vh - 70px)', position: 'relative' }}>
        <div className="container-fluid">
          <div className="row">
            <Navbar style={{ backgroundColor: '#15659F' }} variant="light" expand="lg" className="d-flex justify-content-between">
              <Navbar.Brand href="/">
                <img src="/imagens/softinsalogo.png" alt="Logo" width="150" height="45" className="d-inline-block align-top" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarSupportedContent" className="ml-auto" style={{ backgroundColor: 'white' }} />
              <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/Oportunidades" style={{ color: 'white' }}>Oportunidades</Nav.Link>
                  <Nav.Link as={Link} to="/Negocios" style={{ color: 'white' }}>Negócios</Nav.Link>
                  <Nav.Link as={Link} to="/Vagas" style={{ color: 'white' }}>Vagas/Ofertas</Nav.Link>
                  <Nav.Link as={Link} to="/Beneficios" style={{ color: 'white' }}>Benefícios</Nav.Link>
                  <Nav.Link as={Link} to="/Ideias" style={{ color: 'white' }}>Ideias</Nav.Link>
                  <Nav.Link as={Link} to="/Sobre" style={{ color: 'white' }}>Sobre</Nav.Link>
                </Nav>
                <div className="d-flex justify-content-end" style={{ width: '100%' }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#888888' }}>
                      <img src="imagens/user.png" alt="Logo" width="30" height="30" className="ml-3" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ right: 0, left: 'auto' }}>
                      {isLocalStorageEmpty() ? (
                        <>
                          <Link onClick={() => navigate(`/Login`)}><Dropdown.Item>Login</Dropdown.Item></Link>
                          <Link onClick={() => navigate(`/Registo`)}><Dropdown.Item>Registo</Dropdown.Item></Link>
                        </>
                      ) : (
                        <>
                          <Link onClick={() => navigate(`/Perfil`)}><Dropdown.Item>Perfil</Dropdown.Item></Link>
                          <Link onClick={() => navigate(`/Entrevistas`)}><Dropdown.Item>Lista de Entrevistas</Dropdown.Item></Link>
                          <Link onClick={() => navigate(`/Reunioes`)}><Dropdown.Item>Lista de Reuniões</Dropdown.Item></Link>
                          <Link onClick={() => navigate(`/PaineldeControlo`)}><Dropdown.Item>Painel de Controlo</Dropdown.Item></Link>
                          <Link onClick={logout}><Dropdown.Item>Logout</Dropdown.Item></Link>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
        <AppRoutes />
      </div>
      <br />
      <footer className="fixed-footer" style={{ backgroundColor: '#8fb2d3', color: 'black', padding: '20px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>© Softinsa 2023. Todos os direitos reservados</p>
            </div>
            <div className="col-12">
              <div className="social-media-logos">
                <a href="https://www.instagram.com/softinsa/">
                  <img src={"imagens/instagram-logo.png"} alt="Instagram" className="logo" /> 
                </a>
                <a href="https://www.facebook.com/softinsapt/">
                  <img src={"imagens/facebook-logo.png"} alt="Facebook" className="logo" />
                </a>
                <a href="https://www.linkedin.com/company/softinsa/">
                  <img src={"imagens/linkedin-logo.png"} alt="LinkedIn" className="logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
