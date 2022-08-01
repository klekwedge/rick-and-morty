import { useState } from "react";
import CharList from "../CharList.js/CharList";
import CharInfo from "../CharInfo.js/CharInfo";

function MainPage() {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <CharList onCharSelected={onCharSelected} />
      <CharInfo charId={selectedChar} />
    </>
  );
}

export default MainPage;
