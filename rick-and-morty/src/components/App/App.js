import { ChakraProvider } from "@chakra-ui/react";
import CharList from "../CharList.js/CharList";

import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <CharList />
      </div>
    </ChakraProvider>
  );
}

export default App;
