import React from "react";
import { Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";

const AlertModal = ({api, onClose}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(api);
      onClose(false);
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      // Lógica adicional para manejar el error en caso necesario
    }
  };

  return (
    <Col md="4">
      <Modal
        size="sm"
        className={`modal-dialog-centered modal-warning`} // Agrega la clase correspondiente al tipo de alerta
        // Agrega la clase de fondo correspondiente al tipo de alerta
        isOpen={true} // Usa el prop isOpen para controlar la apertura del modal
        toggle={onClose}
      >
        <ModalHeader toggle={onClose}>Ten cuidado!!</ModalHeader>
        <ModalBody>
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x fs-3" />
            <h4 className="heading mt-4">Estas Seguro?</h4>
            <p>Deseas eliminar este registro?</p> {/* Usa el prop 'message' para mostrar el mensaje */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" type="button" onClick={handleDelete}>
            Si 
          </Button>
          <Button className="text-white ml-auto" color="link" type="button"  onClick={() => onClose(false)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </Col>
  );
};

export default AlertModal;