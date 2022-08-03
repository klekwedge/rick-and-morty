import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ChakraProvider, Flex } from "@chakra-ui/react";

import AppHeader from "../AppHeader/AppHeader";
import Spinner from "../Spinner/Spinner";
import favoriteCharsContext from "../context";

const Page404 = lazy(() => import("../pages/Page404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const EpisodesPage = lazy(() => import("../pages/EpisodesPage"));
const LocationPage = lazy(() => import("../pages/LocationsPage"));
// const FavoriteCharsPage = lazy(() => import("../pages/FavoriteCharsPage"));
const SingleCharacterLayout = lazy(() =>
  import("../pages/SingleCharacterLayout")
);
const SingleLocationLayout = lazy(() =>
  import("../pages/SingleLocationLayout")
);
const SingleEpisodeLayout = lazy(() => import("../pages/SingleEpisodeLayout"));

const { Provider } = favoriteCharsContext;

function App() {
  // const [dataFloat, setDataFloat] = useState({
  //   favoriteListChar: [],
  //   forceChangeFavoriteList: forceChangeFavoriteList,
  // });

  // function forceChangeFavoriteList(newChar) {
  //   // console.log([...data.favoriteList]);
  //   setDataFloat({
  //     ...dataFloat,
  //     favoriteListChar: [...dataFloat.favoriteListChar, newChar],
  //   });
  // }

  // console.log(dataFloat.favoriteListChar);
  // const obj = {
  //   arr: [],
  //   test: () => {
  //     console.log("!");
  //   },
  // };

  // console.log(obj);
  // const test = { ...obj, arr: [...obj.arr, 1] }
  // console.log(test);

  // console.log({ ...test, arr: [...test.arr, 5] });

  return (
    // <Provider value={dataFloat}>
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
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/locations" element={<LocationPage />} />
                  <Route path="/episodes" element={<EpisodesPage />} />
                  {/* <Route path="/favorites" element={<FavoriteCharsPage />} /> */}
                  <Route
                    path="/characters/:id"
                    element={<SingleCharacterLayout />}
                  />
                  <Route
                    path="/locations/:id"
                    element={<SingleLocationLayout />}
                  />
                  <Route
                    path="/episodes/:id"
                    element={<SingleEpisodeLayout />}
                  />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </Suspense>
            </Flex>
          </Flex>
        </ChakraProvider>
      </Router>
    //  </Provider>
  );
}

export default App;
