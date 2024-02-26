import React, { useEffect, useState } from 'react';
import * as Reactstrap from 'reactstrap';


const ModalObject = ({ isOpenObjective, toggle2, onSelect, type, dataEdit }) => {
    const [inputs, setInputs] = useState([]);

    const handleAddInput = () => {
        setInputs([...inputs, '']);
    };

    const handleInput = (event, index) => {
        const { value } = event.target;
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        onSelect(newInputs);
    };

    const handleDeleteInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        onSelect(newInputs);
    };
    const handleCloseModal = () => {
        toggle2();
        // alert('Objetivos Especificos agregados con éxito');
    };

    useEffect(() => {
        if (type === true) {
            setInputs(dataEdit);
        } else {
            setInputs(['', '', '']);
        }
    }, [type]);

    return (
        <Reactstrap.Modal className="mt-5 modal-lg " isOpen={isOpenObjective} toggle={toggle2}>
            <div className="modal-body p-0">
                <Reactstrap.Card className="bg-secondary shadow border-0">
                    <Reactstrap.CardHeader className="bg-transparent pb-1">
                        <Reactstrap.ModalHeader toggle={toggle2} className="col-12 p-0" >
                            <span >Objetivos Especificos</span>
                        </Reactstrap.ModalHeader>
                    </Reactstrap.CardHeader>
                    <Reactstrap.CardBody className="px-lg-5 py-lg-2 ">
                        <div className="d-flex flex-wrap">
                            <Reactstrap.Col md="12" >
                                <Reactstrap.FormGroup >

                                    <Reactstrap.Col style={{ height: '631px', overflowY: 'auto' }} >
                                        {inputs.slice(0, 20).map((value, index) => (
                                            <Reactstrap.Col className='mt-4'>
                                                <Reactstrap.Card className="card-stats mb-4 mb-xl-0">
                                                    <div
                                                        className="d-flex justify-content-end ml-auto mr-2 mt-2 "
                                                        onClick={() => handleDeleteInput(index)}>

                                                        <i className="fa-solid fa-xmark"   /* style={{color: "#ff0000",}} */></i>

                                                    </div>
                                                    <div key={index} className="col ">
                                                        <Reactstrap.CardTitle
                                                            tag="h4"
                                                            className="text-uppercase text-muted mb-0 "
                                                        >
                                                            objetivo {1 + index}
                                                        </Reactstrap.CardTitle>

                                                        <Reactstrap.Input
                                                            className='border-white'
                                                            type="textarea"
                                                            rows="3"
                                                            value={value}
                                                            onChange={(event) => handleInput(event, index)}
                                                            style={{ marginBottom: index === inputs.length - 1 ? '10px' : 0 }}
                                                        />

                                                        
                                                    </div>
                                                </Reactstrap.Card>

                                            </Reactstrap.Col>
                                        ))}
                                    </Reactstrap.Col>

                                    <Reactstrap.Button className="my-4" color="primary" type="submit" onClick={handleAddInput}>
                                        Agregar Objetivo
                                    </Reactstrap.Button>

                                    <Reactstrap.Button className="my-4" color="success" type="button" onClick={handleCloseModal}>
                                        Guardar y Salir
                                    </Reactstrap.Button>
                                </Reactstrap.FormGroup>
                            </Reactstrap.Col>
                        </div>
                    </Reactstrap.CardBody>
                </Reactstrap.Card>
            </div>
        </Reactstrap.Modal>
    );
};

export default ModalObject;
