import React, { useState, useEffect } from 'react';
import * as Reactstrap from 'reactstrap'
import axios from 'axios';
import { show_alert } from 'components/Alerts/Alert.js';

export default function Modal({ isOpen, toggle, type,competences ,quarterId,OneArtiffact}) {
    const [data, setData] = useState({});
    useEffect(()=>{ 
        if (type === true) {
               setData(OneArtiffact)
        }else{
            setData({
                competence: '',
                quarter:quarterId,
                name: '' ,
                description: '',
            })
        }
    },[OneArtiffact,type,quarterId])
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const handleSubmit = (e) => {   
        e.preventDefault();
        try {
            if (type === false) {
                
                 axios.post('api/v1/artiffacts', data).then((response) => {
    
                   const { data: res } = response
                   if (response.data.code === 'success'){
                       show_alert('Creado Correctamente', 'success')
                } else {


                       show_alert(response.data.message, 'Failed')
                    
                   }
                });
           

            } else {
                show_alert('Editado correctamente', 'success')
                const { data: res } = axios.put(`api/v1/artiffacts/${data._id}`, data);
            }

            toggle(!toggle);

            setData({
                competence: '',
                quarter:quarterId,
                name: '',
                description: '',
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
                                <h4>Artefacto</h4>
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
                                    Nombre
                                </label>
                                <Reactstrap.Input
                                    className='form-control-alternative is-invalid'
                                    placeholder='Ej:Artefacto 1'
                                    type='String'
                                    name='name'
                                    value={data.name}
                                    required
                                    onChange={handleChange}
                                />
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup className="mb-3">
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Descripcion
                                </label>
                                <Reactstrap.Input
                                    className='form-control-alternative is-invalid'
                                    placeholder='Ej:Este artefacto contendra los casos de uso'
                                    type='textarea'
                                    name='description'
                                    value={data.description}
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

                                <select
                                    className="form-control"
                                    type="text"
                                    name="competence"
                                    required
                                    value={data.competence}
                                    onChange={handleChange}
                                    style={{ width: "100%" }}
                                >
                                    <option value="" hidden>Seleccione una competicion</option>
                                     {competences?.competence?.map((e,index)=>(<option value={e._id}>{index+1}.{e.labor_competition}</option>))}
                                </select>
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