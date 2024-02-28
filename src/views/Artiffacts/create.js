import React from 'react'
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { Input } from "reactstrap";
import { toast } from 'react-toastify';


function CreateModal(props) {

    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    }

    // form updating data
    const [data, setData] = useState({
        name: '',
        description: '',
        learningResults: props.learningResult
    });

    const [/* error, */ setError] = useState({});


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const mensajes = () => {
        toast.success('proyecto creado correctamente!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const url = 'api/v1/artiffacts';
            const { data: res } = await axios.post(url, data).then((res) => {
                initModal();
                mensajes();
                setData({ ...data, name: '',description:''});
            });
        } catch (error) {

            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data);
            }
        }
    }

    return (
        <div >
            <Button size='20' 
            variant='hidden' 
            className="p-1  btn-neutral " 
            onClick={initModal}>
            <i className="fa-solid fa-circle-plus "></i>
            </Button>

            <Modal show={isShow}>
                <Modal.Header  onClick={initModal}>
                    <Modal.Title>Registrar Artefacto  </Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre del artefacto</Form.Label>
                            <Input
                                className="form-control-alternative"
                                placeholder="nombre del artefacto"
                                type="text"
                                name="name"
                                value={data.name}
                                required
                                onChange={handleChange}
                                maxLength={50}

                            />
                        </Form.Group>
                        <div className='mt-2'>
                            <Form.Group>
                                <Form.Label>Descripcion</Form.Label>
                                <Input
                                    className="form-control-alternative"
                                    placeholder="Descripcion"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    required
                                    onChange={handleChange}
                                    maxLength={150}
                                />
                            </Form.Group>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='danger' onClick={initModal}>
                            Cerrar
                        </Button>
                        <Button color="primary" type="submit">
                            Registrar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default CreateModal
