import * as Reactstrap from "reactstrap";

const ModalDetalleRegistro = ({ project, toggleShow }) => {
  console.log(project)
  return (
    <Reactstrap.Modal 
    className=" modal-lg modal-dialog-centered "
    isOpen={project !== null} 
    toggleShow={toggleShow} 
    >
        <div divclassName="modal-body p-0 ">
        <Reactstrap.Card className="bg-secondary shadow border-0 ">
          <Reactstrap.CardHeader  className="bg-transparent pb-1"   >
            <Reactstrap.ModalHeader toggle={toggleShow} className="col-12 p-0">
          <div>
            <h4>Detalle del Proyecto: <small>{project?.name}</small></h4>
            </div>
          </Reactstrap.ModalHeader>
          </Reactstrap.CardHeader>
      <Reactstrap.CardBody className=" pl-5 mb-3">
      <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Nombre del Proyecto:</label>
        <p> {project?.name}</p>
        </Reactstrap.Col>

        <Reactstrap.Col md="4">
        <label className="text-primary">Estado: </label>
        <p>{project?.state}</p>
      </Reactstrap.Col>
      </Reactstrap.Row>

      <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Planteamiento del Problema:</label>
        <p> {project?.problem_statement}</p>
        </Reactstrap.Col>
 
        <Reactstrap.Col md="4">
        <label className="text-primary">Justificación de Proyecto: </label>
        <p>{project?.project_justification}</p>
        </Reactstrap.Col>
        </Reactstrap.Row>

        <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Objetivo General: </label>
        <p>{project?.general_objective}</p>
        </Reactstrap.Col>

        <Reactstrap.Col md="4">
        <label className="text-primary">Alcance de Viabilidad:</label>
        <p>{project?.scope_feasibility}</p>
        </Reactstrap.Col>
        </Reactstrap.Row>
        
        <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Objetivos Especificos: </label>
        <ul>
        {project?.specific_objectives.map((e,index)=>{
            return <li>{1+index}. {e}</li>
        })}
        </ul>
        </Reactstrap.Col>

        <Reactstrap.Col md="4">
        <label className="text-primary">Glosario: </label>
        <ul>
            {project?.glossary.map((g,index)=>{
                return <li>{1+index}. {g}</li>
            })}
        </ul>
        </Reactstrap.Col>
        </Reactstrap.Row>

        <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Resumen del Proyecto:</label>
        <p> {project?.project_summary}</p>
        </Reactstrap.Col>

        <Reactstrap.Col md="4">
        <label className="text-primary">Investigación Tecnologica:</label>
        <p> {project?.technological_research} </p>
        </Reactstrap.Col>
        </Reactstrap.Row>

        <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Fecha de Presentación: </label>
        <p>{ project?.date_presentation }</p>
        </Reactstrap.Col>

        
        <Reactstrap.Col md="4">
        <label className="text-primary">Fecha de Aprobación: </label>
        <p>{project?.approval_date}</p>
        </Reactstrap.Col>
        </Reactstrap.Row>
        
        <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
       <Reactstrap.Col md="8">
       <label className="text-primary">categorias</label>
       <ul>
        {project?.category.map((c,index) => {
            return <li>{1+index}. {c.name}</li>
        })}
       </ul>
       </Reactstrap.Col>
       </Reactstrap.Row>

      
      </Reactstrap.CardBody>
    </Reactstrap.Card>
    </div>
    </Reactstrap.Modal>
  );
};

export default ModalDetalleRegistro;
