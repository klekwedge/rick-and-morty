import { useState, useEffect, useRef } from "react";
import {
  Flex,
  List,
  ListItem,
  Image,
  Heading,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import LikeButton from "../LikeButton/LikeButton";
import "./FavoriteCharList.scss";

const FavoriteCharList = ({ onCharSelected, favoriteCharList }) => {
  const charRefs = useRef([]);

  const focusOnItem = (id) => {
    charRefs.current.forEach((myRef) => myRef.classList.remove("_active"));
    charRefs.current[id].classList.add("_active");
    charRefs.current[id].focus();
  };

  // const removeCharFromFavorite = (e) => {
  //   if (
  //     e.target.tagName === "svg" ||
  //     e.target.tagName === "input" ||
  //     e.target.tagName === "circle" ||
  //     e.target.tagName === "path"
  //   ) {
  //     // context.forceChangeFavoriteList(e.currentTarget);
  //   }
  // };

  const content =
    favoriteCharList.length > 0 ? (
      favoriteCharList.map((item, i) => {
        return (
          <ListItem
            className="favoriteChar"
            tabIndex="0"
            key={i}
            ref={(el) => (charRefs.current[i] = el)}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="8px"
            background="#3C3E44"
            color="white"
            flex="1 0 20%"
            pb="15px"
            overflow="hidden"
            cursor="pointer"
            position="relative"
            borderRadius="5px"
            onClick={(e) => {
              focusOnItem(i);
              onCharSelected(item);
              // removeCharFromFavorite(e);
            }}
            onKeyPress={(e) => {
              if (e.key === " " || e.key === "Enter") {
                onCharSelected(item);
                focusOnItem(i);
              }
            }}
            transition="all .3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image alt={item.name + " image"} src={item.image} />
            <Heading as="h2" fontSize="20px" textAlign="center">
              {item.name}
            </Heading>
            <Button
              position="absolute"
              top="-7px"
              right="-20px"
              background="transparent"
              _active={{ bacground: "transparent" }}
              _hover={{ bacground: "transparent" }}
            >
              <LikeButton itemId={item.id} />
            </Button>
          </ListItem>
        );
      })
    ) : (
      <Skeleton width="730px" height="200px"></Skeleton>
    );
  return (
    <List display="flex" gap="20px" flexWrap="wrap" width="100%">
      {content}
    </List>
  );
};

export default FavoriteCharList;
