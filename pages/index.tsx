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
// import FavoriteCharList from '../components/FavoriteCharList/FavoriteCharList';

function MainPage() {
  const [selectedChar, setSelectedChar] = useState<ICharacter>();
  // const [favoriteCharList, setFavoriteCharList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const onCharFavorite = (char: any, option: any) => {
  //   if (option === 'add') {
  //     setFavoriteCharList([...favoriteCharList, char]);
  //   } else {
  //     setFavoriteCharList([...favoriteCharList.filter((charItem) => charItem !== char)]);
  //   }
  // };

  const onCharSelected = (charItem: ICharacter) => {
    setSelectedChar(charItem);
    onOpen();
  };

  return (
    <Flex flexDirection="column" gap="40px">
      <ErrorFuse>
        <RandomChar />
      </ErrorFuse>
      {/* <Flex gap="50px">
        <Tabs>
          <TabList>
            <Tab>Char list</Tab>
            <Tab> Favorite char list</Tab>
          </TabList>
          <TabPanels width="100%">
            <TabPanel> */}
              <ErrorFuse>
                <CharList
                  onCharSelected={onCharSelected}
                />
              </ErrorFuse>
            {/* </TabPanel>
            <TabPanel> */}
              {/* <ErrorFuse>
                <FavoriteCharList
                  onCharSelected={onCharSelected}
                  favoriteCharList={favoriteCharList}
                  onOpen={onOpen}
                />
              </ErrorFuse> */}
            {/* </TabPanel>
          </TabPanels>
        </Tabs> */}

        <ErrorFuse>
          <CharInfo charItem={selectedChar} isOpen={isOpen} onClose={onClose} />
        </ErrorFuse>
      {/* </Flex> */}
    </Flex>
  );
}

export default MainPage;
