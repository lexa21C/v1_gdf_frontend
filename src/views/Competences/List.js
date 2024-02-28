import { useState, useEffect } from "react";
import axios from "axios";
import * as Reactstrap from "reactstrap";
import { NavLink as NavLinkRRD } from "react-router-dom";

import routes from "../../routes.js";

import Header from "components/Headers/HEAD.js";
import PaginationData from "../../components/Pagination/pagination.js";
import Search from "../../components/Search/search"
import Loading from "../../components/loader/loader.js"

import ALertModalCuestion from "../../components/Alert/ALertModalCuestion.js";
import Modal from "./modal.js";
import ModalDetail from "../Competences/ModalDetail.js";

const Butonn = (routeName, data, name) => {
  const matchingRoute = routes.find(route => route.name === routeName);

  if (!matchingRoute) {
    return null;
  }

  const { path, layout, icon, name: routeDisplayName } = matchingRoute;
  
  const getModifiedPath = (path, data, name) => {
    let modifiedPath = path;
    
    if (data !== null) {
      const dataStartIndex = path.indexOf('=/:');
      const dataEndIndex = path.indexOf('/&');
      modifiedPath = `${path.slice(0, dataStartIndex)}=/${data}${path.slice(dataEndIndex)}`;
    }
    
    if (name !== null) {
      const nameStartIndex = modifiedPath.indexOf('&/:');
      modifiedPath = `${modifiedPath.slice(0, nameStartIndex)}&/${name}`;
    }
    
    return modifiedPath;
  };
  
  const modifiedPath = getModifiedPath(path, data, name);

  return (
    <>
      <Reactstrap.Button
        color="primary"
        type="button"
        className="btn-neutral btn-sm"
        onClick={(e) => {
          e.preventDefault();
        }}
        id={`tooltip${data + path.length}`}
      >
        <Reactstrap.NavLink
          to={`${layout}${modifiedPath}`}
          tag={NavLinkRRD}
          activeClassName="active"
          className="p-0"
        >
          <i className={icon} />
        </Reactstrap.NavLink>
      </Reactstrap.Button>
      <Reactstrap.UncontrolledTooltip
        delay={0}
        target={`tooltip${data + path.length}`}
      >
        {routeDisplayName}
      </Reactstrap.UncontrolledTooltip>
    </>
  );
};

export default function List() {

    const [competences, setCompetences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [PerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
  
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [detail, setDetail] = useState(false);
  
    const [modal, setModal] = useState(false);
    const [type, setType] = useState(false);
    const [selectedCompetence, setSelectedCompetence] = useState(null);
    const [showAlertCuestion, setAlertCuenstion] = useState(false);
  
    const [apiDeleteCompetence, setapiDeleteCompetence] = useState('');
  
    const [typeProfile, setTypeProfile] = useState(null);
  // Pagination data
  const totalCompetences = competences.length;
  const [perPage] = useState(9);
  const lastIndex = perPage * currentPage;
  const firstIndex = lastIndex - perPage;
    const toggle = () => {
      setModal(!modal);
      setType(false);
    };
  
    const Edit = (competence) => {
      setSelectedCompetence(competence);
      setModal(true);
      setType(true);
    };
  
    const destroy = (id) => {
      setapiDeleteCompetence(`api/v1/competence/${id}`);
      setAlertCuenstion(true);
    };
  
    const handleCloseAlert = () => {
      setAlertCuenstion(false);
    };
  
    const seeDetail = (competence) => {
      setRegistroSeleccionado(competence);
    };
  
    const toggleShow = () => {
      setDetail(!detail);
      setType(false);
    };
  
    const getData = async () => {
      try {
        const response = await axios.get('api/v1/competences');
        setCompetences(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    useEffect(() => {
      getData();
      const storedTypeProfile = localStorage.getItem('User');
      const json = JSON.parse(storedTypeProfile);
      setTypeProfile(json.type_profile.map((e) => e.type_profile));
    }, [modal, showAlertCuestion]);

 
  return (
    <>
      {isLoading && <Loading />}

      <Header title1="Gestionar Competencias" />
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
              {( typeProfile === 'Administrador')  && (
                             
                <Reactstrap.Button
                  color="primary"
                  type="button"
                  className="btn-circle btn-neutral"
                  onClick={toggle}
                >
                  <i className="ni ni-fat-add" />
                </Reactstrap.Button>
                            )}


                {/* Utilizar el componente SearchBar */}
                <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Competencia"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.Table
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Codigo</th>
                    <th scope="col">Competencias</th>
                    <th scope="col">acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {competences
                    .filter((competence) =>
                      Object.values(competence)
                        .join(" ")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .slice(firstIndex, lastIndex)
                    .map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.labor_competence_code}</td>

                          <th scope="row">
                            <Reactstrap.Media className="align-items-center">
                              <div
                                className="ml-10 text-sm "
                                id={`t2${data._id}`}
                              >
                                <Reactstrap.UncontrolledTooltip
                                  target={`t2${data._id}`}
                                >
                                  {data.labor_competition}
                                </Reactstrap.UncontrolledTooltip>
                                {data.labor_competition.length > 95
                                  ? data.labor_competition.slice(0, 95) + "..."
                                  : data.labor_competition}
                              </div>
                            </Reactstrap.Media>
                          </th>
                          

                          <td>
                            <Reactstrap.UncontrolledDropdown>
                              {Butonn(
                                "Resultados de aprendizaje",
                                data._id,
                                data.labor_competition
                              )}
                            </Reactstrap.UncontrolledDropdown>
                            {typeProfile.includes("Administrador") && (
                              <>
                                {/* Edit button */}
                                <Reactstrap.Button
                                  color="primary"
                                  type="button"
                                  className="btn-neutral btn-sm"
                                  onClick={() => Edit(data)}
                                  id={`icon1${data._id}`}
                                >
                                  <i className="fa-solid fa-edit"></i>
                                </Reactstrap.Button>
                                <Reactstrap.UncontrolledTooltip
                                  delay={0}
                                  target={`icon1${data._id}`}
                                >
                                  Editar
                                </Reactstrap.UncontrolledTooltip>

                                {/* Delete button */}
                                <Reactstrap.Button
                                  color="primary"
                                  type="button"
                                  className="btn-neutral btn-sm"
                                  onClick={() => destroy(data._id)}
                                  id={`icon2${data.number_data}`}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </Reactstrap.Button>
                                <Reactstrap.UncontrolledTooltip
                                  delay={0}
                                  target={`icon2${data.number_data}`}
                                >
                                  Eliminar
                                </Reactstrap.UncontrolledTooltip>
                              </>
                            )}
                            <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => seeDetail(data)}
                            >
                              <i className="fa-solid fa-eye"></i>
                            </Reactstrap.Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Reactstrap.Table>
              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={PerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalCompetences}
                  />
                </nav>
              </Reactstrap.CardFooter>
            </Reactstrap.Card>
            <Modal
              isOpen={modal}
              toggle={toggle}
              type={type}
              data={selectedCompetence}
              apiGet={`api/v1/competence/${selectedCompetence?._id}`}
            />

            {/* modal detalle  */}
            <ModalDetail
              competence={registroSeleccionado}
              toggleShow={() => setRegistroSeleccionado(null)}
            />
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>
      {showAlertCuestion && (
        <ALertModalCuestion
          api={apiDeleteCompetence}
          onClose={handleCloseAlert}
        />
      )}
    </>
  );
}
