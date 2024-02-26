import React, { useState, useEffect } from 'react';
import * as Reactstrap from 'reactstrap'
import axios from 'axios';
import { show_alert } from 'components/Alerts/Alert.js';
import { useParams } from 'react-router-dom';
import Select from "react-select";


export default function Modal({ isOpen, toggle, type, competences, quarter }) {
    let { formation_program } = useParams()
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [data, setData] = useState([]);
    const [ competence, setCompetence] = useState([])
    const getCompetenceIdFormation = async () => {
        const {data} = await axios.get(`api/v1/competences/${formation_program}`);
        console.log('competence', data.results)
        setCompetence(data.results)
    }
    useEffect(()=>{
      getCompetenceIdFormation()
        if (type === true) {
            setData(quarter)
            setSelectedOptions(
                quarter?.competence?.map((item) => ({
                  value: item._id,
                  label: item.labor_competition,
                })) || []
              );
        }else{
            setData({
                formation_program: formation_program,
                competence: '',
                number: ''
        })
        }
    },[quarter])
    let options = [];
    for (let i = 0; i < competences[0]?.length; i++) {
      options.push({
        value: competences[0][i]?._id,
        label: `${i+1}.${competences[0][i]?.labor_competition}`,
      });
    }

    const handleSelectChange = (selectedOption) => {
        setData({ ...data, competence: selectedOption.map((e) => e.value) });
        setSelectedOptions(selectedOption);
    };

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (type === false) {
                axios.post('api/v1/quarter', data).then((response) => {
                    console.log('modal')
                    console.log(response)
                const { data: res } = response
                if (response.data.code === 'success'){
                    console.log('error')
                    show_alert('Creado Correctamente', 'success')
                }
                else {
                    console.log('error')
                    show_alert(response.data.message, 'Failed')
                }
                });



            }else {
                show_alert('Editado correctamente', 'success')
                const { data: res } = axios.put(`api/v1/quarter/${data._id}`, data);
            }

            toggle(!toggle);

            setData({
                number: '',
                descrition: '',
                competence: '',
                formation_program: formation_program,
            })
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.error(error.response.data);
            }
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
                                    value={data.number}
                                    required
                                    onChange={handleChange}
                                />
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup className="mb-3">
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Competencias
                                </label>
                                <Select
                                    options={options}
                                    value={selectedOptions}
                                    isMulti
                                    onChange={handleSelectChange}
                                />
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

