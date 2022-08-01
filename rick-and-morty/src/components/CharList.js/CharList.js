import { useState, useEffect } from "react";
import RickAndMortyService from "../../services/RickAndMortyService";
import { List, ListItem, Image } from "@chakra-ui/react";

const CharList = () => {
  const [charList, setCharList] = useState([]);
  const [page, setPage] = useState(1);

  const rickAndMortyService = new RickAndMortyService();
  rickAndMortyService.getAllCharacters();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (page) => {
    rickAndMortyService.getAllCharacters(page).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    // let ended = false;

    // if (newCharList.length < 9) {
    //   ended = true;
    // }
    console.log(newCharList);
    setCharList((charList) => [...charList, ...newCharList]);
  };

  return (
    <List display="flex" gap="20px" flexWrap="wrap">
      {charList.map((item, i) => {
        return (
          <ListItem
            key={Math.random().toString(36).substring(2, 9)}
            display="flex"
            flexDirection="column"
            alignItems='center'
            gap='5px'
            background='#3C3E44'
            color='white'
            flex='1 1 20%'
          >
            <Image alt={item.name + " image"} src={item.image} maxWidth='200px'/>
            <h2> {item.name}</h2>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CharList;
