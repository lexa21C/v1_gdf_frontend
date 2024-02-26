import React from "react";
import { Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useState,useEffect } from "react";
const AlertModal = ({ type, message, onClose }) => {
  const  [title,setTitle]=useState('');
  const  [color,setColor]=useState('');
  const  [subtitle,setsubtitle]=useState('');
  useEffect(()=>{
    if(type==='success'){
           setTitle("Has hecho un nuevo registro")
           setColor("primary")
           setsubtitle('Exito')
    }else{
      setTitle("Ups! al parecer ocurrio un problema")
      setColor(`warning`)
      setsubtitle('ERROR')
    }
  },[type])

  return (
    <Col md="4">
      <Modal
        size="sm"
        className={`modal-dialog-centered modal-${color}`} // Agrega la clase correspondiente al tipo de alerta
         // Agrega la clase de fondo correspondiente al tipo de alerta
        isOpen={true} // Usa el prop isOpen para controlar la apertura del modal
        toggle={onClose}
      >
        <ModalHeader toggle={onClose}>{subtitle}</ModalHeader>
        <ModalBody>
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x fs-3" />
            <h4 className="heading mt-4">{type}</h4>
            <p>{message}</p> {/* Usa el prop 'message' para mostrar el mensaje */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" type="button" onClick={onClose}>
            Ok,Entiendo!
          </Button>
          <Button className="text-white ml-auto" color="link" type="button" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Col>
  );
};

export default AlertModal;