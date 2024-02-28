import * as Reactstrap from "reactstrap";
// core components
import Head from "../../components/Headers/HEAD";
import axios from "axios";
import PaginationData from "../../components/Pagination/pagination.js";
import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavLink } from "react-router-dom";
import routes from "../../routes.js";
import Search from "../../components/Search/search"
import Loading from "../../components/loader/loader.js"

import CreateProgram from "./createModal.js"
import ALertModalCuestion from '../../components/Alert/ALertModalCuestion.js'
import ModalDetail from "./ModalDetail.js"
import { data } from "jquery";

const Butonn = (routeName, data, name) => {
  const matchingRoute = routes.find((route) => route.name === routeName);

  if (!matchingRoute) {
    return null;
  }

  const { path, layout, icon, name: routeDisplayName } = matchingRoute;

  const getModifiedPath = (path, data, name) => {
    let modifiedPath = path;

    if (data !== null) {
      const dataStartIndex = path.indexOf("=/:");
      const dataEndIndex = path.indexOf("/&");
      modifiedPath = `${path.slice(0, dataStartIndex)}=/${data}${path.slice(
        dataEndIndex
      )}`;
    }

    if (name !== null) {
      const nameStartIndex = modifiedPath.indexOf("&/:");
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
        <NavLink
          to={`${layout}${modifiedPath}`}
          tag={NavLinkRRD}
          activeClassName="active"
          className="p-0"
        >
          <i className={icon} />
        </NavLink>
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

// async function getData(_id) {
//   const { data } = await axios.get(`api/v1/formation_programs/${_id}`);
//   return data.results;
// }
async function getData() {
  const { data } = await axios.get(`api/v1/formation_programs`);
  return data.results;
}

export default function List() {
  // State variables
  const [type, setType] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [apiDeleteUser, setapiDeleteUser] = useState("");
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [showAlertCuestion, setAlertCuenstion] = useState(false);
  const [program, setProgram] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [PerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const user =JSON.parse(localStorage.getItem("User"));
  const [typeProfile, setTypeProfile] = useState(null);
  const urlFormationPrograms = `api/v1/formation_programs`
  const urlFormationProgramsUser = `api/v1/formation_programs/${user._id}`

  const fetchFormationPrograms = async (url) => {
    try {
      const { data } = await axios.get(url);
      setProgram(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };const setupTypeProfile = () => {
    const storedTypeProfile = localStorage.getItem('User');
    const json = JSON.parse(storedTypeProfile);
    const perfil = json.type_profile.map((e) => e.type_profile);
    setTypeProfile(perfil);
    if (perfil.includes('Administrador')) {
      fetchFormationPrograms(urlFormationPrograms)
    }
    else {
      fetchFormationPrograms(urlFormationProgramsUser)
    }
  };
  useEffect(() => {
    setupTypeProfile();
    

  }, [searchTerm, modal, showAlertCuestion]);
  // Functions for handling modals, alerts, and input changes
  const toggle = () => {
    setModal(!modal);
    setType(false);
  };

  const handleCloseAlert = () => {
    setAlertCuenstion(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const Edit = (program) => {
    setSelectedProgram(program);
    setModal(true);
    setType(true);
  };

  const seeDetail = (data) => {
    setRegistroSeleccionado(data)
  }


  const destroy = (id) => {
    setapiDeleteUser(`api/v1/formation_program/${id}`)
    setAlertCuenstion(true)
  }
  // Pagination calculations
  const totalProgram = program?.length;
  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;
  
  
 // Render component
  return (
    <>
         {isLoading && <Loading  />}
      <Head title1="Programa Formacion" />
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
              <Reactstrap.Button color="primary"
                  type="button"
                  className="btn-circle btn-neutral "
                  onClick={toggle}>
                  <i className="ni ni-fat-add" />
                </Reactstrap.Button>
                {/* Utilizar el componente SearchBar */}
                <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Programa Formación"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.Table
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    
                    {/* <th scope="col">Nivel de programa </th> */}
                    <th scope="col">Acciones </th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {program?.filter((programs) =>
                    Object.values(programs)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ).slice(firstIndex, lastIndex)
                    .map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <th scope="row">
                            <Reactstrap.Media className="align-items-center">
                              <span className="mb-0 text-sm">
                                {data.program_code}
                              </span>
                            </Reactstrap.Media>
                          </th>
                          <td>{data.program_name}</td>
                          {/* <td>{data.program_level.program_level}</td> */}
                          <td>
                            {/* Boton ver  */}
                        <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => seeDetail(data)}
                            >
                              <i className="fa-solid fa-eye"></i>

                            </Reactstrap.Button>
                       
                          {/* Boton editar
                          <Reactstrap.Button
                            color="primary"
                            type="button"
                            className="btn-neutral  btn-sm"
                            onClick={() => EditUsers(user)}
                            id={`userN${user._id}`}
                          >
                            <i className="fa-solid fa-edit"></i>
                          </Reactstrap.Button> */}

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
                              
                            <Reactstrap.UncontrolledDropdown className="mr-2">
                              {Butonn('Fichas', data._id, data.program_name)}
                            </Reactstrap.UncontrolledDropdown>


                            <Reactstrap.UncontrolledDropdown>
                              {Butonn('Artefactos', data._id, data.program_name)}
                            </Reactstrap.UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                {/* Modal crear usuarios */}
                <CreateProgram
              isOpen={modal}
              toggle={toggle}
              type={type}
              data={selectedProgram}
              apiGet={`api/v1/formation_program/${selectedProgram?._id}`}
            />

                 {/* modal detalle  */}
              <ModalDetail 
              data={registroSeleccionado}
              toggleShow={() => setRegistroSeleccionado(null)}
              />
              </Reactstrap.Table>

              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={PerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalProgram}
                  />
                </nav>
              </Reactstrap.CardFooter>
            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>
      {showAlertCuestion && (
        <ALertModalCuestion  api={apiDeleteUser} onClose={handleCloseAlert} />
      )}
    </>
  );
}