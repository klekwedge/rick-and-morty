/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
import React, { useRef } from 'react';
import {
  List, ListItem, Image, Heading, Button, Skeleton,
} from '@chakra-ui/react';
import LikeButton from '../LikeButton/LikeButton';
import './FavoriteCharList.scss';

function FavoriteCharList({ onCharSelected, favoriteCharList, onOpen }) {
  const charRefs = useRef([]);

  const focusOnItem = (id) => {
    charRefs.current.forEach((myRef) => {
      if (myRef) {
        myRef.classList.remove('_active');
      }
    });
    charRefs.current[id].classList.add('_active');
    charRefs.current[id].focus();
  };

  const removeCharFromFavorite = (e, index, item) => {
    if (
      e.target.tagName === 'svg'
      || e.target.tagName === 'INPUT'
      || e.target.tagName === 'circle'
      || e.target.tagName === 'path'
    ) {
      charRefs.current = charRefs.current.filter((myRef) => myRef !== charRefs.current[index]);
    } else {
      focusOnItem(index);
      onCharSelected(item);
      onOpen();
    }
  };

  const content = favoriteCharList.length > 0 ? (
    favoriteCharList.map((item, i) => (
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
          removeCharFromFavorite(e, i, item);
        }}
        onKeyPress={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            onCharSelected(item);
            focusOnItem(i);
          }
        }}
        transition="all .3s ease-in-out"
        _hover={{ transform: 'scale(1.05)' }}
      >
        <Image alt={`${item.name} image`} src={item.image} />
        <Heading as="h2" fontSize="20px" textAlign="center">
          {item.name}
        </Heading>
        <Button
          position="absolute"
          top="-7px"
          right="-20px"
          background="transparent"
          _active={{ bacground: 'transparent' }}
          _hover={{ bacground: 'transparent' }}
        >
          <LikeButton itemId={item.id} />
        </Button>
      </ListItem>
    ))
  ) : (
    <Skeleton width="700px" height="200px" />
  );
  return (
    <List display="flex" gap="20px" flexWrap="wrap" width="100%">
      {content}
    </List>
  );
}

export default FavoriteCharList;
