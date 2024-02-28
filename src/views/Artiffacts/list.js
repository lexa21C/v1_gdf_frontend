import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Input } from 'reactstrap';
import axios from 'axios';
import {confirmed_alert} from '../../components/Alerts/Alert'


async function getData(learningResult) {
    const { data } = await axios.get(`http://localhost:3500/api/v1/artiffacts/${learningResult}`);
    return data.results;
}


function LisModal(props) {
    const [isShow, invokeModal] = useState(false);
    const [artifacts, setArtifacts] = useState([]);


    async function Delete(id) {
        
        invokeModal(!isShow);
        
        confirmed_alert(
            "¿Estas seguro de eliminar la ficha?",
            "warning",
            `api/v1/artiffacts/${id}`
        )
        .then(
            async function fetchData() {
                const results = await getData(props.learningResult);
                setArtifacts(results);
            }
         );
    }
    const initModal = () => {
        async function fetchData() {
            const results = await getData(props.learningResult);
            setArtifacts(results);
        }
        fetchData();
        return invokeModal(!isShow);
    };
    useEffect(() => {

    }, [props.learningResult]);

    const handleArtifactChange = (index, event) => {
        const newArtifacts = [...artifacts];
        newArtifacts[index] = {
            ...newArtifacts[index],
            [event.target.name]: event.target.value,
        };
        setArtifacts(newArtifacts);
    };

    const handleEditArtifact = (index) => {
        const artifactToEdit = artifacts[index];
        axios.put(`api/v1/artiffacts/${artifactToEdit._id}`, artifactToEdit).then(
        )
    };

    return (
        <div>
            <Button size="20" variant="hidden" 
            className="btn-neutral  btn-sm "
             onClick={initModal}>
            <i className="fa-solid fa-pencil"></i>
            </Button>

            <Modal show={isShow}>
                <Modal.Header onClick={initModal}>
                    <Modal.Title>Artefactos232</Modal.Title>
                </Modal.Header>
                {artifacts?.map((artifact, index) => (
                    <form key={artifact._id}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Nombre del artefacto</Form.Label>
                                <Input
                                    className="form-control-alternative"
                                    placeholder="sin nombre"
                                    type="text"
                                    name="name"
                                    value={artifact.name}
                                    onChange={(event) => handleArtifactChange(index, event)}
                                    required
                                />
                            </Form.Group>
                            <div className="mt-2">
                                <Form.Group>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="sin descripcion"
                                        type="text"
                                        name="description"
                                        value={artifact.description}
                                        onChange={(event) => handleArtifactChange(index, event)}
                                        required
                                    />
                                </Form.Group>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                             variant="danger" 
                             onClick={()=>Delete(artifact._id)}>
                                Borrar
                            </Button>
                            <Button
                                color="primary"
                                type="button"
                                onClick={() => handleEditArtifact(index)}
                            >
                                Editar
                            </Button>
                        </Modal.Footer>
                    </form>
                ))}
            </Modal>
        </div>
    );
}

export default LisModal;