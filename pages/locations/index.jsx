import React, { useState, useEffect } from "react";
import { Flex, List, ListItem, Heading, Button } from "@chakra-ui/react";
import RickAndMortyService from "../../services/RickAndMortyService";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Link from "next/link";

function LocationPage() {
  const [charList, setCharList] = useState([]);
  const [currentLocationPage, setCurrentLocationPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onLocationListLoaded = (newCharList) => {
    setLoading(false);
    setCharList((charItems) => [...charItems, ...newCharList]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };
  const onRequest = (page) => {
    rickAndMortyService
      .getAllLocations(page)
      .then(onLocationListLoaded)
      .catch(onError);
  };

  useEffect(() => {
    onRequest(currentLocationPage);
    setCurrentLocationPage(() => currentLocationPage + 1);
  }, []);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? (
    <List display="flex" gap="20px" flexWrap="wrap">
      {charList.map((item) => (
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
          <Heading as="h2" fontSize="18px" textAlign="center" mb="5px">
            {item.dimension}
          </Heading>

          <Heading
            as="h3"
            fontWeight="400"
            fontSize="18px"
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{ color: "#FF9800" }}
          >
            <Link href={`/locations/${item.id}`}>
            Homepage
            </Lin>
          </Heading>
        </ListItem>
      ))}
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
}

export default LocationPage;
