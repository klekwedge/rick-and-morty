import { useState } from "react";
import CharList from "../CharList.js/CharList";
import CharInfo from "../CharInfo.js/CharInfo";
import ErrorFuse from "../ErrorFuse/ErrorFuse";

function MainPage() {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <ErrorFuse>
        <CharList onCharSelected={onCharSelected} />
      </ErrorFuse>
      <ErrorFuse>
        <CharInfo charId={selectedChar} />
      </ErrorFuse>
    </>
  );
}

export default MainPage;
