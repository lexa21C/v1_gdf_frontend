import React from 'react';
import * as Reactstrap from "reactstrap";
function PaginationData({
  PerPage,
  currentPage,
  setCurrentPage,
  total
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / PerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSpecificPage = (page) => {
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    if (pageNumbers.length <= 4) {
      return pageNumbers.map((noPage) => (
        <>
          <Reactstrap.PaginationItem key={noPage}>
            <Reactstrap.PaginationItem className={`${noPage === currentPage ? 'active' : ''
                }`} onClick={(e) => { e.preventDefault(); onSpecificPage(noPage) }}>
              <Reactstrap.PaginationLink
                href="#pablo"
               
              >
                {noPage}
              </Reactstrap.PaginationLink>
            </Reactstrap.PaginationItem>
          </Reactstrap.PaginationItem>
        </>

      ));
    } else {
      let left = Math.max(1, currentPage - 2);
      let right = Math.min(currentPage + 2, pageNumbers.length);
      let buttons = [];
      for (let i = left; i <= right; i++) {
        buttons.push(
          <>
            <Reactstrap.PaginationItem className={` ${i === currentPage ? 'active' : ''
              }`}>
              <Reactstrap.PaginationLink
                href="#pablo"
                onClick={(e) => { e.preventDefault(); onSpecificPage(i) }}
              >
                {i}
              </Reactstrap.PaginationLink>
            </Reactstrap.PaginationItem>
            {/* <li key={i}>
              <a
                className={`pagination-link ${i === currentPage ? 'is-current' : ''
                  }`}
                onClick={() => onSpecificPage(i)}
              >
                {i}
              </a>
            </li> */}
          </>

        );
      }
      if (left > 1) {
        buttons.unshift(
          <li key="start-ellipsis">
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        );
      }
      if (right < pageNumbers.length) {
        buttons.push(
          <li key="end-ellipsis">
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        );
      }

      return buttons;
    }
  };

  return (
    <>
      {/* <nav className="pagination is-centered m-1" role="navigation" aria-label="pagination">
        <a
          className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`}
          onClick={onPreviousPage}
        >
          Previous
        </a>

        <a
          className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disabled' : ''
            }`}
          onClick={onNextPage}
        >
          Next page
        </a>
        <ul className="pagination-list">{getPaginationButtons()}</ul>
      </nav> */}
      <nav aria-label="...">
        <Reactstrap.Pagination
          className="pagination justify-content-end mb-0"
          listClassName="justify-content-end mb-0"
        >
          <Reactstrap.PaginationItem className="">
            <Reactstrap.PaginationLink
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                onPreviousPage()
              }}
              className={`${currentPage === 1 ? 'disabled' : ''}`}
            >
              <i className="fas fa-angle-left" />
              <span className="sr-only">Previous</span>
            </Reactstrap.PaginationLink>
          </Reactstrap.PaginationItem>
          <Reactstrap.PaginationItem>
            <ul className="pagination-list">{getPaginationButtons()}</ul>
          </Reactstrap.PaginationItem>

          <Reactstrap.PaginationItem>
            <Reactstrap.PaginationLink
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                onNextPage()
              }}
              className={`${currentPage >= pageNumbers.length ? 'disabled' : ''
                }`}
            >
              <i className="fas fa-angle-right" />
              <span className="sr-only">Next</span>
            </Reactstrap.PaginationLink>
          </Reactstrap.PaginationItem>
        </Reactstrap.Pagination>
      </nav>
    </>

  );
}

export default PaginationData;
