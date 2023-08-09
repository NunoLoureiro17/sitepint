import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AreaNegocioEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    NOMEAREANEGOCIO: '',
  });

  useEffect(() => {
    const fetchAreaNegocio = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/areaNegocio/list`);
        const areasNegocio = response.data;
        const areaNegocio = areasNegocio.find(area => area.IDAREANEGOCIO.toString() === id);
        if (areaNegocio) {
          setFormData(prevData => ({
            ...prevData,
            NOMEAREANEGOCIO: areaNegocio.NOMEAREANEGOCIO,
          }));
        }
      } catch (error) {
        console.log('Error fetching area de negocio:', error);
      }
    };

    fetchAreaNegocio();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    navigate('/AreaNegocio');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://bacnkend.onrender.com/areaNegocio/update/${id}`, formData);
      console.log('Área de Negócio atualizada com sucesso!');
      navigate('/AreaNegocio');
    } catch (error) {
      console.log('Erro ao atualizar área de negócio:', error);
    }
  };

  return (
    <Container>
      <br />
      <br />
      <div className="area-negocio-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Área de Negócio</h1>
        <br />
        <Form onSubmit={handleSubmit}>
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
          <Button variant="light" className="mr-2" onClick={handleCancel}>Voltar</Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Atualizar Área de Negócio</Button>
        </Form>
      </div>
    </Container>
  );
}

export default AreaNegocioEditar;
