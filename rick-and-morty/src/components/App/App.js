import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import AppHeader from "../AppHeader/AppHeader";

const Page404 = lazy(() => import("../pages/Page404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const EpisodesPage = lazy(() => import("../pages/EpisodesPage"));
const LocationPage = lazy(() => import("../pages/LocationsPage"));

function App() {
  return (
    <Router>
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
            <Suspense fallback={<span>Loading...</span>}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/locations" element={<LocationPage />} />
                <Route path="/episodes" element={<EpisodesPage />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </Flex>
        </Flex>
      </ChakraProvider>
    </Router>
  );
}

export default App;
