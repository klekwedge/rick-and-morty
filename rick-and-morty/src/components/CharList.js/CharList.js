import { useState, useEffect } from "react";
import RickAndMortyService from "../../services/RickAndMortyService";
import { Flex, List, ListItem, Image, Heading, Button } from "@chakra-ui/react";



const CharList = ({onCharSelected}) => {
  const [charList, setCharList] = useState([]);
  const [page, setPage] = useState(1);

  const rickAndMortyService = new RickAndMortyService();
  rickAndMortyService.getAllCharacters();

  console.log("render");

  useEffect(() => {
    onRequest(page);
    setPage(() => page + 1);
  }, []);

  const onRequest = (page) => {
    rickAndMortyService.getAllCharacters(page).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    // let ended = false;

    // if (newCharList.length < 9) {
    //   ended = true;
    // }
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
        // disabled={newItemLoading}
        // style={{ display: charEnded ? "none" : "block" }}
        onClick={() => {
          setPage(() => page + 1);
          onRequest(page);
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
