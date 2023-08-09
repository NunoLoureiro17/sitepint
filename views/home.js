import React, { useState, useEffect } from 'react';
import { Carousel, Card  , Link} from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams , useNavigate } from 'react-router-dom';

function MainPage() {

  const navigate = useNavigate();

  return (

    <div className="main-page">

      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/imagens/carrossel1.png" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Explora o teu talento e coloca-o à prova connosco!</h5>
              <p>Aqui tens a oportunidade de desenvolver skills, adquirir conhecimentos e trabalhar com uma equipa dinâmica.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/imagens/carrossel1.png" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Soluções integradas e à medida do cliente!</h5>
              <p>Procuramos satisfazer as necessidades de negócio dos nossos clientes, reforçando a relação de parceria.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/imagens/carrossel1.png" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Especialistas em serviços de gestão aplicacional e de infraestruturas!</h5>
              <p>O sucesso da Softinsa tem como base a inovação e a capacidade de nos reinventarmos continuamente.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <br></br>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-3 col-sm-6 mb-3" >
          <Card>
              <Card.Body>
                <Card.Title><p class="titulo">Quem somos</p></Card.Title>
                {<p>
                  Informe-se sobre nós!
                </p>}
                <div className="mt-3 d-flex justify-content-end">
                  <button onClick={() => navigate(`/Sobre`)} className="btn btn-primary" style={{ backgroundColor: '#15659F', color: 'white' }}>Ver mais</button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 mb-3">
          <Card>
              <Card.Body>
                <Card.Title><p class="titulo">Centros</p></Card.Title>
                {<p>
                  Veja o mais próximo de si!
                </p>}
                <div className="mt-3 d-flex justify-content-end">
                  <button  onClick={() => navigate(`/Sobre`)} className="btn btn-primary" style={{ backgroundColor: '#15659F', color: 'white' }}>Ver mais</button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 mb-3">
          <Card>
              <Card.Body>
                <Card.Title><p class="titulo">Negócios</p></Card.Title>
                {<p>
                  Confira os negócios disponíveis!
                </p>}
                <div className="mt-3 d-flex justify-content-end">
                  <button onClick={() => navigate(`/Negocios`)} className="btn btn-primary" style={{ backgroundColor: '#15659F', color: 'white' }}>Ver mais</button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 mb-3">
          <Card>
              <Card.Body>
                <Card.Title><p class="titulo">Contactos</p></Card.Title>
                {<p>
                  Precisa de ajuda com algo?
                </p>}
                <div className="mt-3 d-flex justify-content-end">
                  <button onClick={() => navigate(`/Sobre`)} className="btn btn-primary" style={{ backgroundColor: '#15659F', color: 'white' }}>Ver mais</button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <Card.Title><p class="titulo">Mais ideias!</p></Card.Title>
                {<p>É hora de dar voz às suas ideias! Não fique mais quieto, compartilhe a sua visão e contribua para o sucesso da empresa.
                  Se tem uma ideia para melhorar os nossos processos, produtos ou serviços, não hesite em submetê-la. Juntos, podemos alcançar grandes coisas!</p>}
                <div className="mt-3 d-flex justify-content-end">
                  <button onClick={() => navigate(`/Ideias/Criar`)} className="btn btn-primary" style={{ backgroundColor: '#15659F', color: 'white' }}>Envie a sua ideia!</button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <Card.Title><p class="titulo">Benefícios</p></Card.Title>
                {<p>
                  Quer saber do que pode beneficiar ao se juntar à Softinsa? Confira já todos os beneficios disponíveis, junte-se a nós e comece já a desfrutar!
                  <br></br><br></br><br></br>
                </p>}
                <div className="mt-3 d-flex justify-content-end">
                  <button onClick={() => navigate(`/Beneficios`)} className="btn btn-primary" style={{ backgroundColor: '#15659F', color: 'white' }}>Ver mais</button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
