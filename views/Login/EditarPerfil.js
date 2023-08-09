import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../App.css';

function EditarPerfil() {
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    NOME: '',
    CONTACTO: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.IDUTILIZADOR) {
          navigate('/Login');
          return;
        }

        const response = await axios.get('https://bacnkend.onrender.com/utilizadores/list');
        if (response.status !== 200) {
          console.log('Error fetching user data');
          return;
        }

        const user = response.data.find((user) => user.IDUTILIZADOR === userData.IDUTILIZADOR);
        if (!user) {
          navigate('/Login');
          return;
        }

        setId(user.IDUTILIZADOR);
        setFormData({
          NOME: user.NOME,
          CONTACTO: user.CONTACTO
        });
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      NOME: formData.NOME,
      CONTACTO: formData.CONTACTO
    };

    axios
      .put(`https://bacnkend.onrender.com/utilizadores/update/${id}`, updatedData)
      .then((response) => {
        console.log('User updated successfully:', response.data);
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/Perfil');
      })
      .catch((error) => {
        console.log('Error updating user:', error);
      });
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="editar-perfil">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Perfil</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formNome">
                <Form.Label className="label-left">Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="NOME"
                  value={formData.NOME}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
            </Col>
            <Col md={6}>
              <Form.Group controlId="formContacto">
                <Form.Label className="label-left">Contacto</Form.Label>
                <Form.Control
                  type="text"
                  name="CONTACTO"
                  value={formData.CONTACTO}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Button variant="light" className="mr-2" onClick={handleVoltar}>
            Voltar
          </Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Atualizar Perfil
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditarPerfil;
