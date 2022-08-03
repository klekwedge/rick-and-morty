import { useContext } from "react";
import ErrorFuse from '../ErrorFuse/ErrorFuse';
import favoriteCharsContext from "../context";

const FavoriteCharsPage = () => {
  const context = useContext(favoriteCharsContext);

  // return <ul onClick={context.forceChangeFavoriteList}>!</ul>;
  return (
    <ErrorFuse>
      {context && context.favoriteListChar.length > 0 
        ? context.favoriteListChar.map((item, i) => {
            return item;
          })
        : null}
    </ErrorFuse>
  );
};

export default FavoriteCharsPage;
