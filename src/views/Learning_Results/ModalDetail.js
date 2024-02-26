import * as Reactstrap from "reactstrap";

const ModalDetalleRegistro = ({ learningResult, toggleShow }) => {
  return (
    <Reactstrap.Modal
      className=" modal-lg modal-dialog-centered "
      isOpen={learningResult !== null}
      toggleShow={toggleShow}
    >
      <div divclassName="modal-body p-0 ">
        <Reactstrap.Card className="bg-secondary shadow border-0 ">
          <Reactstrap.CardHeader className="bg-transparent pb-1">
            <Reactstrap.ModalHeader toggle={toggleShow} className="col-12 p-0">
              <div>
                <h4>
                  Detalle del Resultado de Aprendizaje:{" "}
                  <small>{learningResult?.learning_result_code ? learningResult?.learning_result_code : learningResult?._id}</small>
                </h4>
              </div>
            </Reactstrap.ModalHeader>
          </Reactstrap.CardHeader>
          <Reactstrap.CardBody className=" pl-5 mb-3">
            <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
              <Reactstrap.Col md="4">
                <label className="text-primary">Resultado de Aprendizaje</label>
                <p>{learningResult?.learning_result}</p>
              </Reactstrap.Col>
              <Reactstrap.Col md="4">
                <label className="text-primary">
                  Codigo de la Competencia:
                </label>
                <p>{learningResult?.learning_result_code ? learningResult?.learning_result_code : learningResult?._id} </p>
              </Reactstrap.Col>
            </Reactstrap.Row>
           
          </Reactstrap.CardBody>
        </Reactstrap.Card>
      </div>
    </Reactstrap.Modal>
  );
};

export default ModalDetalleRegistro;
