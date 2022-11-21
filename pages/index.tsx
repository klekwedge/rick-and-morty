import React, { useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import CharList from "../components/CharList/CharList";
import CharInfo from "../components/CharInfo/CharInfo";
import ErrorFuse from "../components/ErrorFuse/ErrorFuse";
import RandomChar from "../components/RandomChar/RandomChar";
import { ICharacter } from "../types/character.types";

function MainPage() {
  const [selectedChar, setSelectedChar] = useState<ICharacter>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCharSelected = (charItem: ICharacter) => {
    setSelectedChar(charItem);
    onOpen();
  };

  return (
    <Flex flexDirection="column" gap="40px">
      <ErrorFuse>
        <RandomChar />
      </ErrorFuse>
      <ErrorFuse>
        <CharList onCharSelected={onCharSelected} />
      </ErrorFuse>
      <ErrorFuse>
        <CharInfo charItem={selectedChar} isOpen={isOpen} onClose={onClose} />
      </ErrorFuse>
    </Flex>
  );
}

export default MainPage;
