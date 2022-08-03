import { Link } from "react-router-dom";
import { Flex, Heading, Image, Box } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const CharInfo = ({ charItem, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="5px" background="#202329" maxWidth="400px">
        <ModalHeader color="white">Character info</ModalHeader>
        <ModalCloseButton color="white" size="lg" />
        <ModalBody>
          <View char={charItem} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
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
    <Flex flexDirection="column">
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
    </Flex>
  );
};

export default CharInfo;
