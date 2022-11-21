/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from "react";
import { Flex, List, ListItem, Image, Heading, Button } from "@chakra-ui/react";
import RickAndMortyService from "../../services/RickAndMortyService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import LikeButton from '../LikeButton/LikeButton';
// import CharSearchForm from '../CharSearchForm/CharSearchForm';
import "./CharList.module.scss";
import { ICharacter } from "../../types/character.types";

interface CharListProps {
  onCharSelected: (charItem: ICharacter) => void;
}

function CharList({ onCharSelected }: CharListProps) {

  const [charList, setCharList] = useState<ICharacter[]>([]);
  const [currentCharPage, setCurrentCharPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const charRefs = useRef<HTMLLIElement[]>([]);

  const focusOnItem = (id: number) => {
    charRefs.current.forEach((myRef) => myRef.classList.remove("_active"));
    charRefs.current[id].classList.add("_active");
    charRefs.current[id].focus();
  };

  // const addCharToFavorite = (e, item, index) => {
  //   if (
  //     e.target.tagName === 'svg'
  //     || e.target.tagName === 'INPUT'
  //     || e.target.tagName === 'circle'
  //     || e.target.tagName === 'path'
  //   ) {
  //     const option = e.currentTarget.childNodes[2].childNodes[0].checked ? 'add' : 'delete';
  //     onCharFavorite(item, option);
  //   } else {
  //     focusOnItem(index);
  //     onCharSelected(item);
  //     onOpen();
  //   }
  // };

  const rickAndMortyService = new RickAndMortyService();

  const onCharListLoaded = (newCharList: ICharacter[]) => {
    setLoading(false);
    setCharList([...charList, ...newCharList]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const onRequest = (currentPage: number) => {
    rickAndMortyService
      .getAllCharacters(currentPage)
      .then(onCharListLoaded)
      .catch(onError);
  };

  useEffect(() => {
    onRequest(currentCharPage);
    setCurrentCharPage(() => currentCharPage + 1);
  }, []);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error)
    ? charList.map((item, i) => (
        <ListItem
          tabIndex={0}
          key={item.id}
          ref={(el) => {
            if (el) {
              charRefs.current[i] = el;
            }
          }}
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
          onClick={() => {
            // addCharToFavorite(e, item, i, item.id);
            onCharSelected(item);
            focusOnItem(i);
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
          <Image alt={`${item.name} image`} src={item.image} />
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
            {/* <LikeButton itemId={item.id} /> */}
          </Button>
        </ListItem>
      ))
    : null;

  return (
    <Flex flexDirection="column" gap="20px" pb="50px" pt="20px">
      {/* <CharSearchForm
        onCharSelected={onCharSelected}
        onCharFavorite={onCharFavorite}
        onOpen={onOpen}
      /> */}
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
        alignSelf="center"
        background="#3C3E44"
        color="white"
        maxWidth="200px"
        _hover={{ background: "#FF9800" }}
      >
        Load more
      </Button>
    </Flex>
  );
}

export default CharList;
