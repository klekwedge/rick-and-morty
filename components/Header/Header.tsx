import React from "react";
import { Flex, List, Heading } from "@chakra-ui/react";
import "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

function AppHeader() {
  const { pathname } = useRouter();

  return (
    <Flex
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="10px"
    >
      <Heading as="h1" fontSize="30px" color="#FF9800">
        <Link href="/" className="effect-1">
          Rick and Morty Info
        </Link>
      </Heading>
      <Flex as="nav">
        <List display="flex" gap="10px" fontSize="18px" className="nav-links">
          <li>
            <Link
              href="/"
              style={pathname === "/" ? { fontWeight: "700" } : {}}
            >
              Characters
            </Link>
          </li>
          <li>
            <Link
              href="/locations"
              style={pathname === "/locations" ? { fontWeight: "700" } : {}}
            >
              Locations
            </Link>
          </li>
          <li>
            <Link
              href="/episodes"
              style={pathname === "/episodes" ? { fontWeight: "700" } : {}}
            >
              Episodes
            </Link>
          </li>
        </List>
      </Flex>
    </Flex>
  );
}

export default AppHeader;
