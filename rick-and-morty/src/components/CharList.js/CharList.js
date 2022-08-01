import { useState, useEffect } from "react";
import { Flex, List, ListItem, Image, Heading, Button } from "@chakra-ui/react";
import RickAndMortyService from "../../services/RickAndMortyService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([]);
  const [currentCharPage, setCurrentCharPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  useEffect(() => {
    onRequest(currentCharPage);
    setCurrentCharPage(() => currentCharPage + 1);
  }, []);

  const onRequest = (currentCharPage) => {
    rickAndMortyService
      .getAllCharacters(currentCharPage)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoaded = (newCharList) => {
    setLoading(false);
    setCharList((charList) => [...charList, ...newCharList]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error)
    ? charList.map((item, i) => {
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
            pb="15px"
            cursor="pointer"
            borderRadius="5px"
            onClick={() => onCharSelected(item.id)}
          >
            <Image alt={item.name + " image"} src={item.image} />
            <Heading as="h2" fontSize="20px" textAlign="center">
              {item.name}
            </Heading>
          </ListItem>
        );
      })
    : null;

  return (
    <Flex alignItems="center" flexDirection="column" gap="20px" pb="50px">
      <List display="flex" gap="20px" flexWrap="wrap">
        {spinner}
        {errorMessage}
        {content}
      </List>
      <Button
        display={currentCharPage <= 42 ? "block" : "none"}
        onClick={() => {
          setCurrentCharPage(() => currentCharPage + 1);
          onRequest(currentCharPage);
        }}
        background="#3C3E44"
        color="white"
        maxWidth="200px"
        _hover={{ background: "#FF9800" }}
      >
        Load more
      </Button>
    </Flex>
  );
};

export default CharList;
