import * as Reactstrap from "reactstrap";
import Header from "../../components/Headers/HEAD";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateUser from "./CreateUser.js"
import PaginationData from "../../components/Pagination/pagination.js";
import Search from "../../components/Search/search"
import ALertModalCuestion from '../../components/Alert/ALertModalCuestion.js'
import ModalDetail from "./ModalDetail.js"

export default function List() {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null)

  const [profiles, setProfiles] = useState([]);

  // Bucador
  const [searchTerm, setSearchTerm] = useState("");

    // eliminar
    const [apiDeleteUser,setapiDeleteUser]=useState('');

  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

    //alertas
    const [showAlertCuestion, setAlertCuenstion] = useState(false);

  // pagination data
  const totalUsuarios = users.length;
  const [PerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - PerPage; // = 6 - 6 = 0

  const toggle = () => {
    setModal(!modal);
    setType(false);
  };

  const seeDetail = (user) => {
    setRegistroSeleccionado(user)
  }

  const EditUsers = (editUser) => {
    setSelectedUsers(editUser);
    setModal(true);
    setType(true);
  }
  const destroy = (id) => {
    setapiDeleteUser(`api/v1/user/${id}`)
    setAlertCuenstion(true)
  }

    //alertas
    const handleCloseAlert = () => {
      setAlertCuenstion(false);
      fetchData()
    };
  
  const handleInputChange = event => {
    setSearchTerm(event.target.value)
  }
  const fetchData = async () => {
    try {
      const userResponse = await axios.get("api/v1/user");
      setUsers(userResponse.data.results);
      console.log( 'response', users)
      // const profileResponse = await axios.get("api/v1/profile");
      // setProfiles(profileResponse.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log('inresa al useEffre')
  }, [searchTerm, modal, showAlertCuestion]);
  
  // const filterUser = users?.filter(
  //   (user) =>
  //   user.complete_names?.toLowerCase().includes(searchTerm.toLowerCase())||

  //     user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     (user.type_profile?.some((type_profile) =>
  //       type_profile.type_profile?.toLowerCase().includes(searchTerm.toLowerCase())
  //     ))
  // );
  

  return (
    <>
      <Header title1='Gestionar Usuarios'/>
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
                <Reactstrap.Button color="primary"
                  type="button"
                  className="btn-circle btn-neutral "
                  onClick={toggle}>
                  <i className="ni ni-fat-add" />
                </Reactstrap.Button>
                {/* Utilizar el componente SearchBar */}
                <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Usuario"
                />
              </Reactstrap.CardHeader>

              <Reactstrap.Table
                className="align-items-center table-flush"
                responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Nombres Completos</th>
                    <th scope="col">Tipo de perfil</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                {users?.filter((users) =>
                    Object.values(users)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ).slice(firstIndex, lastIndex)
                    .map((user, Index) => (
                      <tr key={Index}>
                        <th>{1 + Index}</th>
                        <th scope="row">
                          <Reactstrap.Media className="align-items-center">
                            <span className="mb-0 text-sm">
                              {user?.complete_names}
                            </span>
                          </Reactstrap.Media>
                        </th>

                     
                        <td>
                          {user?.type_profile?.map((e) => (
                            <span key={e._id}>{e.type_profile}</span>
                          ))}
                        </td>

                        <td>
                          {/* Boton ver  */}
                        <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => seeDetail(user)}
                            >
                              <i className="fa-solid fa-eye"></i>

                            </Reactstrap.Button>
                       
                          {/* Boton editar */}
                          <Reactstrap.Button
                            color="primary"
                            type="button"
                            className="btn-neutral  btn-sm"
                            onClick={() => EditUsers(user)}
                            id={`userN${user._id}`}
                          >
                            <i className="fa-solid fa-edit"></i>
                          </Reactstrap.Button>

                          <Reactstrap.UncontrolledTooltip
                            delay={0}
                            target={`userN${user._id}`}
                          >
                            Editar
                          </Reactstrap.UncontrolledTooltip>

                          {/* Boton Eliminar */}
                          <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral  btn-sm"
                              onClick={() => destroy(user._id)}
                              id={`icon2${user.borrar}`}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Reactstrap.Button>
                            <Reactstrap.UncontrolledTooltip
                              delay={0}
                              target={`icon2${user.borrar}`}
                            >
                              Eliminar
                            </Reactstrap.UncontrolledTooltip>
                        </td>
                      </tr>
                    ))}
                </tbody>

              {/* Modal crear usuarios */}
                <CreateUser
                  isOpen={modal}
                  toggle={toggle}
                  type={type}
                  user = {selectedUsers}
                  // apiGet={`api/v1/user/show/${selectedUsers?._id}`}
                  apiGet={`api/v1/user/show/${selectedUsers?._id}`}
                  apiGetP={`api/v1/profile `}
                  apiGetCenter={'api/v1/training_center'}
                  onEditComplete={fetchData}
                  
                />

                 {/* modal detalle  */}
              <ModalDetail 
              user={registroSeleccionado}
              toggleShow={() => setRegistroSeleccionado(null)}
              />
              </Reactstrap.Table>

              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={PerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalUsuarios}
                  />
                </nav>
              </Reactstrap.CardFooter>
            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>

      {showAlertCuestion && (
        <ALertModalCuestion  api={apiDeleteUser} onClose={handleCloseAlert} />
      )}

    </>
  )

} 
