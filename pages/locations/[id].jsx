import React, { useState, useEffect } from "react";
import { ListItem, Flex, Image, Heading, List } from "@chakra-ui/react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import RickAndMortyService from "../../services/RickAndMortyService";
import { useRouter } from "next/router";

function SingleLocation() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [residentList, setResidentList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rickAndMortyService = new RickAndMortyService();

  const onResidentsLoaded = (newData) => {
    setResidentList((residentItems) => [...residentItems, newData]);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const updateResidents = (residents) => {
    residents.map((url) =>
      rickAndMortyService.getData(url).then(onResidentsLoaded).catch(onError)
    );
  };

  const onDataLoaded = (newData) => {
    setData(newData);
    setLoading(false);
    updateResidents(newData.residents);
  };

  const updateData = () => {
    rickAndMortyService.getLocation(id).then(onDataLoaded);
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
            Name: {data.name}
          </Heading>
          <h3>
            Type:
            {data.type}
          </h3>
          <h3>
            Dimension:
            {data.dimension}
          </h3>
        </Flex>
      </Flex>

      <Heading as="h3" fontWeight="500" fontSize="20px" mb="20px">
        Residents: {residentList.length}
      </Heading>

      <List display="flex" gap="20px" flexWrap="wrap" pb="50px">
        {residentList.map((residentItem) => (
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
              alt={`${residentItem.name} image`}
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
}

export default SingleLocation;
