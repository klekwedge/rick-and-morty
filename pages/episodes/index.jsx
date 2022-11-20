import React, { useState, useEffect } from "react";
import { Flex, List, ListItem, Heading, Button } from "@chakra-ui/react";
import RickAndMortyService from "../../services/RickAndMortyService";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Link from "next/link";

function EpisodesPage() {
  const [charList, setCharList] = useState([]);
  const [currentEpisodePage, setCurrentEpisodePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onEpisodeListLoaded = (newCharList) => {
    setLoading(false);
    setCharList((charItems) => [...charItems, ...newCharList]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const onRequest = (page) => {
    rickAndMortyService
      .getAllEpisodes(page)
      .then(onEpisodeListLoaded)
      .catch(onError);
  };

  useEffect(() => {
    onRequest(currentEpisodePage);
    setCurrentEpisodePage(() => currentEpisodePage + 1);
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
            {item.episode}
          </Heading>
          <Heading as="h2" fontSize="18px" textAlign="center">
            {item.name}
          </Heading>
          <Heading
            as="h2"
            fontWeight="400"
            fontSize="18px"
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{ color: "#FF9800" }}
          >
            <Link href={`/episodes/${item.id}`}>Homepage</Link>
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
        background="#3C3E44"
        color="white"
        maxWidth="200px"
        _hover={{ background: "#FF9800" }}
        onClick={() => {
          setCurrentEpisodePage(() => currentEpisodePage + 1);
          onRequest(currentEpisodePage);
        }}
        display={currentEpisodePage <= 3 ? "block" : "none"}
      >
        Load more
      </Button>
    </Flex>
  );
}

export default EpisodesPage;
