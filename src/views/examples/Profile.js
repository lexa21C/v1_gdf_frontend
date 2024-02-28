import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertModal from '../../components/Alert/AlertModal.js'
import { UserContext } from "context/userContext.js";
import { useContext } from 'react';


const Profile = () => {

  const [data, setData] = useState({
    // Definir un valor inicial para los campos de data
    complete_names: "",
    email: "",
  });
  
  const [updateProfile, setUpdateProfile] = useState(false);
  const user = localStorage.getItem('User');
  const userJson = JSON.parse(user);
  const {setUserJson} = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

    // Obtener el valor del type_profile desde userJson
  const userTypeProfile = userJson?.type_profile[0]?.type_profile || '';
  
   // Obtener el valor del training_center desde userJson
  const userCenter = userJson?.training_center[0]?.training_center || '';
   const fetchData = async () => {
    try {
      const response = await axios.get(`api/v1/user/show/${userJson._id}`);
        setData(response.data.results);
        localStorage.removeItem('User');
        localStorage.setItem('User', JSON.stringify(response.data.results));
        const updatedUserJson = JSON.parse(localStorage.getItem('User'));
        setUserJson(updatedUserJson);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
   }
  useEffect(() => {
  
   fetchData()
  }, [updateProfile]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleEditProfile = async () => {
    try {
      const response = await  axios.put(`api/v1/user/${userJson._id}`, data);

      if ( response.data.status !== "success" ){
        setShowAlert(true);
      setAlertType(response.data.status);
      setAlertMessage(response.data.message);

      }
      setUpdateProfile(!updateProfile);
    } catch (error) {
      console.error('Error al editar el perfil:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <UserHeader use={updateProfile} data={data} onEditProfile={handleEditProfile} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/logo-de-SENA-png-Negro-300x300.png")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">

                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">

                <div className="text-center mt-md-6">
                  <h3>
                    {userJson?.complete_names}
                  </h3>
            
                  <div className="mt-3 mb-3">
                 <i className="ni ni-single-02"/> <strong>{userTypeProfile}</strong>
                 </div>
                  <div className="mr-3">
                    <i className="ni education_hat " />
                    {userCenter}
                  </div>
                </div>

              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col >
                    <h3 className="mb-0">Mi perfil</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informacion del usuario
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nombre completo
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="complete_names"
                            value={data.complete_names}
                            placeholder="Username"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Correo electronico
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={data.email}
                            name="email"
                            placeholder="jesse@example.com"
                            onChange={handleChange}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
      {showAlert && (
            <AlertModal type={alertType} message={alertMessage} onClose={handleCloseAlert} />
          )}
    </>
  );
};

export default Profile;
