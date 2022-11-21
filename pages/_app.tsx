import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import CustomHead from "../components/CustomHead/CustomHead";
import Header from "../components/Header/Header";
import "./../styles/globals.scss";

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
        <Header />
        <Flex as="main" gap="50px">
          <CustomHead />
          <Component {...pageProps} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
