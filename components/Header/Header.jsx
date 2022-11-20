import React from "react";
import { Flex, List, Heading } from "@chakra-ui/react";
import "./Header.module.scss";
import Link from "next/link";

function AppHeader() {
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
              // className={pathname === path ? styles.active : null}
              // style={({ isActive }) => ({
              //   fontWeight: isActive ? '700' : '400',
              // })}
            >
              Characters
            </Link>
          </li>
          <li>
            <Link
              href="/locations"
              // style={({ isActive }) => ({
              //   fontWeight: isActive ? '700' : '400',
              // })}
            >
              Locations
            </Link>
          </li>
          <li>
            <Link
              href="/episodes"
              // style={({ isActive }) => ({
              //   fontWeight: isActive ? '700' : '400',
              //   class: isActive ? 'active' : 'effect-3',
              // })}
            >
              Episodes
            </Link>
          </li>
          <li>
            {/* <Link
              href="/favorites"
              // style={({ isActive }) => ({
              //   fontWeight: isActive ? "700" : "400",
              //   class: isActive ? "active" : "effect-3",
              // })}
            >
              Favorites
            </Link> */}
          </li>
        </List>
      </Flex>
    </Flex>
  );
}

export default AppHeader;
