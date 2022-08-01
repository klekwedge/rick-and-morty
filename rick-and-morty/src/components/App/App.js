import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import CharList from "../CharList.js/CharList";
import CharInfo from "../CharInfo.js/CharInfo";
import AppHeader from "../AppHeader/AppHeader";

function App() {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        gap="50px"
        m="0 auto"
        p="10px"
        maxWidth="1100px"
      >
        <AppHeader />
        <Flex as="main" gap="50px">
          <CharList onCharSelected={onCharSelected}/>
          <CharInfo charId={selectedChar}/>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
