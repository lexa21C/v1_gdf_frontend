/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route,Routes,useNavigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "../routes";
import AdminNavbar from "components/Navbars/AdminNavbar";
const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [typeProfile, setTypeProfile] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
    const storedTypeProfile = localStorage.getItem('User');
    const json = JSON.parse(storedTypeProfile)

    setTypeProfile(json.type_profile[0].type_profile);
  }, [location]);       

  const getRoutes = (routes) => {

    return routes.map((route, index) => {
      const allowedRoutes = routes.filter((route) => {
        return (
          route?.permission?.p1 === typeProfile ||
          route?.permission?.p2 === typeProfile ||
          route?.permission?.p3 === typeProfile ||
          route?.Auth === false
        );
      });
      if (allowedRoutes.length === 0) {
        // Si no hay rutas permitidas, redirigir a una página de acceso denegado o un mensaje de error
        return  navigate(-1)   
      }
      
      return allowedRoutes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.element} />;
      });
      });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          // brandText={getBrandText(props.location.pathname)}
        />
        {/*<Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container> */}

        {/* <Routes>
          {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))} 
        </Routes> */}
        <Routes>
          {getRoutes(routes)}
          {/* <Route path="*" element={<Navigate to="/admin/index" />} />  */}
        </Routes>

        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
