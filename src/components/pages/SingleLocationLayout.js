import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ListItem, Flex, Image, Heading, List } from "@chakra-ui/react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import RickAndMortyService from "../../services/RickAndMortyService";

const SingleLocationLayout = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [residentList, setResidentList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    rickAndMortyService.getLocation(id).then(onDataLoaded);
  };

  const onDataLoaded = (data) => {
    setData(data);
    setLoading(false);
    updateResidents(data.residents);
  };

  const updateResidents = (residents) => {
    residents.map((url, i) =>
      rickAndMortyService.getData(url).then(onResidentsLoaded).catch(onError)
    );
  };

  const onResidentsLoaded = (data) => {
    setResidentList((residentList) => [...residentList, data]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !data) ? (
    <div>
      <Flex gap="40px" mb="20px">
        <Flex flexDirection="column" gap="5px">
          <Heading as="h3" fontWeight="500" fontSize="20px">
            Name: {data.name}
          </Heading>
          <h3>Type: {data.type}</h3>
          <h3>Dimension: {data.dimension}</h3>
        </Flex>
      </Flex>

      <Heading as="h3" fontWeight="500" fontSize="20px" mb="20px">
        Residents: {residentList.length}
      </Heading>

      <List display="flex" gap="20px" flexWrap="wrap" pb='50px'>
        {residentList.map((residentItem, i) => (
          <ListItem
            tabIndex="0"
            key={residentItem.id}
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
            <Image
              alt={residentItem.name + " image"}
              src={residentItem.image}
            />
            <Heading as="h2" fontSize="20px" textAlign="center">
              {residentItem.name}
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
};

export default SingleLocationLayout;
