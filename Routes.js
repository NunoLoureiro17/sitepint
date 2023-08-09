import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Imagem from './views/mostrarimagem';
import MainPage from './views/home.js';
import Oportunidades from './views/Oportunidades/Oportunidades';
import OportunidadesCriar from './views/Oportunidades/OportunidadesCriar';
import OportunidadesEditar from './views/Oportunidades/OportunidadesEditar';
import OportunidadesDetalhes from './views/Oportunidades/OportunidadesDetalhes';
import Beneficios from './views/Beneficios/Beneficios';
import BeneficiosCriar from './views/Beneficios/BeneficiosCriar';
import BeneficiosEditar from './views/Beneficios/BeneficiosEditar';
import BeneficiosDetalhes from './views/Beneficios/BeneficiosDetalhes';
import ListaCandidaturas from './views/Candidaturas/Candidaturas';
import CandidaturasCriar from './views/Candidaturas/CandidaturasCriar';
import CandidaturasEditar from './views/Candidaturas/CandidaturasEditar';
import CandidaturasDetalhes from './views/Candidaturas/CandidaturasDetalhes';
import Ideias from './views/Ideias/Ideias';
import IdeiasEditar from './views/Ideias/IdeiasEditar';
import IdeiasCriar from './views/Ideias/IdeiasCriar';
import IdeiasDetalhes from './views/Ideias/IdeiasDetalhes';
import Vagas from './views/Vagas/Vagas';
import VagasCriar from './views/Vagas/VagasCriar';
import VagasEditar from './views/Vagas/VagasEditar';
import VagasDetalhes from './views/Vagas/VagasDetalhes';
import NegociosCriar from './views/Negocios/NegociosCriar';
import NegociosEditar from './views/Negocios/NegociosEditar';
import NegociosDetalhes from './views/Negocios/NegociosDetalhes';
import Negocios from './views/Negocios/Negocios';
import Entrevistas from './views/Entrevistas/Entrevistas';
import EntrevistasCriar from './views/Entrevistas/EntrevistasCriar';
import EntrevistasEditar from './views/Entrevistas/EntrevistasEditar';
import EntrevistasDetalhes from './views/Entrevistas/EntrevistasDetalhes';
import InteracoesNegocios from './views/InteracoesNegocios/InteracoesNegocios';
import InteracoesNegociosCriar from './views/InteracoesNegocios/InteracoesNegociosCriar';
import InteracoesNegociosEditar from './views/InteracoesNegocios/InteracoesNegociosEditar';
import InteracoesNegociosDetalhes from './views/InteracoesNegocios/InteracoesNegociosDetalhes';
import InteracoesOportunidades from './views/InteracoesOportunidades/InteracoesOportunidades';
import InteracoesOportunidadesCriar from './views/InteracoesOportunidades/InteracoesOportunidadesCriar';
import InteracoesOportunidadesEditar from './views/InteracoesOportunidades/InteracoesOportunidadesEditar';
import InteracoesOportunidadesDetalhes from './views/InteracoesOportunidades/InteracoesOportunidadesDetalhes';
import Recomendacoes from './views/Recomendacoes/Recomendacoes';
import RecomendacoesCriar from './views/Recomendacoes/RecomendacoesCriar';
import RecomendacoesEditar from './views/Recomendacoes/RecomendacoesEditar';
import RecomendacoesDetalhes from './views/Recomendacoes/RecomendacoesDetalhes';
import Reunioes from './views/Reunioes/Reunioes';
import ReunioesCriar from './views/Reunioes/ReunioesCriar';
import ReunioesEditar from './views/Reunioes/ReunioesEditar';
import ReunioesDetalhes from './views/Reunioes/ReunioesDetalhes';
import PaineldeControlo from './views/PaineldeControlo/PaineldeControlo';
import PaineldeControloCriar from './views/PaineldeControlo/PaineldeControloCriar';
import PaineldeControloEditar from './views/PaineldeControlo/PaineldeControloEditar';
import PaineldeControloDetalhes from './views/PaineldeControlo/PaineldeControloDetalhes';
import AreaNegocio from './views/AreaNegocio/AreaNegocio';
import AreaNegocioCriar from './views/AreaNegocio/AreaNegocioCriar';
import AreaNegocioEditar from './views/AreaNegocio/AreaNegocioEditar';
import AreaNegocioDetalhes from './views/AreaNegocio/AreaNegocioDetalhes';
import Sobre from './views/Sobre';
import Login from './views/Login/Login.js';
import Registo from './views/Login/Registo';
import Perfil from './views/Login/Perfil';
import PerfilEditar from './views/Login/EditarPerfil';
import AlterarPassword from './views/Login/AlterarPassword';
import CandidaturasFeedback from './views/Candidaturas/CandidaturasFeedback';
import RecuperarConta from './views/Login/RecuperarConta';
import RegistoGoogle from './views/Login/RegistoGoogle';

export const AppRoutes  = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Oportunidades" element={<Oportunidades />} />
      <Route path="/Oportunidades/Criar" element={<OportunidadesCriar />} />
      <Route path="/Oportunidades/Editar/:id" element={<OportunidadesEditar />} />
      <Route path="/Oportunidades/Detalhes/:id" element={<OportunidadesDetalhes />} />
      <Route path="/imagem" element={<Imagem />} />
      <Route path="/Beneficios" element={<Beneficios />} />
      <Route path="/Vagas" element={<Vagas />} />
      <Route path="/Vagas/Criar" element={<VagasCriar />} />
      <Route path="/Vagas/Detalhes/:id" element={<VagasDetalhes />} />
      <Route path="/Vagas/Editar/:id" element={<VagasEditar />} />
      <Route path="/Negocios" element={<Negocios />} />
      <Route path="/Negocios/Editar/:id" element={<NegociosEditar />} />
      <Route path="/Negocios/Detalhes/:id" element={<NegociosDetalhes />} />
      <Route path="/Negocios/Criar" element={<NegociosCriar />} />
      <Route path="/Ideias" element={<Ideias />} />
      <Route path="/Sobre" element={<Sobre />} />
      <Route path="/Registo" element={<Registo />} />
      <Route path="/Beneficios/detalhes/:id" element={<BeneficiosDetalhes />} />
      <Route path="/Beneficios/Criar" element={<BeneficiosCriar />} />
      <Route path="/Beneficios/Editar/:id" element={<BeneficiosEditar />} />
      <Route path="/Ideias/Detalhes/:id" element={<IdeiasDetalhes />} />
      <Route path="/Ideias/Criar" element={<IdeiasCriar />} />
      <Route path="/Ideias/Editar/:id" element={<IdeiasEditar/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/PaineldeControlo" element={<PaineldeControlo />} />
      <Route path="/PaineldeControlo/Editar/:id" element={<PaineldeControloEditar />} />
      <Route path="/PaineldeControlo/Criar" element={<PaineldeControloCriar />} />
      <Route path="/PaineldeControlo/Detalhes/:id" element={<PaineldeControloDetalhes />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/Perfil/Editar" element={<PerfilEditar />} />
      <Route path="/Perfil/AlterarPassword" element={<AlterarPassword/>} />
      <Route path="/DetalhesCandidaturas/:id/Vaga/:idvaga" element={<CandidaturasDetalhes />} />
      <Route path="/CriarCandidatura/Vaga/:id" element={<CandidaturasCriar />} />
      <Route path="/EditarCandidaturas/:id/Vaga/:idvaga" element={<CandidaturasEditar/>} />
      <Route path="/ListaCandidaturas/Vaga/:id" element={<ListaCandidaturas />} />
      <Route path="/Reunioes" element={<Reunioes />} />
      <Route path="/Reunioes/Criar" element={<ReunioesCriar />} />
      <Route path="/Reunioes/Detalhes/:id" element={<ReunioesDetalhes />} />
      <Route path="/Reunioes/Editar/:id" element={<ReunioesEditar />} />
      <Route path="/ListaRecomendacoes/Vaga/:id" element={<Recomendacoes />} />
      <Route path="/CriarRecomendacao/Vaga/:id" element={<RecomendacoesCriar />} />
      <Route path="/DetalhesRecomendacoes/:id/Vaga/:idvaga" element={<RecomendacoesDetalhes />} />
      <Route path="/EditarRecomendacao/:id" element={<RecomendacoesEditar />} /> 
      <Route path="/InteracoesNegocios/:id" element={<InteracoesNegocios />} />
      <Route path="/InteracoesNegocios/Criar/:idnegocio" element={<InteracoesNegociosCriar />} />
      <Route path="/InteracoesNegocios/Detalhes/:id" element={<InteracoesNegociosDetalhes />} />
      <Route path="/InteracoesNegocios/Editar/:id" element={<InteracoesNegociosEditar />} />
      <Route path="/InteracoesOportunidades/:idoportunidade" element={<InteracoesOportunidades />} />
      <Route path="/InteracoesOportunidades/Criar/:idoportunidade" element={<InteracoesOportunidadesCriar />} />
      <Route path="/InteracoesOportunidades/Detalhes/:id" element={<InteracoesOportunidadesDetalhes />} />
      <Route path="/InteracoesOportunidades/Editar/:id" element={<InteracoesOportunidadesEditar />} />
      <Route path="/Entrevistas" element={<Entrevistas />} />
      <Route path="/CriarEntrevista/user/:iduser/:idcandidatura" element={<EntrevistasCriar />} />
      <Route path="/Entrevista/Detalhes/:id" element={<EntrevistasDetalhes />} />
      <Route path="/Entrevista/Editar/:id" element={<EntrevistasEditar />} />
      <Route path="/AreaNegocio" element={<AreaNegocio />} />
      <Route path="/AreaNegocio/Criar" element={<AreaNegocioCriar />} />
      <Route path="/AreaNegocio/Detalhes/:id" element={<AreaNegocioDetalhes />} />
      <Route path="/AreaNegocio/Editar/:id" element={<AreaNegocioEditar />} />
      <Route path="/FeedbackCandidaturas/:id/Vaga/:idvaga" element={<CandidaturasFeedback/>} />
      <Route path="/RecuperarConta" element={<RecuperarConta/>} />
      <Route path="/RegistoGoogle" element={<RegistoGoogle/>} />
    </Routes>
  );
};