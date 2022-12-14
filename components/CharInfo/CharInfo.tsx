import React from "react";
import {
  Flex,
  Heading,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { ICharacter } from "../../types/character.types";

interface CharInfoProps {
  charItem: ICharacter | undefined;
  isOpen: boolean;
  onClose: () => void;
}

function CharInfo({ charItem, isOpen, onClose }: CharInfoProps) {
  const checkStatus = (status: string) => {
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
            alt={`${charItem.name} image`}
            title={charItem.name}
          />
          <Flex gap="5px" flexDirection="column">
            <Flex alignItems="center" gap="5px">
              <Box
                background={checkStatus(charItem.status)}
                width="10px"
                height="10px"
                borderRadius="50%"
              />
              <Heading as="h4" fontSize="18px" color="white">
                Status: <span>{charItem.status}</span>
              </Heading>
            </Flex>

            <Heading as="h4" fontSize="18px" color="white">
              Species:
              <span> {charItem.species}</span>
            </Heading>

            <Flex alignItems="center" gap="5px">
              <Heading as="h4" fontSize="18px" color="white">
                Gender:
                <span> {charItem.gender}</span>
              </Heading>
            </Flex>

            <Heading as="h4" fontSize="18px" color="white">
              Origin: <span> {charItem.origin.name}</span>
            </Heading>
            <Heading as="h4" fontSize="18px" color="white">
              Last known location: <span> {charItem.location.name}</span>
            </Heading>
            <Heading as="h4" fontSize="18px" color="white">
              Episodes: <span> {charItem.episode.length}</span>
            </Heading>
          </Flex>
        </ModalBody>

        <ModalFooter display="flex" gap="10px">
          <Button
            backgroundColor="#3182ce"
            fontSize="16px"
            fontWeight="500"
            colorScheme="blue"
          >
            <Link href={`/characters/${charItem.id}`}>Homepage</Link>
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;

  return <div>{content}</div>;
}

export default CharInfo;
