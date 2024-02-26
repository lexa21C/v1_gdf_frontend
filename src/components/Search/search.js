

import React from "react";
import * as Reactstrap from "reactstrap";

const SearchBar = ({ searchTerm, handleInputChange, placeholder }) => {
  return (
    <Reactstrap.Form className="navbar-search navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto">
      <Reactstrap.FormGroup className="mb-0">
        <Reactstrap.InputGroup className="input-group-alternative">
          <Reactstrap.InputGroupAddon addonType="prepend">
            <Reactstrap.InputGroupText>
              <i className="fas fa-search" />
            </Reactstrap.InputGroupText>
          </Reactstrap.InputGroupAddon>
          <Reactstrap.Input
            placeholder={placeholder} // Usar el placeholder recibido como prop
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Reactstrap.InputGroup>
      </Reactstrap.FormGroup>
    </Reactstrap.Form>
  );
};

export default SearchBar;
