import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
import { Flex, Heading, Image, Button } from "@chakra-ui/react";
import RickAndMortyService from "../../services/RickAndMortyService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Link from "next/link";

function CharacterTemplate({ character, onRequest }) {
  return (
    <Flex
      justifyContent="space-between"
      backgroundColor="#3C3E44"
      p="20px"
      color="white"
      borderRadius="10px"
    >
      <Flex gap="40px">
        <Image
          src={character.image}
          alt={character.name}
          borderRadius="5px"
          title={character.name}
          maxWidth="200px"
          maxHeight="200px"
        />
        <Flex flexDirection="column" gap="8px">
          <Heading as="h3" fontWeight="500" fontSize="18px">
            Name: {character.name}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Gender: {character.gender}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Species: {character.species}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Status: {character.status}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Location: {character.location.name}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Origin: {character.origin.name}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Episodes: {character.episode.length}
          </Heading>
        </Flex>
      </Flex>
      <Flex gap="20px">
        <Button
          alignSelf="flex-end"
          border="2px solid #FF9800"
          background="inherit"
          transition="all 0.4s ease"
          _hover={{ background: "#FF9800" }}
        >
          <Link href={`/characters/${character.id}`}>HomePage</Link>
        </Button>
        <Button
          alignSelf="flex-end"
          border="2px solid #FF9800"
          background="inherit"
          transition="all 0.4s ease"
          _hover={{ background: "#FF9800" }}
          onClick={onRequest}
        >
          Random char
        </Button>
      </Flex>
    </Flex>
  );
}

function RandomChar() {
  const [currentChar, setCurrentChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onCharacterLoaded = (data) => {
    setCurrentChar(data);
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };
  const onRequest = () => {
    const charId = Math.floor(Math.random() * (826 - 1) + 1);
    rickAndMortyService
      .getCharacter(charId)
      .then(onCharacterLoaded)
      .catch(onError);
  };

  useEffect(() => {
    onRequest();
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading) ? (
    <CharacterTemplate character={currentChar} onRequest={onRequest} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default RandomChar;
