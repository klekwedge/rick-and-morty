import { useEffect, useState } from "react";
import { Flex, Skeleton, Heading, Image, Box } from "@chakra-ui/react";
import RickAndMortyService from "../../services/RickAndMortyService";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);

  const rickAndMortyService = new RickAndMortyService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }

    rickAndMortyService.getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const content = char ? (
    <View char={char} />
  ) : (
    <Skeleton width="100%" height="100%" />
  );

  return (
    <Flex maxHeight='700px' minWidth="300px" flexDirection="column">
      {content}
    </Flex>
  );
};

const View = ({ char }) => {
  const checkStatus = (status) => {
    switch (status) {
      case "Alive":
        return "#55CC44";
      case "Dead":
        return "#D63D2E";
      case "unknown":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <Box
      borderRadius="5px"
      position="fixed"
      background={char ? "#FF9800" : "inherit"}
    >
      <Image src={char.image} alt={char.name + " image"} />
      <Box p="10px 20px 30px 20px">
        <Heading as="h3" fontSize="26px" textAlign="center" mb="10px">
          {char.name}
        </Heading>
        <Flex alignItems="center" gap="5px" mb="10px">
          <Box
            background={() => checkStatus(char.status)}
            width="10px"
            height="10px"
            borderRadius="50%"
          ></Box>
          <Heading as="h4" fontSize="18px">
            {char.status} - {char.species}
          </Heading>
        </Flex>
        <Heading as="h4" fontSize="18px" color="white">
          Origin:
        </Heading>
        <Heading as="h4" fontSize="14px" color="white" mb="10px">
          {char.origin.name}
        </Heading>
        <Heading as="h4" fontSize="18px" color="white">
          Last known location:
        </Heading>
        <Heading as="h4" fontSize="14px" color="white" mb="10px">
          {char.location.name}
        </Heading>
        <Heading as="h4" fontSize="14px" color="white">
          Episodes: {char.episode.length}
        </Heading>
      </Box>
    </Box>
  );
};

export default CharInfo;
