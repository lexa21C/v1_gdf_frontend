import React, { useEffect, useState } from 'react';
import * as Reactstrap from 'reactstrap';
import axios from 'axios';
import Header from '../../components/Headers/HEAD';
import AlertModal from '../../components/Alert/AlertModal.js'
import Search from "../../components/Search/search";
import PaginationData from "../../components/Pagination/pagination.js";
import ALertModalCuestion from '../../components/Alert/ALertModalCuestion.js'


export default function ShowCategory() {
  const url = 'api/v1/categories';

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [category, setCategory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  //alertas
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  //alerta eliminar
  const [showAlertCuestion, setAlertCuenstion] = useState(false);

    //Buscador
  const [searchTerm, setSearchTerm] = useState("");

  // eliminar
  const [apiDeleteRecord, setapiDeleteRecord] = useState('');

  //paginación 
  const totalCompetences = category?.length;
  const [PerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;

  const getCategory = async () => {
      const response = await axios.get(url);
      if (response.status === 200) {
        setCategory(response.data.results);  
  };}

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  //alertas 
  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertCuenstion(false)
  };

  //bucador
  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const openModal = (op, id, name) => {
    setId(id);
    setName(name);
    setOperation(op);

    if (op === 1) {
      setTitle('Registrar Categoría');
    } else if (op === 2) {
      setTitle('Editar Categoría');
    }

    setModalOpen(true);
  };

  const handleSave = async () => {
    if (operation === 1) {
      // Crear nueva categoría
        axios.post('api/v1/category', { name }).then(
          (res) => {
            if (res.data.status ==='success') {
              // Categoría creada exitosamente
              getCategory(); // Actualizar la lista de categorías
            }
            setAlertType(res.data.status);
            setAlertMessage(res.data.message);
            setShowAlert(true);
            
          }).catch((err) => {
            setAlertType(err.status);
            setAlertMessage(err.message);
            setShowAlert(true);
          })
      
         
        toggleModal(); // Cerrar la modal
      
    } else if (operation === 2) {
      // Editar categoría existente
        axios.put(`api/v1/category/${id}`, { name }).then(
          (res) =>{
            setAlertType(res.data.status);
            setAlertMessage(res.data.message);
            setShowAlert(true);

              // Categoría editada exitosamente
              getCategory(); // Actualizar la lista de categorías
            }).catch((err) => {
              setAlertType(err.status);
              setAlertMessage(err.message);
              setShowAlert(true);
            })
          toggleModal(); // Cerrar la modal
    }
  };

  // const handleDelete = async (categoryId) => {
  //     const response = await axios.delete(`api/v1/category/${categoryId}`);
  //     if (response.status === 200) {
  //       // Categoría eliminada exitosamente
  //       getCategory(); // Actualizar la lista de categorías
  //       setAlertCuenstion(true)
  //   }
  // };

  const destroy = (id) => {
    setapiDeleteRecord(`api/v1/category/${id}`)
    setAlertCuenstion(true)
  }

  useEffect(() => {
    getCategory();
  }, [setModalOpen, showAlertCuestion]);

    //filtro buscador
    const filteredCategory = category?.filter(categor =>
      (categor.name && categor.name.toString().toLowerCase().includes(searchTerm.toLowerCase())) 
    );
  return (
    <>
      <Header title1="Gestionar Categorías" />
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
                <Reactstrap.Button
                  color="primary"
                  className="btn-circle btn-neutral"
                  onClick={() => openModal(1, '', '')}
                  type="button"
                >
                  <i className="ni ni-fat-add"></i> 
                </Reactstrap.Button>

                   {/* Utilizar el componente SearchBar */}
                   <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Categoria"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categorías</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategory
                  ?.slice(firstIndex, lastIndex)
                  .map((category, index) => (
                    <tr key={index}>
                      <th>{1 + index}</th>
                      <th scope="row">
                        <Reactstrap.Media className="align-items-center">
                          <span className="mb-0 text-sm">
                            {category.name}
                          </span>
                        </Reactstrap.Media>
                      </th>
                      <td>
                        <Reactstrap.Button
                          color="primary"
                          type="button"
                          className="btn-neutral btn-sm"
                          id={`Catego${category._id}`}
                          onClick={() =>
                            openModal(2, category._id, category.name)
                          }
                        >
                          <i className="fa-solid fa-edit"></i>
                        </Reactstrap.Button>
                        <Reactstrap.UncontrolledTooltip
                          delay={0}
                          target={`Catego${category._id}`}
                        >
                          Editar
                        </Reactstrap.UncontrolledTooltip>
                        <Reactstrap.Button
                          color="primary"
                          type="button"
                          className="btn-neutral btn-sm"
                          onClick={() => destroy(category._id)}
                          id={`icon2${category.borrar}`}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Reactstrap.Button>
                        <Reactstrap.UncontrolledTooltip
                          delay={0}
                          target={`icon2${category.borrar}`}
                        >
                          Eliminar
                        </Reactstrap.UncontrolledTooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Reactstrap.Table>

              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={PerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalCompetences}
                  />
                </nav>
              </Reactstrap.CardFooter>
              
              {/*Modal Crear categoria */}
                <Reactstrap.Modal className="modal-lg modal-dialog-centered" 
                isOpen={modalOpen} toggle={toggleModal} style={{width:'50%'}}>
                    
                  <Reactstrap.ModalHeader toggle={toggleModal}>
                    <label className="h5">{title}</label>
                  </Reactstrap.ModalHeader>
                  <Reactstrap.ModalBody>
                    <Reactstrap.InputGroup className="mb-3">
                      <Reactstrap.InputGroupAddon addonType="prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-gift"></i>
                        </span>
                      </Reactstrap.InputGroupAddon>
                      <Reactstrap.Input
                        type="text"
                        id="nombre"
                        className="form-control"
                        placeholder="Categoría"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Reactstrap.InputGroup>
                  </Reactstrap.ModalBody>
                  
              <div className="text-center">
                    <Reactstrap.Button 
                    color="primary" 
                    className="btn-primary mb-4"
                    type="submit"
                    onClick={handleSave}
                    >
                      Guardar
                    </Reactstrap.Button>
                </div>
                </Reactstrap.Modal>
              
            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>
      {showAlert && (
        <AlertModal type={alertType} message={alertMessage} onClose={handleCloseAlert} />
      )}
      {showAlertCuestion && (
        <ALertModalCuestion api={apiDeleteRecord} onClose={handleCloseAlert} />
      )}
    </>
  );
}
