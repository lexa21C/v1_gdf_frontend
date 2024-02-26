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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts

// react plugin used to create charts
// import {  Bar,Chart } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
import PieChartGraphics from "../components/Graphics/PieCharts.js";
import BarChartGraphics from "../components/Graphics/BarChart.js";
import AreaChartFillByValue from "../components/Graphics/AreaChartFillByValue.js"

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [setChartExample1Data] = useState("data1");

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center col-12">
                  <div className="col-12">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      GRAFICA
                    </h6>
                    <h2 className="text-white mb-0">Proyectos por Programas de Formación</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody > 
                {/*Chart BarChart */}
                <div className="chart ml-4">
                  <BarChartGraphics />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Grafica
                    </h6>
                    <h2 className="mb-0">Usuario Registrados</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart PieChartGraphics*/}
                <div className="chart ">
                  <PieChartGraphics />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Categorias por Proyectos</h3>
                  </div>
                </Row>
              </CardHeader>

                {/* Chart AreaChartFillByValue*/}
              <div className="chart ">
                  <AreaChartFillByValue />
                </div>
        
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
