import axios from "axios";
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = ({ use, data, onEditProfile }) => {
  const user=localStorage.getItem('User')
  const userJson=JSON.parse(user)

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "650px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/Sena-Colombia.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hola {userJson.complete_names}</h1>
              <p className="text-white mt-0 mb-5">
              Esta es tu página de perfil. Puedes ver el progreso que has hecho con tu trabajo y gestionar tus proyectos
              </p>
              <Button
                color="info"
                href="#pablo"
                onClick={onEditProfile}
              >
                Editar perfil
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
