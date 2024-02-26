import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Modal,
    ModalHeader,
    UncontrolledTooltip
} from "reactstrap";

const ModalExample = ({ isOpen, toggle,  record }) => {

    const [data, setData] = useState([]);
    const show=()=>{
        toggle(false)
    }
    useEffect(() => {
         setData(record)
    }, [isOpen])
    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={isOpen} toggle={toggle}
        >
            <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-1">
                        <ModalHeader toggle={show} className='col-12 p-0'>
                            <div className='d-flex align-items-center'>
                                <i className="fa-solid fa-eye mx-1 mb-2"></i> <h4>Ficha</h4>
                            </div>

                        </ModalHeader>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">

                        <Form>
                            <FormGroup className="mb-3">
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Ficha
                                </label>
                                <p>{data?.number_record}</p>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <label
                                    className="form-control-label"
                                    htmlFor="start_date"
                                    id="cuestion1"
                                >
                                    Fecha inicial
                                </label>
                                <i className="fa-regular fa-circle-question fa-sm  mx-1" ></i>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="cuestion1"
                                >
                                    fecha de creacion de la ficha
                                </UncontrolledTooltip>
                                <p>{data?.start_date}</p>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <label
                                    className="form-control-label"
                                    htmlFor="start_date"
                                    id="cuestion2"
                                >
                                    Fecha final
                                </label>
                                <i className="fa-regular fa-circle-question fa-sm  mx-1" ></i>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="cuestion2"
                                >
                                    fecha de finalizacion de la ficha
                                </UncontrolledTooltip>
                                <p>{data?.finish_date}</p>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <label
                                    className="form-control-label"
                                    htmlFor="start_date"
                                    id="cuestion3"
                                >
                                    Instructor lider 
                                </label>
                                <i className="fa-regular fa-circle-question fa-sm  mx-1" ></i>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="cuestion3"
                                >
                                    ingresa el email o nombre del instructor que sera Lider de ficha
                                </UncontrolledTooltip>
                                <Input
                                    className='form-control-alternative'
                                    placeholder=''
                                    type='date'
                                    name='finish_date'
                                    value={data?.user}
                                    required

                                />
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Modal>
    );
};

export default ModalExample;