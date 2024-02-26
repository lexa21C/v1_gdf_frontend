import * as Reactstrap from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";


const DetailArtiffacts = ({ artiffact, toggleShow }) => {
    const [artiffactD, setArtiffacts] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                if (artiffact) {
                    let url;
                    if (artiffact.artiffact) {
                        url = `api/v1/artifacts/show/${artiffact.artiffact[0]?._id}`;
                    } else {
                        url = `api/v1/artifacts/show/${artiffact?._id}`;
                    }
    
                    const response = await axios.get(url);
                    setArtiffacts(response.data.results);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        fetchData();
    }, [artiffact]);
    
    return (
        <Reactstrap.Modal
        style={{ marginTop: '195px' }} 
            className= " modal-lg "
            isOpen={artiffact !== null}
            toggleShow={toggleShow}
        >
            <div divclassName="modal-body p-0 ">
                <Reactstrap.Card className="bg-secondary shadow border-0 ">
                    <Reactstrap.CardHeader className="bg-transparent pb-1"   >
                        <Reactstrap.ModalHeader toggle={toggleShow} className="col-12 p-0">
                            <div>
                                <h4>Detalle del Artefacto: <small>{artiffactD?.name}</small></h4>
                            </div>
                        </Reactstrap.ModalHeader>
                    </Reactstrap.CardHeader>
                    <Reactstrap.CardBody className=" pl-5 mb-3">

                        <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
                            <Reactstrap.Col md="4">
                                <label className="text-primary">Nombre del Artefacto</label>
                                <p> {artiffactD?.name}</p>
                            </Reactstrap.Col>

                            <Reactstrap.Col md="4">
                                <label className="text-primary">Descripción del artefacto </label>
                                <p>{artiffactD?.description}</p>
                            </Reactstrap.Col>
                        </Reactstrap.Row>

                        <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
                            <Reactstrap.Col md="4">
                                <label className="text-primary">Competencias </label>
                                <ul>
                                    {artiffactD?.competence?.map((e) => {
                                        return <li>{e.labor_competition}</li>
                                    })}
                                </ul>
                            </Reactstrap.Col>

                            <Reactstrap.Col md="4">
                                <label className="text-primary">Trimestre </label>
                                <ul>
                                    {artiffactD?.quarter?.map((e) => {
                                        return <li className="ml-4">{e.number}</li>
                                    })}
                                </ul>
                            </Reactstrap.Col>
                        </Reactstrap.Row>


                    </Reactstrap.CardBody>
                </Reactstrap.Card>
            </div>
        </Reactstrap.Modal>
    )
}

export default DetailArtiffacts;
