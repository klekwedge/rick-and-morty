import { useState, useEffect } from "react";
import RickAndMortyService from "../../services/RickAndMortyService";
import { Flex, List, ListItem, Image, Heading, Button } from "@chakra-ui/react";


const CharList = ({onCharSelected}) => {
  const [charList, setCharList] = useState([]);
  const [currentCharPage, setCurrentCharPage] = useState(1);

  const rickAndMortyService = new RickAndMortyService();

  useEffect(() => {
    onRequest(currentCharPage);
    setCurrentCharPage(() => currentCharPage + 1);
  }, []);

  const onRequest = (currentCharPage) => {
    rickAndMortyService.getAllCharacters(currentCharPage).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
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
              pb="15px"
              cursor='pointer'
              borderRadius='5px'
              onClick={() => onCharSelected(item.id)}
            >
              <Image alt={item.name + " image"} src={item.image} />
              <Heading as="h2" fontSize="20px" textAlign='center'>
                {item.name}
              </Heading>
            </ListItem>
          );
        })}
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
