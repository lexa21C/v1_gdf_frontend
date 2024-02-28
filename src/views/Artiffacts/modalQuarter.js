import React, { useState, useEffect } from 'react';
import * as Reactstrap from 'reactstrap'
import axios from 'axios';
import { show_alert } from 'components/Alerts/Alert.js';
import { useParams } from 'react-router-dom';
import Select from "react-select";


export default function Modal({ isOpen, toggle, type, quarter }) {
    let { formation_program } = useParams()
    const [selectedOptions, setSelectedOptions] = useState();
    const [formData, setFormData] = useState({
        number: '',
        descrition: '',
        competence: '',
        formation_program:  formation_program,
      });
    const [ competence, setCompetence] = useState([])
    const [selectedCompetence, setSelectedCompetence] = useState([]);
    const clearFormData = () => {
        setFormData({
            number: '',
            descrition: '',
            competence: '',
            formation_program:  formation_program,
          })
          setSelectedCompetence([]);
      };

      
    const getCompetenceIdFormation = async () => {
        const {data} = await axios.get(`api/v1/competences/${formation_program}`);
        setCompetence(data.results)
    }
    useEffect(()=>{
        if (type === true) {
            setFormData(quarter)
            setSelectedOptions(
                quarter?.competence?.map((item) => ({
                  value: item._id,
                  label: item.labor_competition,
                })) || []
              );
        }else{
            setFormData({
                formation_program: formation_program,
                competence: '',
                number: ''
        })
        }
        getCompetenceIdFormation()
    },[quarter, type])
    let optionsCompetence = [];
    for (let i = 0; i < competence?.length; i++) {
        optionsCompetence.push({
          value: competence[i]?._id,
          label: competence[i]?.labor_competition
    
          
        });
      }

      const handleSelectChangeCompetence = (selectedCompetence) => {
        setFormData({
          ...formData,
          competence: selectedCompetence.map((e) => e.value),
        });
        setSelectedCompetence(selectedCompetence);
      };

    const handleChange = ({ currentTarget: input }) => {
        setFormData({ ...formData, [input.name]: input.value });
    };
    const postData = async () => {
        try {
          const response = await axios.post('api/v1/quarter', formData);
          const { data: res } = response;
      
          if (res.code === 'success') {
            show_alert('Creado Correctamente', 'success');
          } else {
            show_alert(res.message, 'Failed');
          }
      
          toggle(!toggle);
          clearFormData()
        } catch (error) {
          handleApiError(error);
        }
      };
      const putData = async () => {
        try {
          const response = await axios.put(`api/v1/quarter/${formData._id}`, formData);
          const { data: res } = response;
      
          show_alert('Editado correctamente', 'success');
          toggle(!toggle);
         clearFormData()
        } catch (error) {
          handleApiError(error);
        }
      };
      const handleApiError = (error) => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          console.error(error.response.data);
        }
      };
      const handleSubmit = (e) => {
        e.preventDefault();
      
        if (type === false) {
          postData();
        } else {
          putData();
        }
      };
            
    
 

    return (
        <Reactstrap.Modal
            className="modal-dialog-centered "
            isOpen={isOpen} toggle={toggle}
        >
            <div className="modal-body p-0">
                <Reactstrap.Card className="bg-secondary shadow border-0">
                    <Reactstrap.CardHeader className="bg-transparent pb-1">
                        <Reactstrap.ModalHeader toggle={toggle} className='col-12 p-0'>
                            <div>
                                <h4>Trimestre</h4>
                            </div>

                        </Reactstrap.ModalHeader>
                    </Reactstrap.CardHeader>
                    <Reactstrap.CardBody className="px-lg-5 py-lg-5">

                        <Reactstrap.Form onSubmit={handleSubmit}>
                            <Reactstrap.FormGroup className="mb-3" >
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Trimestre
                                </label>
                                <Reactstrap.Input
                                    className='form-control-alternative is-invalid'
                                    placeholder='Ej:1'
                                    type='number'
                                    name='number'
                                    value={formData.number}
                                    required
                                    onChange={handleChange}
                                />
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
                                    Registrar
                                </Reactstrap.Button>
                            </div>
                        </Reactstrap.Form>
                    </Reactstrap.CardBody>
                </Reactstrap.Card>
            </div>
        </Reactstrap.Modal>
    )

}

