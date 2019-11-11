import React from "react";
import styled from "styled-components";
import { StyledButton } from "../styles/styles.js";

const PaginationUl = styled.ul`
  margin: 0;
  display: flex;
  max-width: 40%;
  overflow-x: scroll;
`;

const PaginationLi = styled.li`
  display: flex;
  padding-top: 0.4rem;
  padding-right: 1rem;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: center;

  :hover {
    background-color: #c0c2be;
  }
`;

const Pagination = ({ totalPosts, paginate, addMoreUsers, noMoreUsers }) => {
  const pageNumbers = [];
  let maxUsers = false;

  if (noMoreUsers === "X") maxUsers = true;

  for (let i = 1; i <= Math.ceil(totalPosts / 6); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <PaginationUl>
        {pageNumbers.map(number => (
          <PaginationLi key={number} onClick={() => paginate(number)}>
            <div>{number}</div>
          </PaginationLi>
        ))}
      </PaginationUl>
      <StyledButton onClick={maxUsers ? null : addMoreUsers} style={maxUsers ? { visibility: "hidden" } : { visibility: "visible" }}>
        {noMoreUsers}
      </StyledButton>
    </>
  );
};

export default Pagination;
