import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import CharList from "../CharList.js/CharList";
import CharInfo from "../CharInfo.js/CharInfo";
import ErrorFuse from "../ErrorFuse/ErrorFuse";
import RandomChar from "../RandomChar/RandomChar";

function MainPage() {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <Flex flexDirection="column" gap='40px'>
      <ErrorFuse>
        <RandomChar />
      </ErrorFuse>
      <Flex gap="50px">
        <ErrorFuse>
          <CharList onCharSelected={onCharSelected} />
        </ErrorFuse>
        <ErrorFuse>
          <CharInfo charId={selectedChar} />
        </ErrorFuse>
      </Flex>
    </Flex>
  );
}

export default MainPage;
