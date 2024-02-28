import React, { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";
import axios from "axios";
import Select from "react-select";
import AlertModal from "../../components/Alert/AlertModal.js";
import InputValidation from "../../Helpers/validacion.js";
import { useParams } from "react-router-dom";

const CreateProgram = ({ isOpen, toggle, apiGet, apiGetPrograms, type }) => {
  const [formData, setFormData] = useState({
    program_name: "",
    program_code: "",
    total_duration: "",
    program_version: "",
    competence: "",
    program_level: "",
    thematic_line: "",
  });

  const [selectedResult] = useState(null);
  const { program_id } = useParams();
  const [competence, setCompetence] = useState([]);
  const [selectedCompetence, setSelectedCompetence] = useState([]);
  const [programLevel, setProgramLevel] = useState([]);
  const [selectedProgramLevel, setSelectedProgramLevel] = useState([]);
  const [thematicLine, setThematicLine] = useState([]);
  const [selectedThematicLine, setSelectedThematicLine] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [title, setTitle] = useState("");
  const [nameButton, setNameButton] = useState("");
  const [isValidForm, setIsValidForm] = useState(true);

  let optionsCompetence = [];
  let optionsProgramLevel = [];
  let optionsThematicLine = [];
  // funciones get 
  const getProgram = async () => {
    const { data } = await axios.get(apiGet);
    formData(data.results);
  };
   const selectedCompetences = async ()=> {
    let array = [];

    selectedCompetence.forEach((e) => {
        array.push(e.value);
    });
     formData.competence = array

  
   }
  const getProgramLevel = async () => {
    const { data } = await axios.get("api/v1/programlevels");
    setProgramLevel(data.results);

  };
  const getCompetence = async () => {
    const { data } = await axios.get("api/v1/competences");
    setCompetence(data.results);

  };


  const getThematicLine = async () => {
    const { data } = await axios.get("api/v1/thematics");
    setThematicLine(data.results);

   
  };

  const setInputValidity = (isValid) => {
    setIsValidForm(isValid);
  };

  const resetForm = () => {
    setFormData({
      program_name: "",
      program_code: "",
      total_duration: "",
      program_version: "",
      competence: "",
      program_level: "",
      thematic_line: "",
    });
    setSelectedCompetence([]);
    setSelectedProgramLevel([]);
    setSelectedThematicLine([]);
  };

  const editProgram = async () => {
    try {
      const { data: res } = await axios.put(`api/v1/formation_program/${formData._id}`, formData);

      if (res.status === "success") {
        resetForm();
        setAlertType(res.status);
        setAlertMessage(res.message);
        setShowAlert(true);
      } else {
        setAlertType(res.status);
        setAlertMessage(res.message);
        setShowAlert(true);
      }
    } catch (err) {
      setAlertType(err.status);
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get(apiGet);
    setFormData(data.results);
    setSelectedCompetence(
      data?.results?.competence?.map((competence) => ({
        value: competence._id,
        label: competence.labor_competition,
      })) || []
    );

    setSelectedProgramLevel(
      data?.results?.program_level
        ? {
            value: data.results.program_level._id,
            label: data.results.program_level.program_level,
          }
        : null
    );
    setSelectedThematicLine(
      data?.results?.thematic_line
        ? {
            value: data.results.thematic_line._id,
            label: data.results.thematic_line.thematic_line,
          }
        : null
    );
    setFormData(data.results);
  };

  const createProgramFormation = async () => {

    try {
      const res = await axios.post("api/v1/formation_program", formData);

      if (res.data.status === "success") {
        resetForm();
        setAlertType(res.data.status);
        setAlertMessage(res.data.message);
        setShowAlert(true);
      } else {
        setAlertType(res.data.status);
        setAlertMessage(res.data.message);
        setShowAlert(true);
      }
    } catch (err) {
      setAlertType(err.status);
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  }

  useEffect(() => {
    if (type === true) {
      fetchData();
      setTitle("Editar");
      setNameButton("Actualizar");
    } else {
      resetForm();
      setTitle("Registrar");
      setNameButton("Registrar");
    }
    getCompetence();
    getProgramLevel();
    getThematicLine();
  }, [program_id, selectedResult, type, apiGet]);

  for (let i = 0; i < competence?.length; i++) {
    optionsCompetence.push({
      value: competence[i]?._id,
      label: competence[i]?.labor_competition
    });
  }

  for (let i = 0; i < programLevel?.length; i++) {
    optionsProgramLevel.push({
      value: programLevel[i]?._id,
      label: programLevel[i]?.program_level,
    });
  }

  for (let i = 0; i < thematicLine?.length; i++) {
    optionsThematicLine.push({
      value: thematicLine[i]?._id,
      label: thematicLine[i]?.thematic_line,
    });
  }

  const handleResultSelected = (result) => {
    setFormData({ ...formData, user: result });
  };

  const handleSelectChangeCompetence = (selectedCompetence) => {
    setFormData({
      ...formData,
      competence: selectedCompetence.map((e) => e.value),
    });
    setSelectedCompetence(selectedCompetence);
  };

  const handleSelectChangeProgramLevel = (selectedProgramLevel) => {
    setFormData({ ...formData, program_level: selectedProgramLevel.value });
    setSelectedProgramLevel(selectedProgramLevel);
  };

  const handleSelectChangeThematicLine = (selectedThematicLine) => {
    setFormData({ ...formData, thematic_line: selectedThematicLine.value });
    setSelectedThematicLine(selectedThematicLine);
  };

  const handleChange2 = (value, fieldName) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidForm) {
      return;
    }

    if (type === false) {
      createProgramFormation();
      toggle(!toggle);
    } else {
      editProgram();
      toggle(!toggle);
    }
  };

  return (
    <>
      <Reactstrap.Modal
        className="modal-dialog-centered "
        isOpen={isOpen}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Reactstrap.Card className="bg-secondary shadow border-0">
            <Reactstrap.CardHeader className="bg-transparent pb-1">
              <Reactstrap.ModalHeader toggle={toggle} className="col-12 p-0">
                <div>
                  <h4>{title} Programa </h4>
                </div>
              </Reactstrap.ModalHeader>
            </Reactstrap.CardHeader>

            <Reactstrap.CardBody className="px-lg-5 py-lg-5">
              <Reactstrap.Form onSubmit={handleSubmit}>
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Programa
                  </label>
                  <InputValidation
                    placeholder="Ejemplo: OPERACIÓN DE EQUIPOS"
                    type="textarea"
                    name="program_name"
                    minLength={2}
                    value={formData?.program_name}
                    onChange={(value) => handleChange2(value, "program_name")}
                    setIsValid={setInputValidity}
                  />
                </Reactstrap.FormGroup>

                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Código
                  </label>
                  <InputValidation
                    placeholder="Ejemplo: 147837"
                    type="number"
                    name="program_code"
                    minLength={6}
                    value={formData.program_code}
                    onChange={(value) => handleChange2(value, "program_code")}
                    setIsValid={setInputValidity}
                  />
                </Reactstrap.FormGroup>

                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>Nivel de Programa
                  </label>
                  <Reactstrap.FormGroup>
                    <Select
                      options={optionsProgramLevel}
                      value={selectedProgramLevel}
                      onChange={handleSelectChangeProgramLevel}
                    />
                  </Reactstrap.FormGroup>
                </Reactstrap.FormGroup>

                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Version
                  </label>
                  <InputValidation
                    placeholder="Numero"
                    type="number"
                    name="program_version"
                    minLength={1}
                    value={formData?.program_version}
                    onChange={(value) => handleChange2(value, "program_version")}
                    setIsValid={setInputValidity}
                  />
                </Reactstrap.FormGroup>

                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Duración Estimada
                  </label>
                  <InputValidation
                    placeholder="Horas"
                    type="number"
                    name="total_duration"
                    minLength={1}
                    value={formData?.total_duration}
                    onChange={(value) => handleChange2(value, "total_duration")}
                    setIsValid={setInputValidity}
                  />
                </Reactstrap.FormGroup>

                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>Linea Tematica
                  </label>
                  <Reactstrap.FormGroup>
                    <Select
                      options={optionsThematicLine}
                      value={selectedThematicLine}
                      onChange={handleSelectChangeThematicLine}
                    />
                  </Reactstrap.FormGroup>
                </Reactstrap.FormGroup>

                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Competencia
                  </label>
                  <Reactstrap.FormGroup>
                    <Select
                      options={optionsCompetence}
                      value={selectedCompetence}
                      isMulti
                      onChange={handleSelectChangeCompetence}
                    />
                  </Reactstrap.FormGroup>
                </Reactstrap.FormGroup>

                <div className="text-center">
                  <Reactstrap.Button
                    className="my-4"
                    color="primary"
                    type="submit"
                  >
                    {nameButton}
                  </Reactstrap.Button>
                </div>
              </Reactstrap.Form>
            </Reactstrap.CardBody>
          </Reactstrap.Card>
        </div>
      </Reactstrap.Modal>
      {showAlert && (
        <AlertModal
          type={alertType}
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
    </>
  );
};

export default CreateProgram;
