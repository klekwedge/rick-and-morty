import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Flex,
  Image,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import RickAndMortyService from "../../services/RickAndMortyService";

const SingleCharacterLayout = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [episodeList, setEpisodeList] = useState([]);

  const rickAndMortyService = new RickAndMortyService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    rickAndMortyService.getCharacter(id).then(onDataLoaded);
  };

  const onDataLoaded = (data) => {
    setData(data);
    updateEpisodes(data.episode);
  };

  const updateEpisodes = (episode) => {
    episode.map((url, i) => {
      rickAndMortyService.getData(url).then(onEpisodesLoaded);
    });
  };

  const onEpisodesLoaded = (data) => {
    setEpisodeList((episodeList) => [...episodeList, data]);
  };

  const error = false;
  const loading = false;

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !data) ? (
    <div>
      <Flex gap="40px" mb="20px">
        <Image
          src={data.image}
          alt={data.name}
          borderRadius="5px"
          title={data.name}
        />
        <Flex flexDirection="column" gap="5px">
          <h2>Name: {data.name}</h2>
          <h3>Gender: {data.gender}</h3>
          <h3>Species: {data.species}</h3>
          <h3>Status: {data.status}</h3>
          <h3>Location: {data.location.name}</h3>{" "}
          <Heading as="h3" fontWeight="500" fontSize="20px" mb="10px">
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
            {episodeList.map((episodeItem, i) => (
              <Tr p="5px" key={episodeItem.id} background="#2EC4B6">
                <Td> {episodeItem.name}</Td>
                <Td> {episodeItem.air_date}</Td>
                <Td> {episodeItem.episode}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SingleCharacterLayout;
