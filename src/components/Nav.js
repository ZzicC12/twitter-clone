import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  faHome,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  color: #34495e;
`;

const Li = styled.li`
  padding: 8px;
  cursor: pointer;
  transition: 300ms all ease-in-out;
  &:hover {
    color: #3498db;
  }
`;
const Column = styled.div`
  display: flex;
`;

const Nav = ({ authService }) => {
  const history = useHistory();
  const handleClick = async () =>
    await authService.logout().then(() => history.push("/"));

  return (
    <nav>
      <Ul>
        <Column>
          <Li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </Link>
          </Li>
          <Li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} size="2x" />
            </Link>
          </Li>
        </Column>
        <Li onClick={handleClick}>
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
        </Li>
      </Ul>
    </nav>
  );
};

export default Nav;
