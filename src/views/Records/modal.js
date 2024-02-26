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
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  //validación del formulario
  const [isValidForm, setIsValidForm] = useState(true);
 //variables
 let optionsUsers= [];
  // Función para actualizar el estado isValidForm
  const setInputValidity = (isValid) => {
    setIsValidForm(isValid);
  };

   //estados de titulos y botones
   const [title, setTitle] = useState("");
   const [nameButton, setNameButton] = useState("");
   const getUsers= async () => {
    const { data } = await axios.get("api/v1/user");
    setUsers(data.results);

  };
  useEffect(() => { 
    if (type === true) {
      const fetchData = async () => {
        const { data } = await axios.get(apiGet);
        setData(data.results);
        console.log('ficha', data.results)
      }

      fetchData();

      setTitle("Editar");
      setNameButton("Actualizar");

    } else {
      setData({
        number_record: '',
        start_date: '',
        finish_date: '',
        formation_program: program_id,
        user: selectedResult
      });
      
      setTitle("Registrar");
      setNameButton("Registrar");
    }
    getUsers()
  }, [program_id, selectedResult, type, apiGet])
  for (let i = 0; i < users?.length; i++) {
    optionsUsers.push({
      value:users[i]?._id,
      label: users[i]?.complete_names

      
    });
  }
  const handleSelectChangeUser= (selectedThematicLine) => {
    setData({ ...data, user: selectedThematicLine.value});
    setSelectedUser(selectedThematicLine);
  };


  const handleResultSelected = (result) => {
    console.log('handle', result)
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
    
        axios.post('api/v1/records', data).then(
          (res) => {
            if(res.data.status==='success'){
              toggle(!toggle);

              setData({
                number_record: '',
                start_date: '',
                finish_date: '',
                formation_program: formation_programId,
                user: selectedResult
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
        const { data: res } = axios.put(`api/v1/records/${data._id}`, data).then(
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
                  <h4>{title} Ficha</h4>
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
                   <span className="text-danger">*</span> Ficha
                  </label>
                  <InputValidation
                    placeholder='numero'
                    type='number'
                    name='number_record'
                    minLength={2}
                    value={data.number_record}
                    onChange={(value) => handleChange2(value, 'number_record')}
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />
                </Reactstrap.FormGroup>
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="start_date"
                    id="cuestion1"
                  >
                   <span className="text-danger">*</span> Fecha inicial
                  </label>
                  <i className="fa-regular fa-circle-question fa-sm  mx-1" ></i>
                  <Reactstrap.UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="cuestion1"
                  >
                    ingresa la fecha de creacion de la ficha
                  </Reactstrap.UncontrolledTooltip>
                  <InputValidation
                    label='Fecha inicial'
                    type='date'
                    name='start_date'
                    value={data?.start_date}
                    secondDate={data?.finish_date} // Pasa la fecha actual como prop
                    onChange={(value) => handleChange2(value, 'start_date')}
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />

              </Reactstrap.FormGroup>
              <Reactstrap.FormGroup className="mb-3">
                <label
                  className="form-control-label"
                  htmlFor="start_date"
                  id="cuestion2"
                >
                <span className="text-danger">*</span> Fecha final
                </label>
                <i className="fa-regular fa-circle-question fa-sm  mx-1" ></i>
                <Reactstrap.UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="cuestion2"
                >
                  ingresa la fecha de finalizacion de la ficha
                </Reactstrap.UncontrolledTooltip>
                <InputValidation
                  label="Fecha final" // Etiqueta para diferenciar la fecha final
                  type='date'
                  name='finish_date'
                  value={data?.finish_date}
                  secondDate={data?.start_date} // Pasa la fecha actual como prop
                  onChange={(value) => handleChange2(value, 'finish_date')}
                  setIsValid={setIsValidForm} // Pasamos la función setIsValidForm al componente InputValidation
                />
              </Reactstrap.FormGroup>
              <Reactstrap.FormGroup className="mb-3">
                <label
                  className="form-control-label"
                  htmlFor="start_date"
                  id="cuestion3"
                >
                 <span className="text-danger">*</span> Instructor lider 
                </label>
                <i className="fa-regular fa-circle-question fa-sm  mx-1" ></i>
                <Reactstrap.UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="cuestion3"
                >
                  ingresa el email o nombre del instructor que sera Lider de ficha
                </Reactstrap.UncontrolledTooltip>
                
                <SelectSearch
  apiGet={`api/v1/user/filter/formation_program/${formation_programId}`}
  completeNamesProp="complete_names"
  span
  onSelect={handleResultSelected}
  selectedValue={data?.user?.[0]?.complete_names || ''}// Pass the pre-selected value to the SelectSearch component
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