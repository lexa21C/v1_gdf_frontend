import React from 'react'
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';

function UpdateModal(data) {

    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    }

    // form updating data
    const [id] = useState(data.id);
    const [type_program, setTypeProgram] = useState(data.type_program);

    const mensajes = () => {
        toast.success('Tipo de programa actualizado!', {
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

    
    const onSubmit2 = async (e,_id) => {
        try {
            e.preventDefault();
            const data = new FormData();
            data.append('id', data.id);
            data.append('type_program', data.type_program);

            const saveData = ( id, type_program ) => {
                return { type_program: type_program, id: id };
            }

            const save = saveData(id, type_program);
            console.log(save);
            
            //
            const res = await axios.put(`http://localhost:3005/typeProgram/${id}`, save).then(res => {
                console.log(res);
                initModal();
                mensajes();
            });
            
        } catch (error) {
            console.log(error);
            console.warn(error)
        }
    }

    return (
        <>
            <Button variant='success' onClick={initModal}>
            <i className="fas fa-pen"></i>
            </Button>

            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>

                <form onSubmit={onSubmit2}>
                    <Modal.Body>
                        <p>Are you sure you want to update this user?</p>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control  type='text'
                                    name='type_program'
                                    placeholder='Enter type program name'
                                    value={type_program}
                                    onChange={(e) => setTypeProgram(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='danger' onClick={initModal}>
                            Close
                        </Button>
                        <Button type='submit' variant='dark'>
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default UpdateModal
