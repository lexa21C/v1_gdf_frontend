import { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";
import Modal from "./CreateProyect.js"
import axios from "axios";
import PaginationData from "../../components/Pagination/pagination.js";
import Head from "../../components/Headers/HEAD";
import { useParams } from "react-router-dom";
import ModalDetail from './ModalDetail.js';
import ListArteffacts from './artifacts/ModalArtiffacts.js'
import ALertModalCuestion from '../../components/Alert/ALertModalCuestion.js'

export default function List() {
  const [projects, setProjects] = useState([]);
  // const [artiffacts, setArtiffacts] = useState([]);
  const [openArtiffacts, setOpenArtiffacts] = useState(false);
  const [typeArtiffacts, setTypeArtiffacts] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);

  const [type, setType] = useState(false)

  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [detail, setDetail] = useState(false);

  // eliminar
  const [apiDeleteRecord, setapiDeleteRecord] = useState('');

  //alertas
  const [showAlertCuestion, setAlertCuenstion] = useState(false);

  const { recordid } = useParams();
  const { number_record } = useParams();

  const [typeProfile, setTypeProfile] = useState(null);


  const toggle = () => {
    setModal(!modal);
    setType(false);

  };

  const toggleShow = () => {
    setDetail(!detail);
    setType(false);
  }

  const Edit = (ff) => {
    setSelectedProject(ff);
    setModal(true);
    setType(true);
  };
  const toggleA = (id) => {
    setOpenArtiffacts(!openArtiffacts);
    setSelectedProject(id)
  };

  const mostrarDetalle = (project) => {
    setRegistroSeleccionado(project)
  }

  /* paginacion*/
  const totalProjects = projects?.length;
  const [PerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;

  const destroy = (id) => {
    setapiDeleteRecord(`api/v1/project/${id}`)
    setAlertCuenstion(true)
  }

  //cerrar modal  alertas
  const handleCloseAlert = () => {
    setAlertCuenstion(false);
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get(
        `api/v1/project/${recordid}`
      );
      setProjects(data.results);
    }
    fetchData();
    const storedTypeProfile = localStorage.getItem('User');
    const json = JSON.parse(storedTypeProfile)
    setTypeProfile(json.type_profile.map((e)=>{return e.type_profile }));
    setDeleteId(null)
    setTypeArtiffacts(true)

  }, [showAlertCuestion, recordid, modal]);
  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.some(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  return (
    <>
      <Head title='Ficha: ' description={`${number_record}`} />
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

                <Reactstrap.Form className="navbar-search navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto">
                  <Reactstrap.FormGroup className="mb-0" value={searchTerm} onChange={handleInputChange}>
                    <Reactstrap.InputGroup className="input-group-alternative">
                      <Reactstrap.InputGroupAddon addonType="prepend">
                        <Reactstrap.InputGroupText>
                          <i className="fas fa-search" />
                        </Reactstrap.InputGroupText>
                      </Reactstrap.InputGroupAddon>

                      <Reactstrap.Input placeholder="Buscar Proyecto" type="text" />
                    </Reactstrap.InputGroup>
                  </Reactstrap.FormGroup>
                </Reactstrap.Form>
              </Reactstrap.CardHeader>
              <Reactstrap.Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Nombre proyecto</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Planteamiento del problema</th>
                    <th scope="col">Categoria </th>
                    <th scope="col">Acciones </th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody >
                  {filteredProjects
                    ?.slice(firstIndex, lastIndex)
                    .map((data, index) => {

                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <th scope="row">
                            <Reactstrap.Media className="align-items-center">

                              <span className="mb-0 text-sm">
                                {data.name}
                              </span>
                            </Reactstrap.Media>
                          </th>
                          <td>{data.state}</td>

                          <th scope="row">
                            <Reactstrap.Media className="align-items-center">
                              <div className="ml-10 text-sm " id={`t2${data._id}`}>
                                <Reactstrap.UncontrolledTooltip target={`t2${data._id}`}>
                                  {data.problem_statement}
                                </Reactstrap.UncontrolledTooltip>
                                {data.problem_statement.length > 95 ?
                                  data.problem_statement.slice(0, 95) + '...' : data.problem_statement}
                              </div>
                            </Reactstrap.Media>
                          </th>

                          <td key={index}>
                            <ul>
                              {data.category?.map((e) => {
                                return <>
                                  <i className="bg-warning" /><li >{e.name}</li>  </>
                              }
                              )}
                            </ul>

                          </td>

                          <td>
                            {/* boton detalle del proyecto */}
                            <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => mostrarDetalle(data)}
                            >
                              <i className="fa-solid fa-eye"></i>

                            </Reactstrap.Button>

                            <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => toggleA(data)}
                            >
                              <i className="fa-solid fa-file-contract"></i>
                              
                            </Reactstrap.Button>

                            {/* boton editar proyecto */}
                            {(typeProfile == 'Instructor' || typeProfile == 'Administrador')&& (
                              <>
                                <Reactstrap.Button
                                  color="primary"
                                  type="button"
                                  className="btn-neutral  btn-sm"
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
                              </>
                            )}
                           {/* bootn eliminar proyecto */}
                            <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => destroy(data._id)}
                              id={`icon2${data.borrar}`}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Reactstrap.Button>
                            <Reactstrap.UncontrolledTooltip
                              delay={0}
                              target={`icon2${data.borrar}`}
                            >
                              Eliminar
                            </Reactstrap.UncontrolledTooltip>
                          </td>
                        </tr>


                      );
                    })

                  }
                </tbody>
              </Reactstrap.Table>

              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={PerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalProjects}
                  />
                </nav>
              </Reactstrap.CardFooter>

              {/* Modal crear */}
              <Modal
                isOpen={modal}
                toggle={toggle}
                type={type}
                record={selectedProject}
                apiGet={`api/v1/project/show/${selectedProject?._id}`}
                apiGetC={'api/v1/categories'}
              />

              {/* modal detalle  */}
              <ModalDetail
                project={registroSeleccionado}
                toggleShow={() => setRegistroSeleccionado(null)}
              />

              {/* modal Artefactos */}
              <ListArteffacts
                isOpenA={openArtiffacts}
                toggleA={toggleA}
                type={typeArtiffacts}
                id={selectedProject}
              />

            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>

      {showAlertCuestion && (
        <ALertModalCuestion api={apiDeleteRecord} onClose={handleCloseAlert} />
      )}

    </>

  );
}