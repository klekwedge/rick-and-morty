import { ChakraProvider } from "@chakra-ui/react";
import CharList from "../CharList.js/CharList";
import AppHeader from '../AppHeader/AppHeader';
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <AppHeader/>
        <CharList />
      </div>
    </ChakraProvider>
  );
}

export default App;
