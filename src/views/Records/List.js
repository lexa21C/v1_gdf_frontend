import * as Reactstrap from "reactstrap";
import Header from "../../components/Headers/HEAD";
import axios from "axios";
import PaginationData from "../../components/Pagination/pagination.js";
import { useState, useEffect } from "react";
import Search from "../../components/Search/search";
import Modal from "./modal.js";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import routes from "../../routes.js";
import { useParams } from "react-router-dom";
import ALertModalCuestion from '../../components/Alert/ALertModalCuestion.js'
import ModalDetail from '../Records/ModalDetail.js'

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

    if (name !== undefined && name !== null) { // Verifica si name no es undefined
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


export default function List() {
  const [records, setRecords] = useState([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [typeProfile, setTypeProfile] = useState(null);

  //detalle
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [detail, setDetail] = useState(false);

  //Buscador
  const [searchTerm, setSearchTerm] = useState("");

  const { program_id } = useParams()


  const user = JSON.parse(localStorage.getItem("User"));
  const user_id = user._id;


  const toggle = () => {
    setModal(!modal);
    setType(false);
  };
  const Edit = (record) => {
    setSelectedRecord(record);
    setModal(true);
    setType(true);
  };


  const totalCompetences = records?.length;
  const [PerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;


  const [showAlertCuestion, setAlertCuenstion] = useState(false);

  const [apiDeleteRecord, setapiDeleteRecord] = useState('');

  const destroy = (id) => {
    setapiDeleteRecord(`api/v1/records/${id}`)
    setAlertCuenstion(true)
  };
  const handleCloseAlert = () => {
    setAlertCuenstion(false);
  };

  //ver detalle 
  const seeDetail = (record) => {
    setRegistroSeleccionado(record)
  }

  const toggleShow = () => {
    setDetail(!detail);
    setType(false);
  }
  //bucador
  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `api/v1/records/${program_id}`
      );
      setRecords(data.results);
    };
    fetchData();
    const storedTypeProfile = localStorage.getItem('User');
    const json = JSON.parse(storedTypeProfile)
    setTypeProfile(json.type_profile.map((e)=>{return e.type_profile }));

  }, [modal, showAlertCuestion, program_id]
  );

  //filtro buscador
  const filteredRecords = records?.filter(record =>
    (record.number_record && record.number_record.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.user && record.user.some(user => user.complete_names.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <>
      <Header title1='Gestionar Fichas' />
      {/* Page content */}
      <Reactstrap.Container className="mt--7" fluid>
        {/* Table */}
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
                <Reactstrap.Button
                  color="primary"
                  type="button"
                  className="btn-circle btn-neutral"
                  onClick={toggle}
                >
                  <i className="ni ni-fat-add" />
                </Reactstrap.Button>

                {/* Utilizar el componente SearchBar */}
                <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Ficha"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.Table
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Ficha</th>
                    <th scope="col">Fecha Inicial</th>
                    <th scope="col">Fecha final</th>
                    <th scope="col">Instructor</th>
                    <th scope="col">Acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords
                    ?.slice(firstIndex, lastIndex)
                    .map((record, Index = record._id) => (
                      <tr key={Index}>
                        <th>{1 + Index}</th>
                        <th scope="row">
                          <Reactstrap.Media className="align-items-center">
                            <span className="mb-0 text-sm">
                              {record.number_record}
                            </span>
                          </Reactstrap.Media>
                        </th>
                        <td>{record.start_date}</td>
                        <td>{record.finish_date}</td>
                        <td>
                          {record.user?.map((e) => (
                            <span key={e._id}>{e.complete_names}</span>
                          ))}

                        </td>
                        {/* buttons */}
                        <td className="text-left pl-0">
                          <Reactstrap.UncontrolledDropdown className="mr-2">
                            {Butonn('Proyectos', record._id, record.number_record)}
                          </Reactstrap.UncontrolledDropdown>
                             {/* Boton ver  */}
                        <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => seeDetail(record)}
                            >
                              <i className="fa-solid fa-eye"></i>

                            </Reactstrap.Button>
                            {/* <p>{record?.user?.map(e=>e._id)} ,id: {user_id}</p> */}
                          {(user_id == record?.user?.map(e=>e._id) || typeProfile == 'Administrador')  && (
                              <>
                                <Reactstrap.Button
                                  color="primary"
                                  type="button"
                                  className="btn-neutral  btn-sm"
                                  onClick={() => Edit(record)}
                                  id={`icon1${record.number_record}`}
                                >
                                  <i className="fa-solid fa-edit"></i>
                                </Reactstrap.Button>
                                <Reactstrap.UncontrolledTooltip
                                  delay={0}
                                  target={`icon1${record.number_record}`}
                                >
                                  Editar
                                </Reactstrap.UncontrolledTooltip>

                                <Reactstrap.Button
                                  color="primary"
                                  type="button"
                                  className="btn-neutral  btn-sm"
                                  onClick={() => destroy(record._id)}
                                  id={`icon2${record.number_record}`}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </Reactstrap.Button>
                                <Reactstrap.UncontrolledTooltip
                                  delay={0}
                                  target={`icon2${record.number_record}`}
                                >
                                  Eliminar
                                </Reactstrap.UncontrolledTooltip>

                              </>
                            )}

                        </td>

                      </tr>
                    ))}
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
              <Modal
                isOpen={modal}
                toggle={toggle}
                type={type}
                record={selectedRecord}
                apiGet={`api/v1/records/show/${selectedRecord?._id}`}
              />

              
                 {/* modal detalle  */}
                 <ModalDetail 
                record={registroSeleccionado}
                toggleShow={() => setRegistroSeleccionado(null)}
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
