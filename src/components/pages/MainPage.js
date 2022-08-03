import { useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import CharList from "../CharList.js/CharList";
import CharInfo from "../CharInfo.js/CharInfo";
import ErrorFuse from "../ErrorFuse/ErrorFuse";
import RandomChar from "../RandomChar/RandomChar";
import FavoriteCharList from "../FavoriteCharList/FavoriteCharList";

function MainPage() {
  const [selectedChar, setSelectedChar] = useState(null);
  const [favoriteCharList, setFavoriteCharList] = useState([]);

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

          <TabPanels width='100%'>
            <TabPanel>
              <ErrorFuse>
                <CharList
                  onCharSelected={onCharSelected}
                  onCharFavorite={onCharFavorite}
                />
              </ErrorFuse>
            </TabPanel>
            <TabPanel flexGrow="1" width='730px'>
              <ErrorFuse>
                <FavoriteCharList
                  onCharSelected={onCharSelected}
                  favoriteCharList={favoriteCharList}
                />
              </ErrorFuse>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <ErrorFuse>
          <CharInfo charItem={selectedChar} />
        </ErrorFuse>
      </Flex>
    </Flex>
  );
}

export default MainPage;
