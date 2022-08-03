import { createContext } from "react";

const favoriteCharsContext = createContext({
  favoriteListChar: [],
  forceChangeFavoriteList: () => {},
});

export default favoriteCharsContext;
