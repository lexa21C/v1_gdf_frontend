import { useState, useEffect } from "react";
import axios from "axios";
import * as Reactstrap from "reactstrap";
import { NavLink as NavLinkRRD } from "react-router-dom";
import Header from "components/Headers/HEAD.js";
import PaginationData from "../../components/Pagination/pagination.js";
import routes from "../../routes.js";
import Search from "../../components/Search/search"
import Loading from "../../components/loader/loader.js"


const Butonn = (routeName, data, name) => {
  const matchingRoute = routes.find(route => route.name === routeName);

  if (!matchingRoute) {
    return null;
  }

  const { path, layout, icon, name: routeDisplayName } = matchingRoute;
  
  const getModifiedPath = (path, data, name) => {
    let modifiedPath = path;
    
    if (data !== null) {
      const dataStartIndex = path.indexOf('=/:');
      const dataEndIndex = path.indexOf('/&');
      modifiedPath = `${path.slice(0, dataStartIndex)}=/${data}${path.slice(dataEndIndex)}`;
    }
    
    if (name !== null) {
      const nameStartIndex = modifiedPath.indexOf('&/:');
      modifiedPath = `${modifiedPath.slice(0, nameStartIndex)}&/${name}`;
    }
    
    return modifiedPath;
  };
  
  const modifiedPath = getModifiedPath(path, data, name);

  return (
    <>
      <Reactstrap.Button
        color="primary"
        type="button"
        className="btn-neutral btn-sm"
        onClick={(e) => {
          e.preventDefault();
        }}
        id={`tooltip${data + path.length}`}
      >
        <Reactstrap.NavLink
          to={`${layout}${modifiedPath}`}
          tag={NavLinkRRD}
          activeClassName="active"
          className="p-0"
        >
          <i className={icon} />
        </Reactstrap.NavLink>
      </Reactstrap.Button>
      <Reactstrap.UncontrolledTooltip
        delay={0}
        target={`tooltip${data + path.length}`}
      >
        {routeDisplayName}
      </Reactstrap.UncontrolledTooltip>
    </>
  );
};

export default function List() {
  const [competences, setCompetences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //bucador
  const [searchTerm, setSearchTerm] = useState("");

  // pagination data
  const totalCompetences = competences.length;
  const [PerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
 
  const lastIndex = PerPage  * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - PerPage; // = 6 - 6 = 0

 
  const getData = () => {
    try {
      axios.get("api/v1/competences")
        .then((res) => {
          setCompetences(res.data.results);
          setTimeout(()=>{
            setIsLoading(false)
          },500)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getData()
  }, [searchTerm]);

 
  return (
    <>    

     {isLoading && <Loading  />}
    
    
      <Header title1="Gestionar Competencias" />
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
                  {/* Utilizar el componente SearchBar */}
                  <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Competencia"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Competencias</th>
                    <th scope="col">Version</th>
                    <th scope="col">acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody >
                  {competences
            .filter((competence) =>
              Object.values(competence)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .slice(firstIndex, lastIndex)
                  .map((data, index ) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{data.labor_competence_code}</td>
                        
                        <th scope="row">
                          <Reactstrap.Media className="align-items-center">
                            <div className="ml-10 text-sm " id={`t2${data._id}`}>
                              <Reactstrap.UncontrolledTooltip target={`t2${data._id}`}>
                                {data.labor_competition}
                              </Reactstrap.UncontrolledTooltip>
                              {data.labor_competition.length > 95 ?
                                data.labor_competition.slice(0, 95) + '...' : data.labor_competition}
                            </div>


                          </Reactstrap.Media>
                        </th>
                        <td>{data.labor_competition_version}</td>

                        <td>
                          <Reactstrap.UncontrolledDropdown>
                            {Butonn('Resultados de aprendizaje', data._id, data.labor_competition)}
                          </Reactstrap.UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })
                  }

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
            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>
    </>
  );
}
