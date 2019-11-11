import React from "react";
import styled from "styled-components";

import SitooIcon from "../assets/SitooIcon.png";
import { Link } from "react-router-dom";

const SitooNavBar = styled.div`
  height: 2rem;
  padding: 0.3rem 0;
  margin: 0 0.8rem;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 769px) {
    border-bottom: 1px solid lightgray;
    flex-direction: row;
  }
  @media (max-width: 769px) {
    height: 4rem;
  }
`;

const NavBarSitoo = styled.img`
  align-self: flex-start
  height: 2rem;
  width: auto;
`;

const NavBarUl = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  margin: 0;
  justify-content: space-evenly;
  @media (max-width: 769px) {
    border-bottom: 1px solid lightgray;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 1.5rem;
  align-self: center;
  padding-left: 0.5rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.5rem;
  margin-bottom: 0.2rem;
  vertical-align: middle;
`;

export default function TopNavBar() {
  return (
    <>
      <SitooNavBar>
        <NavBarSitoo src={SitooIcon} />
        <NavBarUl>
          <StyledLink to="/users"> users </StyledLink>
          <StyledLink to="/manufacturers"> manufacturers </StyledLink>
          <StyledLink to="/products"> products </StyledLink>
        </NavBarUl>
      </SitooNavBar>
    </>
  );
}
