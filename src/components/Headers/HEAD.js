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

// reactstrap components
import * as Reactstrap from "reactstrap";
import { useNavigate } from 'react-router-dom';
import "./style.css"

const Header = ({title, description, title1}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-7 display-2">
      <div className="d-flex align-items-center">

         {/* botón volver */}
      <Reactstrap.Button 
         onClick={() => navigate(-1)} 
         className="btn-circle btn-neutral ml-5 mt--7 ">
      <i className="fa-solid fa-left-long " 
         color="primary"  ></i>
     </Reactstrap.Button>

      <h1 className="titleR mr-3 ">{title}</h1>
        <p className="mr-15 mt-3 text-white sm-2">{description}</p>
      </div>

      <h4 className="titleR text-white">{title1}</h4>

        <Reactstrap.Container fluid>      
            <Reactstrap.Row>
            <Reactstrap.Col lg="6" xl="3">
            </Reactstrap.Col>
           </Reactstrap.Row>
        </Reactstrap.Container>
      </div>
    </>
  );
};

export default Header;
