import { useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import CharList from "../CharList.js/CharList";
import CharInfo from "../CharInfo.js/CharInfo";
import ErrorFuse from "../ErrorFuse/ErrorFuse";
import RandomChar from "../RandomChar/RandomChar";
import FavoriteCharList from "../FavoriteCharList/FavoriteCharList";
import CharSearchForm from "../CharSearchForm/CharSearchForm";

function MainPage() {
  const [selectedChar, setSelectedChar] = useState(null);
  const [favoriteCharList, setFavoriteCharList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCharFavorite = (char, option) => {
    if (option === "add") {
      setFavoriteCharList([...favoriteCharList, char]);
    } else {
      setFavoriteCharList([
        ...favoriteCharList.filter((charItem) => charItem !== char),
      ]);
    }
  };

  const onCharSelected = (charItem) => {
    setSelectedChar(charItem);
  };

  return (
    <Flex flexDirection="column" gap="40px">
      <ErrorFuse>
        <RandomChar />
      </ErrorFuse>
      <Flex gap="50px">
        <Tabs>
          <TabList>
            <Tab>Char list</Tab>
            <Tab> Favorite char list</Tab>
          </TabList>
          <TabPanels width="100%">
            <TabPanel>
              <ErrorFuse>
                <CharList
                  onCharSelected={onCharSelected}
                  onCharFavorite={onCharFavorite}
                  onOpen={onOpen}
                />
              </ErrorFuse>
            </TabPanel>
            <TabPanel flexGrow="1">
              <ErrorFuse>
                <FavoriteCharList
                  onCharSelected={onCharSelected}
                  favoriteCharList={favoriteCharList}
                  onOpen={onOpen}
                />
              </ErrorFuse>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <ErrorFuse>
          <CharInfo charItem={selectedChar} isOpen={isOpen} onClose={onClose} />
        </ErrorFuse>
      </Flex>
    </Flex>
  );
}

export default MainPage;
