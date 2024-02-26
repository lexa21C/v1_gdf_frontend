import React, { useEffect, useState } from 'react';
import * as Reactstrap from 'reactstrap'


const ModalGlosary = ({ isOpenGlosary, toggle3, onSelectGlosary, type, dataEditGlosary }) => {
    const [inputs, setInputs] = useState(['', '', '', '']);

    const handleAddInput = () => {
        setInputs([...inputs, ""]);
    };

    const handleInput = (event, index) => {
        const { value } = event.target;
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        onSelectGlosary(newInputs)
    };

    const handleDeleteInputGlosary = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        onSelectGlosary(newInputs);
    };

    const handleCloseModalGlosary = () => {
        toggle3();
    };

    useEffect(() => {
        if (type === true) {
            setInputs(dataEditGlosary);

        } else {
            setInputs(['', '', ''])
        }
    }, [type])



    return (
        <Reactstrap.Modal className="mt-5 modal-lg " isOpen={isOpenGlosary} toggle={toggle3}
        >
            <div className='modal-body p-0' >
                <Reactstrap.Card className='bg-secondary shadow border-0'>
                    <Reactstrap.CardHeader className='bg-transparent pb-1'>
                        <Reactstrap.ModalHeader toggle={toggle3} className='col-12 p-0'>
                            <span>Glosario</span>
                        </Reactstrap.ModalHeader>
                    </Reactstrap.CardHeader>
                    <Reactstrap.CardBody className="px-lg-5 py-lg-3">
                        <div className='d-flex flex-wrap '>

                            <Reactstrap.Col md="12">
                                <Reactstrap.FormGroup>

                                    <Reactstrap.Col style={{ height: '631px', overflowY: 'auto' }}>
                                        {inputs.slice(0, 20).map((value, index) => (
                                            <Reactstrap.Col className='mt-4' key={index}>
                                                <Reactstrap.Card className="card-stats mb-4 mb-xl-0">
                                                <div 
                                                className="d-flex justify-content-end ml-auto mr-2 mt-2 " 
                                                onClick={() => handleDeleteInputGlosary(index)}>  
                                                    
                                                    <i className="fa-solid fa-xmark"   /* style={{color: "#ff0000",}} */></i>

                                                        </div>
                                                    <div key={index} className="col">
                                                        <Reactstrap.CardTitle
                                                            tag="h5"
                                                            className="text-uppercase text-muted mb-0 "
                                                        >
                                                            glosario {1 + index}
                                                            
                                                        </Reactstrap.CardTitle>


                                                        <Reactstrap.Input
                                                            className='border-white'
                                                            type="textarea"
                                                            rows="2"
                                                            key={index}
                                                            value={value}
                                                            onChange={(event) => handleInput(event, index)}
                                                            style={{ marginBottom: index === inputs.length - 1 ? 0 : '10px' }}
                                                        />
                                                        

                                                    </div>
                                                </Reactstrap.Card>
                                            </Reactstrap.Col>

                                        ))}
                                    </Reactstrap.Col>
                                    <Reactstrap.Button className="my-4 " color="primary" type="submit" onClick={handleAddInput}>
                                        Agregar </Reactstrap.Button>


                                    <Reactstrap.Button className="my-4" color="success" type="button" onClick={handleCloseModalGlosary}>
                                        Guardar y Salir </Reactstrap.Button>
                                </Reactstrap.FormGroup>
                            </Reactstrap.Col>
                        </div>
                    </Reactstrap.CardBody>
                </Reactstrap.Card>
            </div>
        </Reactstrap.Modal>

    )
}

export default ModalGlosary;