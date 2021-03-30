import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  margin-bottom: 1rem;
`;

const Li = styled.li`
  border: 1px solid black;
  padding: 8px;
  cursor: pointer;
`;

const Nav = ({ authService }) => {
  const handleClick = () => authService.logout();

  return (
    <nav>
      <Ul>
        <Li>
          <Link to="/">Home</Link>
        </Li>
        <Li>
          <Link to="/profile">My Profile</Link>
        </Li>
        <Li>
          <span onClick={handleClick}>Log out</span>
        </Li>
      </Ul>
    </nav>
  );
};

export default Nav;
