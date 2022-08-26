/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heading, ListItem, List, Flex, Image,
} from '@chakra-ui/react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import RickAndMortyService from '../../services/RickAndMortyService';

function SingleEpisodeLayout() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [characterList, setCharacterList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onCharacterLoaded = (newData) => {
    setCharacterList((characterItems) => [...characterItems, newData]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const updateCharacters = (characters) => {
    characters.map((characterUrl) => rickAndMortyService.getData(characterUrl).then(onCharacterLoaded).catch(onError));
  };

  const onDataLoaded = (newData) => {
    setData(newData);
    setLoading(false);
    updateCharacters(newData.characters);
  };

  const updateData = () => {
    rickAndMortyService.getEpisode(id).then(onDataLoaded);
  };

  useEffect(() => {
    updateData();
  }, [id]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !data) ? (
    <div>
      <Flex gap="40px" mb="20px">
        <Flex flexDirection="column" gap="5px">
          <Heading as="h3" fontWeight="500" fontSize="20px">
            Name:
            {' '}
            {data.name}
          </Heading>
          <h3>
            Air date:
            {data.air_date}
          </h3>
          <h3>
            Episode:
            {data.episode}
          </h3>
        </Flex>
      </Flex>

      <Heading as="h3" fontWeight="500" fontSize="20px" mb="20px">
        Characters:
        {' '}
        {characterList.length}
      </Heading>

      <List display="flex" gap="20px" flexWrap="wrap" pb="50px">
        {characterList.map((item) => (
          <ListItem
            tabIndex="0"
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
            _hover={{ transform: 'scale(1.05)' }}
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

export default SingleEpisodeLayout;