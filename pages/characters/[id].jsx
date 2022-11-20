import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Flex,
  Image,
  Box,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import RickAndMortyService from "../../services/RickAndMortyService";

function SingleCharacter() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [episodeList, setEpisodeList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onEpisodeLoaded = (newEpisodeList) => {
    setEpisodeList([...episodeList, ...newEpisodeList]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const updateEpisodes = (episodes) => {
    episodes.map((url) =>
      rickAndMortyService.getData(url).then(onEpisodeLoaded).catch(onError)
    );
  };

  const onDataLoaded = (newData) => {
    setData(newData);
    setLoading(false);
    updateEpisodes(newData.episode);
  };

  const updateData = () => {
    rickAndMortyService.getCharacter(id).then(onDataLoaded);
  };

  useEffect(() => {
    if (id) {
      updateData();
    }
  }, [id]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !data) ? (
    <Box pb="50px">
      <Flex gap="40px" mb="20px">
        <Image
          src={data.image}
          alt={data.name}
          borderRadius="5px"
          title={data.name}
        />
        <Flex flexDirection="column" gap="5px">
          <Heading as="h3" fontWeight="500" fontSize="20px">
            Name: {data.name}
          </Heading>
          <h3>
            Gender:
            {data.gender}
          </h3>
          <h3>
            Species:
            {data.species}
          </h3>
          <h3>
            Status:
            {data.status}
          </h3>
          <h3>
            Location:
            {data.location.name}
          </h3>{" "}
          <Heading as="h3" fontWeight="400" fontSize="16px" mb="10px">
            Origin: {data.origin.name}
          </Heading>
        </Flex>
      </Flex>

      <Heading as="h3" fontWeight="500" fontSize="20px" mb="20px">
        Episodes: {episodeList.length}
      </Heading>

      <TableContainer border="1px solid black">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th> Series name </Th>
              <Th>Series release date</Th>
              <Th>Episode</Th>
            </Tr>
          </Thead>
          <Tbody>
            {episodeList.map((episodeItem) => (
              <Tr p="5px" key={episodeItem.id} background="#2EC4B6">
                <Td> {episodeItem.name}</Td>
                <Td> {episodeItem.air_date}</Td>
                <Td> {episodeItem.episode}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default SingleCharacter;
