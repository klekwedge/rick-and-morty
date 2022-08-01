import { Flex, List } from "@chakra-ui/react";

const AppHeader = () => {
  return (
    <Flex as="header" display="flex" justifyContent="space-between" p='10px'>
      <h1>
        <a href="#">Rick and Morty portal</a>
      </h1>
      <Flex as="nav">
        <List display='flex' gap='10px'>
          <li>
            <a href="#">Characters</a>
          </li>
          <li>
            <a href="#">Locations</a>
          </li>
          <li>
            <a href="#">Episodes</a>
          </li>
        </List>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
