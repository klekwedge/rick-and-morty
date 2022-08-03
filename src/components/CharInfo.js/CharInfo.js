import { Link } from "react-router-dom";
import { Flex, Skeleton, Heading, Image, Box } from "@chakra-ui/react";

const CharInfo = ({ charItem }) => {
  const content = charItem ? (
    <View char={charItem} />
  ) : (
    <Skeleton width="100%" height="100%" />
  );

  return (
    <Flex
      pt="60px"
      maxHeight="700px"
      minWidth="300px"
      flexDirection="column"
      position="relative"
    >
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
      top="50%"
      background={char ? "#202329" : "inherit"}
      pb="30px"
      maxWidth="250px"
    >
      <Image src={char.image} alt={char.name + " image"} title={char.name} />
      <Box p="10px 20px 0px 20px">
        <Heading
          as="h3"
          fontSize="24px"
          textAlign="center"
          mb="15px"
          color="white"
        >
          {char.name}
        </Heading>
        <Flex alignItems="center" gap="5px" mb="10px">
          <Box
            background={() => checkStatus(char.status)}
            width="10px"
            height="10px"
            borderRadius="50%"
          ></Box>
          <Heading as="h4" fontSize="18px" color="white">
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
        <Heading as="h4" fontSize="14px" color="white" mb="20px">
          Episodes: {char.episode.length}
        </Heading>
        <Heading
          as="h4"
          fontSize="16px"
          color="white"
          fontWeight="500"
          transition="all 0.4s ease"
          _hover={{ color: "#FF9800" }}
        >
          <Link to={`/characters/${char.id}`}>Visit "{char.name}" page?</Link>
        </Heading>
      </Box>
    </Box>
  );
};

export default CharInfo;
