import * as Reactstrap from "reactstrap";

const ModalDetalleRegistro = ({ competence, toggleShow }) => {
  return (
    <Reactstrap.Modal
      className=" modal-lg modal-dialog-centered "
      isOpen={competence !== null}
      toggleShow={toggleShow}
    >
      <div divclassName="modal-body p-0 ">
        <Reactstrap.Card className="bg-secondary shadow border-0 ">
          <Reactstrap.CardHeader className="bg-transparent pb-1">
            <Reactstrap.ModalHeader toggle={toggleShow} className="col-12 p-0">
              <div>
                <h4>
                  Detalle de la Competencia:{" "}
                  <small>{competence?.labor_competence_code}</small>
                </h4>
              </div>
            </Reactstrap.ModalHeader>
          </Reactstrap.CardHeader>
          <Reactstrap.CardBody className=" pl-5 mb-3">
            <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
              <Reactstrap.Col md="4">
                <label className="text-primary">Competencia</label>
                <p>{competence?.labor_competition}</p>
              </Reactstrap.Col>
              <Reactstrap.Col md="4">
                <label className="text-primary">
                  Codigo de la Competencia:
                </label>
                <p> {competence?.labor_competence_code}</p>
              </Reactstrap.Col>
            </Reactstrap.Row>
            <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
              <Reactstrap.Col md="4">
                <label className="text-primary">Version:</label>
                <p>{competence?.labor_competition_version}</p>
              </Reactstrap.Col>
              <Reactstrap.Col md="4">
                <label className="text-primary">
                  Horas:
                </label>
                <p> {competence?.estimated_duration}</p>
              </Reactstrap.Col>
            </Reactstrap.Row>
          </Reactstrap.CardBody>
        </Reactstrap.Card>
      </div>
    </Reactstrap.Modal>
  );
};

export default ModalDetalleRegistro;
