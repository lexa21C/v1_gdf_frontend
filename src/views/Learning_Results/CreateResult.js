import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Reactstrap from "reactstrap";
import { useParams } from "react-router-dom";
import AlertModal from '../../components/Alert/AlertModal.js'
import InputValidation from '../../Helpers/validacion.js'

const ModalResults = ({ isOpen, toggle, type, apiGetC }) => {
  const [data, setData] = useState({});

  // alertas
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  //validación del formulario
  const [isValidForm, setIsValidForm] = useState(true);
 

  // Función para actualizar el estado isValidForm
  const setInputValidity = (isValid) => {
    setIsValidForm(isValid);
  };

  //id competencia
  const { competenceid } = useParams();

  //estados de titulos y botones
  const [title, setTitle] = useState("");
  const [nameButton, setNameButton] = useState("");

  useEffect(() => {
    console.log('id competencia create:', competenceid)
    if (type === true) {  
      const fetchData = async () => {
        const { data } = await axios.get(apiGetC);

        setData(data.results);
        console.log('---get--')
        console.log(data.results)
      };
      fetchData();
      setTitle("Editar");
      setNameButton("Actualizar");

    } else {
      setData({
        _id: "",
        learning_result_code:"",
        learning_result: "",
        competence: competenceid
      });
      setTitle("Registrar");
      setNameButton("Registrar");
    };
  }, [type, apiGetC, competenceid]);

  const handleChange = (value, fieldName) => {
    setData({ ...data, [fieldName]: value });
  };
  //alertas
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //validación del formulario
    if (!isValidForm) {
      // Si hay algún error de validación, no envíes el formulario
      return;
    }

    if (type === false) {
      
      console.log('crear' ,data)
      axios.post('api/v1/learningResults', data).then(
        (res) => {
          if (res.data.status === 'success') {

            toggle(!toggle);

            setData({
              _id: "",
              learning_result_code:"",
              learning_result: "",
              competence: competenceid
              
            })
          }
          setAlertType(res.data.status);
          setAlertMessage(res.data.message);
          setShowAlert(true);

        }

      ).catch((err) => {
        setAlertType(err.status);
        setAlertMessage(err.message);
        setShowAlert(true);
      });
    } else {
     
      const { data: res } = axios.put(`api/v1/learningResults/${data._id}`, data).then((res)=>{
        console.log('---editado--')
        console.log(res.data.status)
        if (res.data.status === 'success') {

          toggle(!toggle);
        }
        setAlertType(res.data?.status);
        setAlertMessage(res.data?.message);
        setShowAlert(true);
        console.log(res.data?.message)
      }).catch((err)=>{
        setAlertType(err.status);
        setAlertMessage(err.message);
        setShowAlert(true);
      });

    }

  };

  return (
    <>
      <Reactstrap.Modal
        className="modal-lg"
        style={{ marginTop: "18vh" }}
        isOpen={isOpen}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Reactstrap.Card className="bg-secondary shadow border-0">
            <Reactstrap.CardHeader className="bg-transparent pb-1">
              <Reactstrap.ModalHeader toggle={toggle} className="col-12 p-0">
                <div className="d-flex flex-wrap ">
                  <h4>{title} Resultado de Aprendizaje</h4>
                </div>
              </Reactstrap.ModalHeader>
            </Reactstrap.CardHeader>
            <Reactstrap.CardBody className="px-lg-5 py-lg-5">
              <Reactstrap.Form onSubmit={handleSubmit}>
                <Reactstrap.Row>
                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup className="mb-3">
                      <label className="form-control-label" htmlFor="input-username">
                      <span className="text-danger">*</span> Codigo del programa
                      </label>
                      <InputValidation
                        className="form-control-alternative is-invalid"
                        placeholder="Ej: 52698"
                        type="number"
                        name="learning_result_code"
                        value={data?.learning_result_code}
                        required
                        onChange={(value) => handleChange(value, 'learning_result_code')}
                        setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                        // isEditable={type === false }
                      />
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>

                  <Reactstrap.Col md="6">
                    <Reactstrap.FormGroup className="mb-3">
                      <label className="form-control-label" htmlFor="input-username">
                      <span className="text-danger">*</span> Resultado de aprendizaje
                      </label>
                      <InputValidation
                        className="form-control-alternative is-invalid"
                        placeholder="Ej: MEJORAMIENTO PROGRAMAS DE DESARROLLO"
                        type="text"
                        name="learning_result"
                        max="10"
                        value={data?.learning_result }
                        minLength={15}
                        required
                        onChange={(value) => handleChange(value, 'learning_result')}
                        setIsValid={setInputValidity}
                      />
                    </Reactstrap.FormGroup>
                  </Reactstrap.Col>
                </Reactstrap.Row>

                {/*   Botón Registrar */}
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
        <AlertModal type={alertType} message={alertMessage} onClose={handleCloseAlert} />
      )}
    </>

  );
};

export default ModalResults;
