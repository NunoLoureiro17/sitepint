import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AreaNegocioCriar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    NOMEAREANEGOCIO: '',
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVoltar = () => {
    navigate('/AreaNegocio');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://bacnkend.onrender.com/areanegocio/create', formData);
      console.log('Área de Negócio criada com sucesso!');
      navigate('/AreaNegocio');
    } catch (error) {
      console.log('Erro ao criar área de negócio:', error);
    }
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="area-negocio-criar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Área de Negócio</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <Form.Group controlId="formNome">
            <Form.Label className="label-left">Nome da Área de Negócio</Form.Label>
            <Form.Control
              type="text"
              name="NOMEAREANEGOCIO"
              value={formData.NOMEAREANEGOCIO}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Criar Área de Negócio</Button>
        </Form>
      </div>
    </Container>
  );
}

export default AreaNegocioCriar;
