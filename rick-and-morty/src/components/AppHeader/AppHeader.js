import { Link, NavLink } from "react-router-dom";
import { Flex, List, Heading } from "@chakra-ui/react";

const AppHeader = () => {
  return (
    <Flex
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="10px"
    >
      <Heading as="h1" fontSize="30px">
        <Link to="/"> Rick and Morty portal</Link>
      </Heading>
      <Flex as="nav">
        <List display="flex" gap="10px">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
              })}
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/locations"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
              })}
            >
              Locations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/episodes"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
              })}
            >
              Episodes
            </NavLink>
          </li>
        </List>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
