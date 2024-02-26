import { useState, useEffect } from "react";
import Header from "components/Headers/HEAD.js";
import * as Reactstrap from "reactstrap";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Modal from "./modal.js"
import ModalQuarter from "./modalQuarter";
import { NavLink as NavLinkRRD } from "react-router-dom";
import routes from "../../routes.js";
import { NavLink } from 'react-router-dom';
import AlertModal from '../../components/Alert/ALertModalCuestion.js'; 



const Butonn = (routeName, data, name) => {
    const matchingRoute = routes.find(route => route.name === routeName);

    if (!matchingRoute) {
        return null;
    }

    const { path, layout, icon, name: routeDisplayName } = matchingRoute;

    const getModifiedPath = (path, data, name) => {
        let modifiedPath = path;

        if (data !== null) {
            const dataStartIndex = path.indexOf('=/:');
            const dataEndIndex = path.indexOf('/&');
            modifiedPath = `${path.slice(0, dataStartIndex)}=/${data}${path.slice(dataEndIndex)}`;
        }

        if (name !== undefined && name !== null) { // Verifica si name no es undefined
            const nameStartIndex = modifiedPath.indexOf('&/:');
            modifiedPath = `${modifiedPath.slice(0, nameStartIndex)}&/${name}`;
        }

        return modifiedPath;
    };

    const modifiedPath = getModifiedPath(path, data, name);

    return (
        <>
            <Reactstrap.Button
                color="primary"
                type="button"
                className="btn-neutral btn-sm"
                onClick={(e) => {
                    e.preventDefault();
                }}
                id={`tooltip${data + path.length}`}
            >
                <NavLink
                    to={`${layout}${modifiedPath}`}
                    tag={NavLinkRRD}
                    activeClassName="active"
                    className="p-0"
                >
                    <i className={icon} />
                </NavLink>
            </Reactstrap.Button>
            <Reactstrap.UncontrolledTooltip
                delay={0}
                target={`tooltip${data + path.length}`}
            >
                {routeDisplayName}
            </Reactstrap.UncontrolledTooltip>
        </>
    );
};

const Index = () => {
    let [artiffacts, setArtiffacts] = useState([])
    let { formation_program } = useParams()
    let { program } = useParams()

    const [mostrarBoton, setMostrarBoton] = useState(false);

    const [artiffactOne, setArtiffactOne] = useState([])
    const [data, setData] = useState([])
    const [quarterId, setQuarterId] = useState(null)

    const [modal, setModal] = useState(false)
    const [type, setType] = useState(false)

    let [ddelete, setDeleter] = useState(false)
    const [quarter, setQuarter] = useState([])
    const [ createArtiffact, setCreateArtiffact] = useState(null)
    const [typeQuarter, setTypeQuarter] = useState(false)
    const [modalQuarter, setModalQuarter] = useState(false)
    const [showAlert, setShowAlert] = useState(false);

    const [records, setRecords] = useState([])
    const [modalDelete, setModalDelete] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteApi, setDeleteApi] = useState(null)
    const competence = data?.map((e) => {
        return e.competences
    })

    const toggle = () => {
        setModal(!modal);
        setType(false);
    };

    const toggle2 = () => {
        setModalQuarter(!modalQuarter)
        setTypeQuarter(false)

    };

    const toggle3 = () => {
        setMostrarBoton(!mostrarBoton);
    };

    const Edit = (r) => {
        setQuarter(r);
        setModalQuarter(!modalQuarter);
        setTypeQuarter(true);
    };

    const Edit2 = (item) => {
        setArtiffactOne(item)
        setModal(!modal);
        setType(true);
    }

    const deletes = async (id) => {
        // Configura showAlert a true para mostrar la alerta
        setShowAlert(true);
        setDeleteItemId(id);
        setDeleteApi('quarter')
    }


    const deletes1 = async (id) => {
        setShowAlert(true);
        console.log(id)
        setDeleteItemId(id);
        setDeleteApi('artiffacts')
    }



    // const deletesArtiffact = async (id) => {
    //     await axios.delete(`/api/v1/artifacts/${id}`).then(() => {
    //         setDeleter(!ddelete);
    //     });
    // }


    useEffect(() => {
        setQuarterId(quarter?._id)
        async function fetchData() {
            const { data } = await axios.get(
                `api/v1/quarter/${formation_program}`
            );
            setData(data.results);
            console.log('quater:', data.results)

            const records = await axios.get(
                `api/v1/records/${formation_program}`
            );
            setRecords(records.data.results)
            if (quarterId != null) {
                await axios.get(`api/v1/artifacts/quarter/${quarterId}`).then(
                    ({ data }) => {
                        setArtiffacts(data.results)
                        console.log(artiffacts)
                    }
                )
            }
        }
        fetchData();
    }, [modalQuarter, quarter, quarterId, modal, showAlert, ddelete]);


    return (
        <>
            <Modal
                isOpen={modal}
                toggle={toggle}
                type={type}
                competences={artiffacts}
                quarterId={quarter._id}
                OneArtiffact={artiffactOne}
            />
            <Header />
            <ModalQuarter
                isOpen={modalQuarter}
                toggle={toggle2}
                type={typeQuarter}
               
                quarter={quarter}
                artiffactOne={artiffactOne}
            />
         {showAlert && (
                <AlertModal
                    api={`api/v1/${deleteApi}/${deleteItemId}`} // Pasa la API correspondiente
                    onClose={(confirmed) => {
                        if (confirmed) {
                            // Realiza la eliminación si el usuario confirmó
                            deletes(deleteItemId);
                        }
                        setDeleteItemId(null); // Restablece el ID a null después de la confirmación o el cierre del modal
                        // Configura showAlert a false para ocultar la alerta
                        setShowAlert(false);
                    }}
                />

            )}

            {/* Page content */}
            <Reactstrap.Container className="mt--7" fluid>
                <Reactstrap.Row>
                    <Reactstrap.Col className="mb-5 mb-xl-0" xl="8">
                        <Reactstrap.Card className="bg-gradient-default shadow">
                            <Reactstrap.CardHeader className="bg-transparent">
                                <Reactstrap.Row className="align-items-center col-12">
                                    <div className="col-5">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            Trismestre por
                                        </h6>
                                        <h2 className="text-white mb-0">Artefactos</h2>
                                    </div>
                                    <Reactstrap.Col md="12">
                                        <Reactstrap.Card className="shadow">
                                            <Reactstrap.CardHeader className="bg-transparent">
                                                <Reactstrap.Row className="align-items-center">
                                                    <div className="col">
                                                    {createArtiffact !== null && (
  <Reactstrap.Button
    color="primary"
    type="button"
    className="btn-circle btn-neutral"
    onClick={toggle}
  >
    <i className="ni ni-fat-add" />
  </Reactstrap.Button>
)}

                                                    </div>
                                                </Reactstrap.Row>
                                            </Reactstrap.CardHeader>
                                            <Reactstrap.Table className="align-items-center table-flush bg-white shadow" responsive>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Descripcion</th>
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {artiffacts?.artiffacts?.map((item, index) => (
                                                        <tr key={index}>
                                                            <th scope="row text-white"><p color="primary">{item.name}</p></th>
                                                            <td>{item.description}</td>
                                                            <td>
                                                                <Reactstrap.Button
                                                                    color="primary"
                                                                    type="button"
                                                                    className="btn-neutral  btn-sm m-0"
                                                                    onClick={() => Edit2(item)}
                                                                    id={`icon1${item._id}`}
                                                                >
                                                                    <i className="fa-solid fa-pencil"></i>
                                                                </Reactstrap.Button>
                                                                <Reactstrap.UncontrolledTooltip
                                                                    delay={0}
                                                                    target={`icon1${item._id}`}
                                                                >
                                                                    Editar
                                                                </Reactstrap.UncontrolledTooltip>
                                                                <Reactstrap.Button
                                                                    color="primary"
                                                                    type="button"
                                                                    className="btn-neutral  btn-sm m-3"
                                                                    onClick={() => deletes1(item._id)}
                                                                    id={`icon1${item.borrar}`}
                                                                >
                                                                    <i className="fa-solid fa-trash"></i>
                                                                </Reactstrap.Button>
                                                                <Reactstrap.UncontrolledTooltip
                                                                    delay={0}
                                                                    target={`icon1${item.borrar}`}
                                                                >
                                                                    Eliminar
                                                                </Reactstrap.UncontrolledTooltip></td>
                                                                
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Reactstrap.Table>
                                        </Reactstrap.Card>
                                    </Reactstrap.Col>
                                </Reactstrap.Row>
                            </Reactstrap.CardHeader>
                        </Reactstrap.Card>
                    </Reactstrap.Col>

                    <Reactstrap.Col xl="4">
                        <Reactstrap.Card className="shadow">
                            <Reactstrap.CardHeader className="bg-transparent">
                                <Reactstrap.Row className="align-items-center col-12">
                                    <div className="col-6">
                                        <h2 className="mb-0">Trimestre :{quarter?.number}</h2>
                                    </div>
                                    <div className="col-6">
                                        <Reactstrap.Button color="primary"
                                            type="button"
                                            className="btn-circle btn-neutral ml-8"
                                            onClick={toggle2}>
                                            <i className="ni ni-fat-add" />
                                        </Reactstrap.Button>
                                    </div>
                                </Reactstrap.Row>
                            </Reactstrap.CardHeader>
                                <Reactstrap.Table className="align-items-center table-flush bg-white shadow" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                        <th scope="col">Trimestre</th>
                                        <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((r, index) => {
                                            return ( 
                                                <tr key={r._id}>
                                               <td onClick={() => setQuarter(r)}>{r.number}</td>
                                               <td>
                                                   <Reactstrap.Button
                                                       color="primary"
                                                       type="button"
                                                       className="btn-neutral  btn-sm m-0"
                                                 
                                                       onClick={() => Edit(r)}
                                                       id={`icon1${r._id}`}
                                                   >
                                                       <i className="fa-solid fa-pencil"></i>
                                                   </Reactstrap.Button>
                                                   <Reactstrap.UncontrolledTooltip
                                                       delay={0}
                                                       target={`icon1${r._id}`}
                                                   >
                                                       Editar
                                                   </Reactstrap.UncontrolledTooltip>
                                                   <Reactstrap.Button
                                                   color="primary"
                                                   type="button"
                                                   className="btn-neutral  btn-sm m-3"
                                                   onClick={() => deletes(r._id)}
                                                   id={`icon1${r.borrar}`}
                                               >
                                                   <i className="fa-solid fa-trash"></i>
                                               </Reactstrap.Button>
                                               <Reactstrap.UncontrolledTooltip
                                                   delay={0}
                                                   target={`icon1${r.borrar}`}
                                               >
                                                   Eliminar
                                               </Reactstrap.UncontrolledTooltip>
                                               <Reactstrap.Button
                                                   color="primary"
                                                   type="button"
                                                   className="btn-neutral  btn-sm m-1"
                                                //    onClick={() => setQuarter(r)}
                                                   onClick={() => {
                                                    setQuarter(r);
                                                    setCreateArtiffact(true);
                                                  }}
                                                   id={`icon1${r.number}`}
                                               >
                                                   <i className="ni ni-tv-2"></i>
                                               </Reactstrap.Button>
                                               <Reactstrap.UncontrolledTooltip
                                                   delay={0}
                                                   target={`icon1${r.number}`}
                                               >
                                                  Artefactos
                                               </Reactstrap.UncontrolledTooltip>
                                            
                                               
                                                    
                                                   
                                               </td>
                                           </tr>
                                                )})}
                                    </tbody>
                                </Reactstrap.Table>
                        </Reactstrap.Card>
                    </Reactstrap.Col>
                </Reactstrap.Row>
            </Reactstrap.Container>
        </>
    );
};

export default Index;

