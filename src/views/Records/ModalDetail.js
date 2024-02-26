import * as Reactstrap from "reactstrap";

const ModalDetalleRegistro = ({ record, toggleShow }) => {

  return (
    <Reactstrap.Modal 
    className=" modal-lg modal-dialog-centered "
    isOpen={record !== null} 
    toggleShow={toggleShow} 
    >
        <div divclassName="modal-body p-0 ">
        <Reactstrap.Card className="bg-secondary shadow border-0 ">
          <Reactstrap.CardHeader  className="bg-transparent pb-1"   >
            <Reactstrap.ModalHeader toggle={toggleShow} className="col-12 p-0">
          <div>
            <h4>Detalle de la Ficha: <small>{record?.number_record}</small></h4>
            </div>
          </Reactstrap.ModalHeader>
          </Reactstrap.CardHeader>
      <Reactstrap.CardBody className=" pl-5 mb-3">
      <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Número de ficha:</label>
        <p> {record?.number_record}</p>
        </Reactstrap.Col>

        <Reactstrap.Col md="4">
        <label className="text-primary">Fecha de Inicio: </label>
        <p>{record?.start_date}</p>
      </Reactstrap.Col>
      </Reactstrap.Row>

      <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
          <Reactstrap.Col md="4">
        <label className="text-primary">Fecha Finalización: </label>
        <p>{record?.finish_date}</p>
      </Reactstrap.Col>

      <Reactstrap.Col md="4">
        <label className="text-primary">Programa de Formación :</label>
        <ul>
        {record?.formation_program.map((program) => {
            return <li>{program.program_name}</li>
        })}
       </ul>
        </Reactstrap.Col>
   
        </Reactstrap.Row>

        <Reactstrap.Col>
        <label className="text-primary" style={{marginLeft: '23em'}}>Datos del Instructor :</label>
       
        <ul>
        {record?.user?.map((users) => {
            return <li>
              <span style={{fontSize:'15px', marginLeft:'12em'}} className="text-primary">Nombre: </span>{users.complete_names} 
            
            <p><span style={{fontSize:'15px', marginLeft:'12em'}} className="text-primary">Correo: </span>{users.email}</p>
            
            {/* <p className="mt-0"> */}
          <label style={{fontSize:'15px', marginLeft:'12em'}}className="text-primary">Centro de Formación:</label>
          {users.training_center.map((d) => (
            <span>{d.training_center}</span>
          ))}
        {/* </p>        */}
            </li>
        })}
       </ul>
        </Reactstrap.Col>
      
      </Reactstrap.CardBody>
    </Reactstrap.Card>
    </div>
    </Reactstrap.Modal>
  );
};

export default ModalDetalleRegistro;
