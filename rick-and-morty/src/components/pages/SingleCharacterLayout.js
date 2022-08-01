import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List, ListItem, Heading } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
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
    console.log(data);
    setEpisodeList((episodeList) => [...episodeList, data]);
  };

  const error = false;
  const loading = false;

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !data) ? (
    <div>
      <img src={data.image} alt={data.name} />
      <div>
        <h2>{data.name}</h2>
        <h3>{data.gender}</h3>
        <h3>{data.species}</h3>
        <h3>{data.status}</h3>
        <h3>{data.location.name}</h3>
        <Heading as="h3" fontWeight="500" fontSize="20px" mb="10px">
          {data.origin.name}
        </Heading>
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
                <Tr p="5px" key={i} background='#2EC4B6'>
                  <Td> {episodeItem.name}</Td>
                  <Td> {episodeItem.air_date}</Td>
                  <Td> {episodeItem.episode}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        {/* <List display="flex" flexDirection="column">
          {episodeList.map((episodeItem, i) => (
            <ListItem
              key={i}
              p="5px"
              color={i % 2 === 0 ? "black" : "white"}
              background={i % 2 === 0 ? "#CBF3F0" : "#2EC4B6"}
              border="1px solid black"
            >
              {episodeItem.name}
            </ListItem>
          ))}
        </List> */}
      </div>
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
