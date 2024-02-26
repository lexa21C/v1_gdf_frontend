import { Link, useNavigate } from "react-router-dom";
import React, { useEffect,useState } from "react";
import { UserContext } from "context/userContext";
import { useContext } from 'react';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const { userJsona } = useContext(UserContext);
  const [userJson,setUserJson] = useState({})

  useEffect(() => {
    setUserJson(JSON.parse(localStorage.getItem('User')));
  }, [userJsona]);

  const navigate = useNavigate();
  const closeSession = () => {
    navigate("/auth/login");
    localStorage.clear();
  };

  
  return (
    <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
        <Link
          className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          to="/"
        >
          {props.brandText}
        </Link>
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/logo-de-Sena-sin-fondo-Blanco.png")}
                  />
                </span>
                <span className="mb-0 text-sm font-weight-bold mx-2">
                  {userJson?.complete_names}
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0  text-primary">¡Bienvenido!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02 text-primary" />
                <span>Mi perfil</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={closeSession}>
                <i className="ni ni-user-run text-primary" />
                <span>Cerrar sesión</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
