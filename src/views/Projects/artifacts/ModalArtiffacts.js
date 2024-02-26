import * as Reactstrap from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import DetailArtiffacts from '../artifacts/DetailArtiffacts.js'

export default function ListArteffacts({ isOpenA, id, toggleA }) {
    const [artiffacts, setArtiffacts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const { recordid } = useParams();

    // detalle
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [type] = useState(false)

    const [recargar, setRecargar] = useState(false);
    const [isUploadAllowed] = useState(true); // Estado para permitir o no la subida de archivos

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = (idProject, id) => {
        const formData = new FormData();

        formData.set('doc', selectedFile);
        formData.set('project', idProject);
        formData.set('artiffact', id)
        formData.set('contentType', selectedFile.type)
        formData.set('name', selectedFile.name)

        axios.post('api/v1/documents', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then(() => {
            setRecargar(!recargar)
            setSelectedFile(null)
        });
    };

    const downloads = async (id, name) => {
        const response = await axios.get(`/api/v1/download/${id}`, { responseType: 'blob' })
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = name
        link.click()
    }

    // mostrar detalle 
    const detailArtiffact = (artiffact) => {
        setRegistroSeleccionado(artiffact)
    }


    useEffect(() => {
        async function fetchData() {
            if (id) {
                const { data } = await axios.get(
                    `api/v1/artiffacts/${recordid}/${id._id}`
                );
                setArtiffacts(data.results);
            }
        }
        fetchData();
        

    }, [type, recordid,id, recargar]);

    return (
        <>
            <Reactstrap.Modal style={{ marginTop: '195px' }} className="modal-lg" isOpen={isOpenA} toggle={toggleA}>
                <div className="modal-body p-0">
                    <Reactstrap.Card className="bg-secondary shadow border-0">
                        <Reactstrap.CardHeader className="bg-transparent pb-1">
                            <Reactstrap.ModalHeader className="col-12 p-0" onClick={toggleA} toggle={toggleA}>
                                <div className="d-flex flex-wrap">
                                    <h4>Artefacto</h4>
                                </div>
                            </Reactstrap.ModalHeader>
                        </Reactstrap.CardHeader>
                        <Reactstrap.Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">N°</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Trimestre 232</th>
                                    <th scope="col">Acciones</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {artiffacts?.artiffacts?.map((data, index) => {
                                    const quarter = data?.artiffact && data?.artiffact.length > 0 ? data?.artiffact[0].quarter[0] : data.quarter[0];
                                    // const isWithinValid = isWithinValidQuarter(quarter);

                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th scope="row">
                                                <Reactstrap.Media className="align-items-center">
                                                    <span className="mb-0 text-sm">{data?.artiffact && data.artiffact.length > 0 ? data.artiffact[0].name : data.name}</span>
                                                </Reactstrap.Media>
                                            </th>
                                            <td className="mb-0 text-sm">{data?.artiffact && data.artiffact.length > 0 ? data.artiffact[0].description : data.description}</td>

                                            <td>
                                                <ul>
                                                    {quarter.number}
                                                </ul>
                                            </td>

                                            {/* boton ver detalle */}
                                            <td className="p-0 mr-0">
                                                <Reactstrap.Button
                                                    color="primary"
                                                    type="button"
                                                    className="btn-neutral btn-sm"
                                                    onClick={() => detailArtiffact(data)}
                                                >
                                                    <i className="fa-solid fa-eye"></i>
                                                </Reactstrap.Button>
                                            </td>

                                            {data.contentType ? (
                                                // Boton descargar
                                                <td>
                                                    <Reactstrap.Button
                                                        color="primary"
                                                        type="button"
                                                        className="btn-neutral btn-sm"
                                                        onClick={() => downloads(data._id, data.name)}
                                                    >
                                                        <i className="fa-solid fa-file-arrow-down"></i>
                                                    </Reactstrap.Button>
                                                </td>
                                            ) : (
                                                //Boton subir
                                                <td>
                                                    {isUploadAllowed ? ( // Verificar si es posible realizar la subida de archivos
                                                        <>
                                                            <input type="file" onChange={handleFileChange} />
                                                            <Reactstrap.Button
                                                                color="primary"
                                                                onClick={() => handleUpload(id._id, data._id)}
                                                            >
                                                                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                                            </Reactstrap.Button>
                                                        </>
                                                    ) : (
                                                        <Reactstrap.Button
                                                            color="primary"
                                                            type="button"
                                                            className="btn-neutral btn-sm"
                                                            disabled
                                                        >
                                                            <i className="fa-solid fa-arrowup-from-bracket"></i>
                                                        </Reactstrap.Button>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>

                            <DetailArtiffacts
                                artiffact={registroSeleccionado}
                                toggleShow={() => setRegistroSeleccionado(null)}
                            />

                        </Reactstrap.Table>
                    </Reactstrap.Card>
                </div>
            </Reactstrap.Modal>
        </>
    );
}

