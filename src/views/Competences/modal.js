import React, { useState, useEffect } from 'react';
import * as Reactstrap from 'reactstrap'
import axios from 'axios';
import SelectSearch from "../../components/SelectSearch/SelectSearch.js"
import { useParams } from "react-router-dom";
import AlertModal from '../../components/Alert/AlertModal.js'
import InputValidation from '../../Helpers/validacion.js'

const ModalExample = ({ isOpen, toggle, apiGet, type }) => {

  const user = localStorage.getItem('User')

  let user_JSON = JSON.parse(user)

  let formation_programId = user_JSON.formation_program[0]._id


  const [data, setData] = useState({});

  const [selectedResult] = useState(null);

  const { program_id } = useParams()

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

   //estados de titulos y botones
   const [title, setTitle] = useState("");
   const [nameButton, setNameButton] = useState("");

  useEffect(() => { 
    console.log('entra al modal')
    if (type === true) {
      const fetchData = async () => {
        const { data } = await axios.get(apiGet);
        setData(data.results);
        console.log(data)
      }

      fetchData();

      setTitle("Editar");
      setNameButton("Actualizar");

    } else {
      console.log('entra al modal')
      setData({
        labor_competition: '',
        labor_competence_code: '',
        labor_competition_version: '',
        estimated_duration: ''
    
      })
      
      setTitle("Registrar");
      setNameButton("Registrar");
    }
  }, [program_id, selectedResult, type, apiGet])


  const handleResultSelected = (result) => {
    setData({ ...data, user: result });
  }

  const handleChange2 = (value, fieldName) => {
    setData({ ...data, [fieldName]: value });
  };

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

    
        axios.post('api/v1/competence', data).then(
          (res) => {
            if(res.data.status==='success'){
              toggle(!toggle);

              setData({
                labor_competition: '',
                labor_competence_code: '',
                labor_competition_version: '',
                estimated_duration: ''
            
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
        const { data: res } = axios.put(`api/v1/competence/${data._id}`, data).then(
          (res) => {
            setAlertType(res.data.status);
            setAlertMessage(res.data.message);
            setShowAlert(true);

          }).catch((err) => {
            setAlertType(err.status);
            setAlertMessage(err.message);
            setShowAlert(true);
          })
        toggle(!toggle);
      }
  };
  return (
    <>
      <Reactstrap.Modal
        className="modal-dialog-centered "
        isOpen={isOpen} toggle={toggle}
      >
        <div className="modal-body p-0">
          <Reactstrap.Card className="bg-secondary shadow border-0">
            <Reactstrap.CardHeader className="bg-transparent pb-1">
              <Reactstrap.ModalHeader toggle={toggle} className='col-12 p-0'>
                <div>
                  <h4>{title} Competencia </h4>
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
                  Competencia 
                  </label>
                  <InputValidation
                    placeholder='Nombre de NSCL'
                    type='textarea'
                    name='labor_competition'
                    minLength={2}
                    value={data?.labor_competition}
                    onChange={(value) => handleChange2(value, 'labor_competition')}
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
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
                    placeholder='Codigo NSC'
                    type='number'
                    name='labor_competence_code'
                    minLength={2}
                    value={data.labor_competence_code}
                    onChange={(value) => handleChange2(value, 'labor_competence_code')}
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />
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
                    placeholder='Numero'
                    type='number'
                    name='labor_competition_version'
                    minLength={1}
                    value={data?.labor_competition_version}
                    onChange={(value) => handleChange2(value, 'labor_competition_version')}
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
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
                    placeholder='Horas'
                    type='number'
                    name='estimated_duration'
                    minLength={1}
                    value={data?.estimated_duration}
                    onChange={(value) => handleChange2(value, 'estimated_duration')}
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />
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
        <AlertModal type={alertType} message={alertMessage} onClose={handleCloseAlert} />
      )}

    </>

  );
};

export default ModalExample;