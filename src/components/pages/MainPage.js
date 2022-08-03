import { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CharList from "../CharList.js/CharList";
import CharInfo from "../CharInfo.js/CharInfo";
import ErrorFuse from "../ErrorFuse/ErrorFuse";
import RandomChar from "../RandomChar/RandomChar";
import FavoriteCharList from "../FavoriteCharList/FavoriteCharList";

function MainPage() {
  const [selectedChar, setChar] = useState(null);
  const [favoriteCharList, setFavoriteCharList] = useState([]);

  const onCharFavorite = (char) => {
    setFavoriteCharList([...favoriteCharList, char]);
  };


  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <Flex flexDirection="column" gap="40px">
      <ErrorFuse>
        <RandomChar />
      </ErrorFuse>
      <Flex gap="50px">
        <ErrorFuse>
          <Tabs>
            <TabList>
              <Tab>Char list</Tab>
              <Tab>Favorite char list</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <CharList
                  onCharSelected={onCharSelected}
                  onCharFavorite={onCharFavorite}
                />
              </TabPanel>
              <TabPanel>
                <FavoriteCharList
                  favoriteCharList={favoriteCharList}
                  onCharSelected={onCharSelected}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ErrorFuse>
        <ErrorFuse>
          <CharInfo charId={selectedChar} />
        </ErrorFuse>
      </Flex>
    </Flex>
  );
}

export default MainPage;
