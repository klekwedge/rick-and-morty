import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ChakraProvider, Flex } from '@chakra-ui/react';

import AppHeader from '../AppHeader/AppHeader';
import Spinner from '../Spinner/Spinner';

const Page404 = lazy(() => import('../pages/Page404/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const EpisodesPage = lazy(() => import('../pages/EpisodesPage'));
const LocationPage = lazy(() => import('../pages/LocationsPage'));
const SingleCharacterLayout = lazy(() => import('../pages/SingleCharacterLayout'));
const SingleLocationLayout = lazy(() => import('../pages/SingleLocationLayout'));
const SingleEpisodeLayout = lazy(() => import('../pages/SingleEpisodeLayout'));

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Flex flexDirection="column" gap="50px" m="0 auto" p="10px" maxWidth="1100px">
          <AppHeader />
          <Flex as="main" gap="50px">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/locations" element={<LocationPage />} />
                <Route path="/episodes" element={<EpisodesPage />} />
                <Route path="/characters/:id" element={<SingleCharacterLayout />} />
                <Route path="/locations/:id" element={<SingleLocationLayout />} />
                <Route path="/episodes/:id" element={<SingleEpisodeLayout />} />
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
