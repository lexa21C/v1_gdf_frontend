/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
// import EditUser from "./EditUser";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    // Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
// core components
import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
// import PaginationData from "../../../components/PaginationData"
import Header from "../../../../components/Headers/Header.js";
import swal2 from 'sweetalert2';
import CreateModal from "./components/CreateModal.js";
import UpdateModal from "./components/UpdateModal.js";


const ListProgram = () => {

    // const [isOpenEditModal, OpenEditModal, closeEditModal] = useModal();

    const [APIData, setAPIData] = useState([]);

    const totalUsers = APIData.length;

    // const [user, setUser] = useState([]);

    const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
    const firstIndex = lastIndex - userPerPage;  // = 6 - 6 = 0


    const [userPerPage, setUserPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const getData = () => {
        axios.get(`http://localhost:3005/typeProgram`)
            .then((res) => {
                        setAPIData(res.data.data);
                       
                    })
    }

    useEffect (() => {
        getData()
    }, [getData]);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3005/typeProgram/${id}`)
            .then(res => {
                getData();
            }
        )
    }

    const handleDelete = async (id) => {
        swal2.fire({
            title: "¿Está seguro?",
            text: "¿Quieres eliminar a este usuario?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '¡Sí, borrarlo!'
        }).then((result) => {
            if (result.value) {
                deleteUser(id);
                swal2.fire(
                    '¡Eliminado!',
                    'El usuario ha sido eliminado.',
                    'éxito'
                )
            }
        })
    }

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Card tables <CreateModal/></h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Project</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                {APIData.map((data) => {
                                        return (
                                        <tr key={data.id}>
                                            <th scope="row">
                                                <Media className="align-items-center">
                                                    <a
                                                        className="avatar rounded-circle mr-3"
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <img
                                                            alt="..."
                                                            src={require("../../../../assets/img/theme/User_default3.png")}
                                                        />
                                                    </a>
                                                    <Media>
                                                        <span className="mb-0 text-sm">
                                                            User
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                            <td>{data.type_program}</td>
                                            <td>
                                                <UpdateModal id={data._id} type_program={data.type_program}/>
                                                {/* <DeleteModalComponent id={data._id}/> */}
                                                <Button
                                                    variant="danger" 
                                                    onClick={() => handleDelete(data._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>

                                            {/* <td>
                                                <div className="d-flex align-items-center">
                                                    <span className="mr-2">60%</span>
                                                    <div>
                                                        <Progress
                                                            max="100"
                                                            value="60"
                                                            barClassName="bg-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </td> */}
                                        </tr>
                                        )
                                    }
                                ).slice( 
                                    (currentPage - 1) * 5,
                                    (currentPage - 1) * 5 + 5
                                )}
                                </tbody>
                            </Table>
                                {/* <PaginationData 
                                    userPerPage={userPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalUsers={totalUsers}
                                /> */}
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default ListProgram;