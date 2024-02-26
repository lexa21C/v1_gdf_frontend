import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Reactstrap from "reactstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import ModalObjective from "./ModalObjetive.js";
import ModalGlosary from "./ModalGlosary.js";
import AlertModal from '../../components/Alert/AlertModal.js'


const Modal = ({ isOpen, toggle, apiGet, type, apiGetC }) => {
  const [data, setData] = useState({});
  const { number_record } = useParams();
  const [title, setTitle] = useState("");
  const [nameButton, setNameButton] = useState("");

  /*category*/ 
  const [categories, setCategory] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  /* Objectives*/
  const [openObjectives, setOpenObjectives] = useState(false);
  const [typeObjective, setTypeObjective] = useState(false)
  const [objectivesData, setObjectivesData] = useState([])

  /*Glosary*/
  const [openGlosary, setOpenGlosary] = useState(false);
  const [typeGlosary, setTypeGlosary] = useState(false)
  const [glosaryData, setGlosaryData] = useState([])

  /*Alert*/
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  /*carrusel*/
  const [step, setStep] = useState(1);


  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const toggle2 = () => {
    setOpenObjectives(!openObjectives);
  };

  const toggle3 = () => {
    setOpenGlosary(!openGlosary);
  };

  const handleObjective = (e) => {
    setData({ ...data, specific_objectives: e })
  }

  const handleGlosary = (g) => {
    setData({ ...data, glossary: g })
  }


  useEffect(() => {
    if (type === true) {
      const Data = async () => {
        const { data } = await axios.get(apiGet);
        setSelectedOptions(
          data?.results?.category?.map((category) => ({
            value: category.name,
            label: category.name,
          })) || []
        );
        setObjectivesData(data.results.specific_objectives)
        setGlosaryData(data.results.glossary)
        setData(data.results);
        setTypeObjective(true)
        setTypeGlosary(true)
        handleSelectChange();

      };
      Data();

      setTitle("Editar");
      setNameButton("Actualizar");
    } else {
      setData({
        name: "",
        state: "",
        problem_statement: "",
        project_justification: "",
        general_objective: "",
        specific_objectives: "",
        scope_feasibility: "",
        project_summary: "",
        technological_research: "",
        glossary: "",
        date_presentation: "",
        approval_date: "",
        category: [],
        record: number_record,
      });
      setTitle("Registrar");
      setNameButton("Registrar");
      setTypeObjective(false)
      setTypeGlosary(false)
    }

    const get = async () => {
      const { data } = await axios.get(apiGetC);
      setCategory(data.results);
    };
    get();
  }, [type, setCategory, apiGet, apiGetC, number_record]);

  let options = [];
  for (let i = 0; i < categories?.length; i++) {
    options.push({
      value: categories[i]?.name,
      label: categories[i]?.name,
    });
  }

  const handleSelectChange = (selectedOption) => {
    setData({ ...data, category: selectedOption.map((e) => e.value) });
    setSelectedOptions(selectedOption);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (type === false) {
        axios.post("api/v1/project", data).then(

          (res)=>{
            if(res.data.status==='success'){
              toggle(!toggle);
              setData({
                name: "",
                state: "",
                problem_statement: "",
                project_justification: "",
                general_objective: "",
                specific_objectives: "",
                scope_feasibility: "",
                project_summary: "",
                technological_research: "",
                glossary: "",
                date_presentation: "",
                approval_date: "",
                category: [],
                record: [],
              });
            }
            setAlertType(res.data.status);  
            setAlertMessage(res.data.message);
            setShowAlert(true);
          }
        ).catch((err)=>{
          setAlertType(err.status);
          setAlertMessage(err.message);
          setShowAlert(true);
        });
      } else {
        axios.put(`api/v1/project/${data._id}`, data);
      }


      type(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
      }
    }
  };
  return (
    <Reactstrap.Modal
      className="modal-lg"
      style={{marginTop: "18vh"}}
      isOpen={isOpen}
      toggle={toggle}
    >
      <div divclassName="modal-body p-0">
        <Reactstrap.Card className="bg-secondary shadow border-0">
          <Reactstrap.CardHeader className="bg-transparent pb-1">
            <Reactstrap.ModalHeader toggle={toggle} className="col-12 p-0">
              <div className="d-flex flex-wrap ">
                <h4>{title} Proyecto</h4>
              </div>
            </Reactstrap.ModalHeader>
          </Reactstrap.CardHeader>
          <Reactstrap.Col col='12' className="d-flex justify-content-center mt-3">
                <nav aria-label="..." className="col-5">
                  <Reactstrap.Pagination
                    className="pagination justify-content-center mb-0"
                    listClassName=" mb-0"
                  >
                    <Reactstrap.PaginationItem className={step === 1 ? 'active' : null} >
                      <Reactstrap.PaginationLink
                        href="#pablo"
                        onClick={(e) => { e.preventDefault() }}
                      >
                        1
                      </Reactstrap.PaginationLink>
                    </Reactstrap.PaginationItem>
                    <Reactstrap.PaginationItem className={step === 2 ? 'active' : null} >
                      <Reactstrap.PaginationLink
                        href="#pablo"
                        onClick={(e) => { e.preventDefault() }}
                      >
                        2
                      </Reactstrap.PaginationLink>
                    </Reactstrap.PaginationItem>
                  </Reactstrap.Pagination>
                </nav>
              </Reactstrap.Col>
          <Reactstrap.CardBody className="px-lg-5 py-lg-5">

            <Reactstrap.Form onSubmit={handleSubmit}>
             

              {step === 1 && (<>
                <Reactstrap.Row>
                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup className="mb-3">
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Nombre del Proyecto
                      </label>
                      <Reactstrap.Input
                        className="form-control-alternative is-invalid"
                        placeholder="Ej: Bizsett"
                        type="text"
                        name="name"
                        value={data?.name}
                        
                        onChange={handleChange}
                      />
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>

                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup className="mb-3">
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Estado
                      </label>

                      <select
                        className="form-control"
                        type="text"
                        name="state"
                        value={data?.state}
                        required
                        onChange={handleChange}
                        style={{ width: "100%" }}
                      >
                        <option value="">Seleccione un estado</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Terminado">Terminado</option>
                      </select>
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>
                </Reactstrap.Row>

                <Reactstrap.Row className="mb-3">
                  <Reactstrap.Col md="6">
                  <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                         Objetivos Especificos
                        </label>
                    <Reactstrap.Button
                      color="primary"
                      type="button"
                      className=" btn-neutral w-100 "
                      onClick={toggle2}
                    >
                      Abrir
                    </Reactstrap.Button>
                    <ModalObjective
                      type={typeObjective}
                      onSelect={handleObjective}
                      isOpenObjective={openObjectives}
                      toggle2={toggle2}
                      dataEdit={objectivesData}
                    />
                  </Reactstrap.Col>

                  <Reactstrap.Col md="6">
                  <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                         Glosario
                        </label>
                    <Reactstrap.Button
                      color="primary"
                      type="button"
                      className=" btn-neutral w-100"
                      onClick={toggle3}
                    >
                      Abrir
                    </Reactstrap.Button>
                    <ModalGlosary
                      type={typeGlosary}
                      onSelectGlosary={handleGlosary}
                      isOpenGlosary={openGlosary}
                      toggle3={toggle3}
                      dataEditGlosary={glosaryData}
                    />
                  </Reactstrap.Col>

                </Reactstrap.Row>
                
                <Reactstrap.Row>
                <Reactstrap.Col md="6">
                      <Reactstrap.FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Fecha de Presentación
                        </label>
                        <Reactstrap.Input
                          className="form-control-alternative"
                          placeholder="fecha presentación"
                          type="date"
                          name="date_presentation"
                          value={data?.date_presentation}
                          required
                          onChange={handleChange}
                        />
                      </Reactstrap.FormGroup>
                    </Reactstrap.Col>


                    <Reactstrap.Col md="6">
                      <Reactstrap.FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Fecha de Aprobación
                        </label>
                        <Reactstrap.Input
                          className="form-control-alternative"
                          placeholder="fecha aprovación"
                          type="date"
                          name="approval_date"
                          value={data?.approval_date}
                          required
                          onChange={handleChange}
                        />
                      </Reactstrap.FormGroup>
                    </Reactstrap.Col>
                    </Reactstrap.Row>

                    <Reactstrap.Col md="6 pl-0">
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Seleccione las categorias
                      </label>

                      <Reactstrap.FormGroup>
                        <Select
                          options={options}
                          value={selectedOptions}
                          isMulti
                          onChange={handleSelectChange}
                        />
                      </Reactstrap.FormGroup>

                    </Reactstrap.Col>

                <Reactstrap.Col col='12' className="d-flex justify-content-center mt-2">
                  <Reactstrap.Button
                    className="btn-primary  w-25 "
                    color="primary" type="button"
                    onClick={handleNext}
                  >
                   siguiente
                    </Reactstrap.Button>

                </Reactstrap.Col>
              </>)}


              {step === 2 && (
                <> 
                
                <Reactstrap.Row>
                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Planteamiento del Problema
                      </label>
                      <Reactstrap.Input
                        className="form-control-alternative"
                        placeholder="Ej : A través de este portafolio se busca exponer de manera formal, el objetivo que tenemos como grupo de trabajo es como primera instancia, generar un aporte a la economía local, apoyar de manera instructiva y educativa en el mundo del mercado digital a los emprendedores que quisieran impulsar marcas propias como emprendedores locales"
                        type="textarea"
                        rows="5"
                        name="problem_statement"
                        value={data?.problem_statement}
                        required
                        onChange={handleChange}
                      />
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>

                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Justificación de Proyecto
                      </label>
                      <Reactstrap.Input
                        className="form-control-alternative"
                        placeholder="Ej : El software bizsett tiene la finalidad de apoyar a los emprendimientos locales siendo una red social en la que los usuarios puedan interactuar con los emprendimientos de modoque se den a conocer mucho más. Este manual se recomienda que únicamente vaya dirigido a la persona encargada de realizar actualizaciones o configuraciones al software"
                        type="textarea"
                        rows="5"
                        name="project_justification"
                        value={data?.project_justification}
                        required
                        onChange={handleChange}
                      />
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>
                </Reactstrap.Row>
                <Reactstrap.Row>
                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Objetivo General
                      </label>
                      <Reactstrap.Input
                        className="form-control-alternative"
                        placeholder="Ej : Ofrecer información acerca de cómo está diseñado el aplicativo para así comunicar el uso adecuado a la hora de ejecutar la instalación y la configuración del sistema de
                        información "
                        type="textarea"
                        rows="5"
                        name="general_objective"
                        value={data?.general_objective}
                        required
                        onChange={handleChange}
                      />
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>

                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Alcance de Viabilidad
                      </label>
                      <Reactstrap.Input
                        className="form-control-alternative"
                        placeholder="Ej: Aproximadamente estaríamos terminando el software; en el ámbito económico aún no tenemos la certeza de cuánto dinero se iría, sabemos que un buen hosting y dominio nos costaría en promedio unos $40.000 COP, el problema radica en si nuestras computadoras de bajo rendimiento podrán soportar todo el proceso de programación"
                        type="textarea"
                        rows="5"
                        name="scope_feasibility"
                        value={data?.scope_feasibility}
                        required
                        onChange={handleChange}
                      />
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>
                </Reactstrap.Row>


                  <Reactstrap.Row>
                    <Reactstrap.Col md="6">
                      <Reactstrap.FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Resumen del Proyecto
                        </label>
                        <Reactstrap.Input
                          className="form-control-alternative"
                          placeholder="Ej: Este manual se hace con el fin de que el lector conozca cómo está diseñado el software, como se encuentra estructurado de forma que logre realizar las distintas funciones que provee este, así como las herramientas y su debida configuración, de modo que el lector pueda entender la lógica con la que fue desarrollado el aplicativo."
                          type="textarea"
                          rows="5"
                          name="project_summary"
                          value={data?.project_summary}
                          required
                          onChange={handleChange}
                        />
                      </Reactstrap.FormGroup>
                    </Reactstrap.Col>

                    <Reactstrap.Col md="6">
                      <Reactstrap.FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Investigación Tecnologica
                        </label>
                        <Reactstrap.Input
                          className="form-control-alternative"
                          placeholder="Ej : Interfaz de programación de aplicaciones. (2022, 27 de septiembre). Wikipedia, La enciclopedia libre. Fecha de consulta: 09:07, noviembre 15, 2022
                          desde https://es.wikipedia.org/w/index.php?title=Interfaz_de_programaci%C3%B3n_de_aplicaciones&oldid=146215608"
                          type="textarea"
                          rows="5"
                          name="technological_research"
                          value={data?.technological_research}
                          required
                          onChange={handleChange}
                        />
                      </Reactstrap.FormGroup>
                    </Reactstrap.Col>
                  </Reactstrap.Row>

                  <Reactstrap.Col col='12'
                    className="d-flex justify-content-center align-items-center flex-column" >
                    <Reactstrap.Button
                      className="btn-primary w-25 m-0"
                      color="primary"
                      onClick={handlePrev}>
                      atras
                    </Reactstrap.Button>
                    <Reactstrap.Button
                      className="btn-primary w-25 mt-2 "
                      color="primary"
                      type="submit"
                    >
                      {nameButton}
                    </Reactstrap.Button>

                  </Reactstrap.Col>


                </>
              )}

              <div>
              </div>
            </Reactstrap.Form>
          </Reactstrap.CardBody>
        </Reactstrap.Card>

      </div>
    </Reactstrap.Modal >
  );
}

export default Modal;
