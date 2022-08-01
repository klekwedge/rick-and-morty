import { useState, useEffect } from "react";
import RickAndMortyService from "../../services/RickAndMortyService";
import { Flex, List, ListItem, Image, Heading, Button } from "@chakra-ui/react";

const LocationPage = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([]);
  const [currentLocationPage, setCurrentLocationPage] = useState(1);

  const rickAndMortyService = new RickAndMortyService();

  useEffect(() => {
    onRequest(currentLocationPage);
    setCurrentLocationPage(() => currentLocationPage + 1);
  }, []);

  const onRequest = (page) => {
    rickAndMortyService.getAllLocations(page).then(onLocationListLoaded);
  };

  const onLocationListLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
  };

  return (
    <Flex alignItems="center" flexDirection="column" gap="20px" pb="50px">
      <List display="flex" gap="20px" flexWrap="wrap">
        {charList.map((item, i) => {
          return (
            <ListItem
              key={item.id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="8px"
              background="#3C3E44"
              color="white"
              flex="1 1 20%"
              p="15px"
              cursor="pointer"
              borderRadius="5px"
              onClick={() => onCharSelected(item.id)}
            >
              <Heading as="h2" fontSize="20px" textAlign="center">
                {item.name}
              </Heading>
              <Heading as="h2" fontSize="18px" textAlign="center">
                {item.type}
              </Heading>
              <Heading as="h2" fontSize="18px" textAlign="center">
                {item.dimension}
              </Heading>
            </ListItem>
          );
        })}
      </List>
      <Button
        onClick={() => {
          setCurrentLocationPage(() => currentLocationPage + 1);
          onRequest(currentLocationPage);
        }}
        background="#3C3E44"
        color="white"
        maxWidth="200px"
        _hover={{ background: "#FF9800" }}
        // disabled={currentLocationPage <= 7 ? false: true}
        display={currentLocationPage <= 7 ? "block" : "none"}
      >
        Load more
      </Button>
    </Flex>
  );
};

export default LocationPage;
