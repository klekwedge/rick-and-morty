import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
import { Flex, Heading, Image, Button } from "@chakra-ui/react";
import RickAndMortyService from "../../services/RickAndMortyService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Link from "next/link";
import { ICharacter } from "../../types/character.types";

function RandomChar() {
  const [char, setChar] = useState<ICharacter>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onCharacterLoaded = (character: ICharacter) => {
    setChar(character);
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
    console.log("/");
    onRequest();
  }, []);

  if (error) {
    return <ErrorMessage />;
  }

  if (loading) {
    return <Spinner />;
  }

  return char ? (
    <Flex
      justifyContent="space-between"
      backgroundColor="#3C3E44"
      p="20px"
      color="white"
      borderRadius="10px"
    >
      <Flex gap="40px">
        <Image
          src={char.image}
          alt={char.name}
          borderRadius="5px"
          title={char.name}
          maxWidth="200px"
          maxHeight="200px"
        />
        <Flex flexDirection="column" gap="8px">
          <Heading as="h3" fontWeight="500" fontSize="18px">
            Name: {char.name}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Gender: {char.gender}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Species: {char.species}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Status: {char.status}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Location: {char.location.name}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Origin: {char.origin.name}
          </Heading>
          <Heading as="h3" fontWeight="400" fontSize="16px">
            Episodes: {char.episode.length}
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
          <Link href={`/characters/${char.id}`}>HomePage</Link>
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
  ) : null;
}

export default RandomChar;
