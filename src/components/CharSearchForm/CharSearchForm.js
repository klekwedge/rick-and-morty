import { useRef } from "react";
import {
  Input,
  Box,
  ListItem,
  Image,
  Button,
  Heading,
  List,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RickAndMortyService from "../../services/RickAndMortyService";
import LikeButton from "../LikeButton/LikeButton";
const CharSearchForm = ({ onCharSelected, onCharFavorite, onOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [charList, setCharList] = useState([]);
  const charRefs = useRef([]);
  const rickAndMortyService = new RickAndMortyService();
  useEffect(() => {
    if (inputValue === "") {
      setCharList([]);
    } else {
      onRequst();
    }
  }, [inputValue]);

  const onRequst = () => {
    rickAndMortyService
      .getData(`https://rickandmortyapi.com/api/character/?name=${inputValue}`)
      .then(onCharLoaded);
  };

  const onCharLoaded = (data) => {
    setCharList(data.results);
  };

  const addCharToFavorite = (e, item, index, itemId) => {
    if (
      e.target.tagName === "svg" ||
      e.target.tagName === "INPUT" ||
      e.target.tagName === "circle" ||
      e.target.tagName === "path"
    ) {
      const option = e.currentTarget.childNodes[2].childNodes[0].checked
        ? "add"
        : "delete";
      onCharFavorite(item, option);
    } else {
      focusOnItem(index);
      onCharSelected(item);
      onOpen();
    }
  };

  const focusOnItem = (id) => {
    charRefs.current.forEach((myRef) => myRef.classList.remove("_active"));
    charRefs.current[id].classList.add("_active");
    charRefs.current[id].focus();
  };

  return (
    <Box mt='20px' borderBottom='5px solid black' pb='20px'>
      <Input
        maxWidth="400px"
        placeholder="Input character name size"
        size="md"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        mb='20px'
      />
      <List display="flex" gap="20px" flexWrap="wrap">
        {charList
          ? charList.map((item, i) => (
              <ListItem
                tabIndex="0"
                key={item.id}
                ref={(el) => (charRefs.current[i] = el)}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="8px"
                background="#3C3E44"
                color="white"
                flex="1 1 20%"
                pb="15px"
                overflow="hidden"
                cursor="pointer"
                position="relative"
                borderRadius="5px"
                onClick={(e) => {
                  addCharToFavorite(e, item, i, item.id);
                }}
                onKeyPress={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    onCharSelected(item);
                    focusOnItem(i);
                  }
                }}
                transition="all .3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Image alt={item.name + " image"} src={item.image} />
                <Heading as="h2" fontSize="20px" textAlign="center">
                  {item.name}
                </Heading>
                <Button
                  position="absolute"
                  top="-7px"
                  right="-20px"
                  background="transparent"
                  _active={{ bacground: "transparent" }}
                  _hover={{ bacground: "transparent" }}
                >
                  <LikeButton itemId={item.id} />
                </Button>
              </ListItem>
            ))
          : null}
      </List>
    </Box>
  );
};

export default CharSearchForm;
