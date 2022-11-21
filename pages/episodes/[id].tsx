/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { Heading, ListItem, List, Flex, Image } from "@chakra-ui/react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import RickAndMortyService from "../../services/RickAndMortyService";
import { useRouter } from "next/router";
import { ICharacter } from "../../types/character.types";
import { IEpisode } from "../../types/episode.types";

function SingleEpisode() {
  const router = useRouter();
  const { id } = router.query;

  const [episode, setEpisode] = useState<IEpisode>();
  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onCharacterLoaded = (newCharacter: ICharacter) => {
    setCharacterList([...characterList, newCharacter]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const updateCharacters = (characters: string[]) => {
    characters.map((characterUrl) =>
      rickAndMortyService
        .getData(characterUrl)
        .then(onCharacterLoaded)
        .catch(onError)
    );
  };

  const onEpisodeLoaded = (episode: IEpisode) => {
    setEpisode(episode);
    setLoading(false);
    updateCharacters(episode.characters);
  };

  const updateData = () => {
    if (typeof id === "string") {
      rickAndMortyService.getEpisode(id).then(onEpisodeLoaded);
    }
  };

  useEffect(() => {
    if (id) {
      updateData();
    }
  }, [id]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !episode) ? (
    <div>
      <Flex gap="40px" mb="20px">
        <Flex flexDirection="column" gap="5px">
          <Heading as="h3" fontWeight="500" fontSize="20px">
            Name: {episode.name}
          </Heading>
          <h3>
            Air date:
            {episode.air_date}
          </h3>
          <h3>
            Episode:
            {episode.episode}
          </h3>
        </Flex>
      </Flex>

      <Heading as="h3" fontWeight="500" fontSize="20px" mb="20px">
        Characters: {characterList.length}
      </Heading>

      <List display="flex" gap="20px" flexWrap="wrap" pb="50px">
        {characterList.map((item) => (
          <ListItem
            tabIndex={0}
            key={item.id}
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
            borderRadius="5px"
            transition="all .3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image alt={`${item.name} image`} src={item.image} />
            <Heading as="h2" fontSize="20px" textAlign="center">
              {item.name}
            </Heading>
          </ListItem>
        ))}
      </List>
    </div>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default SingleEpisode;
