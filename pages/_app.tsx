import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
// import AppHeader from "../components/AppHeader/AppHeader";
import "./../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        gap="50px"
        m="0 auto"
        p="10px"
        maxWidth="1100px"
      >
        {/* <AppHeader /> */}
        <Flex as="main" gap="50px">
          <Component {...pageProps} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
