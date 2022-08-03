import { useState, useEffect } from "react";
import RickAndMortyService from "../../services/RickAndMortyService";
import { Link } from "react-router-dom";
import { Flex, List, ListItem, Heading, Button } from "@chakra-ui/react";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const LocationPage = () => {
  const [charList, setCharList] = useState([]);
  const [currentLocationPage, setCurrentLocationPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  useEffect(() => {
    onRequest(currentLocationPage);
    setCurrentLocationPage(() => currentLocationPage + 1);
  }, []);

  const onRequest = (page) => {
    rickAndMortyService
      .getAllLocations(page)
      .then(onLocationListLoaded)
      .catch(onError);
  };

  const onLocationListLoaded = (newCharList) => {
    setLoading(false);
    setCharList((charList) => [...charList, ...newCharList]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? (
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
            borderRadius="5px"
          >
            <Heading as="h2" fontSize="20px" textAlign="center">
              {item.name}
            </Heading>
            <Heading as="h2" fontSize="18px" textAlign="center">
              {item.type}
            </Heading>
            <Heading as="h2" fontSize="18px" textAlign="center" mb="10px">
              {item.dimension}
            </Heading>

            <Heading
              as="h3"
              fontWeight="400"
              fontSize="18px"
              textAlign="center"
              transition='all 0.3s ease'
              _hover={{ color: "#FF9800" }}
            >
              <Link to={`/locations/${item.id}`}>
                Visit "{item.name}" page?
              </Link>
            </Heading>
          </ListItem>
        );
      })}
    </List>
  ) : null;

  return (
    <Flex alignItems="center" flexDirection="column" gap="20px" pb="50px">
      {spinner}
      {errorMessage}
      {content}
      <Button
        onClick={() => {
          setCurrentLocationPage(() => currentLocationPage + 1);
          onRequest(currentLocationPage);
        }}
        background="#3C3E44"
        color="white"
        maxWidth="200px"
        _hover={{ background: "#FF9800" }}
        display={currentLocationPage <= 7 ? "block" : "none"}
      >
        Load more
      </Button>
    </Flex>
  );
};

export default LocationPage;
