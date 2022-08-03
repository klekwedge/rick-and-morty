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

  const content = charItem ? (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="5px" background="#202329" minWidth="700px">
        <ModalHeader color="white" as="h3" fontSize="24px" mb="15px">
          {charItem.name}
        </ModalHeader>
        <ModalCloseButton color="white" size="lg" />
        <ModalBody display="flex" gap="50px">
          <Image
            src={charItem.image}
            alt={charItem.name + " image"}
            title={charItem.name}
          />
          <Box>
            <Flex alignItems="center" gap="5px" mb="10px">
              <Box
                background={() => checkStatus(charItem.status)}
                width="10px"
                height="10px"
                borderRadius="50%"
              ></Box>
              <Heading as="h4" fontSize="18px" color="white">
                {charItem.status} - {charItem.species}
              </Heading>
            </Flex>
            <Heading as="h4" fontSize="18px" color="white">
              Origin:
            </Heading>
            <Heading as="h4" fontSize="14px" color="white" mb="10px">
              {charItem.origin.name}
            </Heading>
            <Heading as="h4" fontSize="18px" color="white">
              Last known location:
            </Heading>
            <Heading as="h4" fontSize="14px" color="white" mb="10px">
              {charItem.location.name}
            </Heading>
            <Heading as="h4" fontSize="14px" color="white" mb="20px">
              Episodes: {charItem.episode.length}
            </Heading>
          </Box>
        </ModalBody>

        <ModalFooter display="flex" gap="20px">
          <Button
            backgroundColor="#3182ce"
            fontSize="16px"
            fontWeight="500"
            colorScheme="blue"
          >
            <Link to={`/characters/${charItem.id}`}>Homepage</Link>
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;

  return <>{content}</>;
};

export default CharInfo;
