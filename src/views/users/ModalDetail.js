import * as Reactstrap from "reactstrap";

const ModalDetalleRegistro = ({ user, toggleShow }) => {

  return (
    <Reactstrap.Modal 
    className=" modal-lg modal-dialog-centered "
    isOpen={user !== null} 
    toggleShow={toggleShow} 
    >
        <div divclassName="modal-body p-0 ">
        <Reactstrap.Card className="bg-secondary shadow border-0 ">
          <Reactstrap.CardHeader  className="bg-transparent pb-1"   >
            <Reactstrap.ModalHeader toggle={toggleShow} className="col-12 p-0">
          <div>
            <h4>Detalle del Usuario: <small>{user?.complete_names}</small></h4>
            </div>
          </Reactstrap.ModalHeader>
          </Reactstrap.CardHeader>
      <Reactstrap.CardBody className=" pl-5 mb-3">
      <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Nombre del Usuario:</label>
        <p> {user?.complete_names}</p>
        </Reactstrap.Col>

        <Reactstrap.Col md="4">
        <label className="text-primary">Correo: </label>
        <p>{user?.email}</p>
      </Reactstrap.Col>
      </Reactstrap.Row>

      <Reactstrap.Row  className="d-flex justify-content-center flex-wrap ml-5">
        <Reactstrap.Col  md="4">
        <label className="text-primary">Tipo de perfil  :</label>
        <ul>
          {user?.type_profile?.map((types)=> {
            return <li>{types.type_profile}</li>
          })}
        </ul>
       
        </Reactstrap.Col>
        <Reactstrap.Col  md="5">
        <label className="text-primary">Programa de Formación :</label>
        <ul>
          {user?.formation_program?.map((program)=> {
            return <li>{program.program_name}</li>
          })}
        </ul>
        </Reactstrap.Col>
 
        {/* <Reactstrap.Col md="4">
        <label className="text-primary"> Centro de Formación : </label>
          <ul>
          {user?.training_center.map((center)=> {
            return <li>{center.training_center}</li>
          })}
        </ul>
        </Reactstrap.Col> */}
        </Reactstrap.Row>

        

      </Reactstrap.CardBody>
    </Reactstrap.Card>
    </div>
    </Reactstrap.Modal>
  );
};

export default ModalDetalleRegistro;
