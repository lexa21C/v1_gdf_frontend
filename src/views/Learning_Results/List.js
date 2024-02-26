
import * as Reactstrap from "reactstrap";
import Header from "../../components/Headers/HEAD";
import axios from "axios";
import PaginationData from "../../components/Pagination/pagination.js";
import ModalResults from "../Learning_Results/CreateResult.js"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Search from "../../components/Search/search"
import ALertModalCuestion from "../../components/Alert/ALertModalCuestion.js";
import ModalDetail from "../Learning_Results/ModalDetail.js";

export default function List() {

  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [results, setResults] = useState([]);
  const [detail, setDetail] = useState(false);
  //bucador
  const [searchTerm, setSearchTerm] = useState("");

  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false)

  //select para editar 
  const [selectedResult, setSelectedResult] = useState(null);

  const { competenceid } = useParams();
  const { nameCompetence } = useParams();
  const [typeProfile, setTypeProfile] = useState(null);
  const [showAlertCuestion, setAlertCuenstion] = useState(false);
  
  const [apiDeleteLearningResult, setapiDeleteLearningResult] = useState('');
  // pagination data
  const totalResults = results?.length;
  const [PerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;
  const toggle = () => {
    setModal(!modal);
    setType(false);
  };

  
    
  //Editar
  const Edit = (learning_r) => {
    setSelectedResult(learning_r);
    setModal(true);
    setType(true);
  };
  const destroy = (id) => {
    setapiDeleteLearningResult(`api/v1/learningResult/${id}`);
    setAlertCuenstion(true);
  };

  const handleCloseAlert = () => {
    setAlertCuenstion(false);
  };

  const seeDetail = (learningResult) => {
    setRegistroSeleccionado(learningResult);
  };

  const toggleShow = () => {
    setDetail(!detail);
    setType(false);
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`api/v1/learningResults/${competenceid}`);
      setResults(data.results);
      console.log(results);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  };
  
  const handleTypeProfile = () => {
    try {
      const storedTypeProfile = localStorage.getItem('User');
      const json = JSON.parse(storedTypeProfile);
      setTypeProfile(json.type_profile.map((e) => e.type_profile));
      fetchData();
    } catch (error) {
      console.error('Error setting type profile:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    handleTypeProfile();
  }, [modal, searchTerm, competenceid, showAlertCuestion]
  );

  return (
    <>
      <Header title='Competencias: ' description={`${nameCompetence}`} />
      {/* Page content */}
      <Reactstrap.Container className="mt--7" fluid>
        {/* Table */}
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
                {/* <h3 className="mb-0">Comptencia</h3><p>: {nameCompetence}</p> */}
                <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Resultado Aprendizaje" />

              </Reactstrap.CardHeader>
              <Reactstrap.Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Resultados de aprendizaje</th>
                    <th scope="col">Acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {results
                  ?.filter((result) =>
                    Object.values(result)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )?.slice(firstIndex, lastIndex)
                    .map((learning_result, Index = learning_result._id) => (
                      <tr key={Index}>
                        <th>{Index + 1}</th>
                        <th>{learning_result.learning_result_code ? learning_result.learning_result_code : learning_result._id}</th>
                       
                        <th scope="row" >
                          <div className="ml-10 text-sm " id={`t1${learning_result._id}`}>
                            <Reactstrap.UncontrolledTooltip target={`t1${learning_result._id}`}>
                              {learning_result.learning_result}
                            </Reactstrap.UncontrolledTooltip>
                            {learning_result.learning_result.length > 100 ?
                              learning_result.learning_result.slice(0, 100) + '...' : learning_result.learning_result}
                          </div>
                        </th>
                       
                        <td>
                           
                            {typeProfile.includes("Administrador") && (
                              <>
                                {/* Edit button */}
                                <Reactstrap.Button
                            color="primary"
                            type="button"
                            className="btn-neutral  btn-sm"
                            onClick={() => Edit(learning_result)}
                            id={`icon1${learning_result.code}`}
                          >
                            <i className="fa-solid fa-edit"></i>
                          </Reactstrap.Button>
                          <Reactstrap.UncontrolledTooltip
                            delay={0}
                            target={`icon1${learning_result.code}`}
                          >
                            Editar 
                          </Reactstrap.UncontrolledTooltip>
                                {/* Delete button */}
                                <Reactstrap.Button
                                  color="primary"
                                  type="button"
                                  className="btn-neutral btn-sm"
                                  onClick={() => destroy(learning_result._id)}
                                  id={`icon2${learning_result.number}`}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </Reactstrap.Button>
                                <Reactstrap.UncontrolledTooltip
                                  delay={0}
                                  target={`icon2${learning_result.number_learning_result}`}
                                >
                                  Eliminar
                                </Reactstrap.UncontrolledTooltip>
                              </>
                            )}
                            <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => seeDetail(learning_result)}
                            >
                              <i className="fa-solid fa-eye"></i>
                            </Reactstrap.Button>
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
                    total={totalResults}
                  />
                </nav>
              </Reactstrap.CardFooter>

              {/* Modal crear */}
              <ModalResults
                isOpen={modal}
                toggle={toggle}
                type={type}
                learning_result={selectedResult}
                apiGetC={`api/v1/learningResults/show/${selectedResult?._id}`}
              />
              {/* modal detalle  */}
            <ModalDetail
              learningResult={registroSeleccionado}
              toggleShow={() => setRegistroSeleccionado(null)}
            />

            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>
      {showAlertCuestion && (
        <ALertModalCuestion
          api={apiDeleteLearningResult}
          onClose={handleCloseAlert}
        />
      )}
    </>
  )
}