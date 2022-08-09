import React, { useState } from "react";
import "../styles/Pagination.css";

const Pagination = ({ totalCards, getNewData }) => {
  const pageNumbers = [];
  const cardsPerPage = 20;
  const [curretPage, setCurrentPage] = useState(1);

  const changePage = (number) => {
    setCurrentPage(number);
    getNewData(number);
  };

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    if (i < curretPage + 3 && i > curretPage - 3) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          className="btn pagination__button"
          onClick={() => changePage(number)}
          key={number}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
