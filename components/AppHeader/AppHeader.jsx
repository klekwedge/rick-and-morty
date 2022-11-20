import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Flex, List, Heading } from '@chakra-ui/react';
import './AppHeader.scss';

function AppHeader() {
  return (
    <Flex as="header" display="flex" alignItems="center" justifyContent="space-between" p="10px">
      <Heading as="h1" fontSize="30px" color="#FF9800">
        <Link to="/" className="effect-1">
          Rick and Morty Info
        </Link>
      </Heading>
      <Flex as="nav">
        <List display="flex" gap="10px" fontSize="18px" className="nav-links">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                fontWeight: isActive ? '700' : '400',
              })}
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink
              className="test"
              to="/locations"
              style={({ isActive }) => ({
                fontWeight: isActive ? '700' : '400',
              })}
            >
              Locations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/episodes"
              style={({ isActive }) => ({
                fontWeight: isActive ? '700' : '400',
                class: isActive ? 'active' : 'effect-3',
              })}
            >
              Episodes
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/favorites"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
                class: isActive ? "active" : "effect-3",
              })}
            >
              Favorites
            </NavLink>
          </li> */}
        </List>
      </Flex>
    </Flex>
  );
}

export default AppHeader;
