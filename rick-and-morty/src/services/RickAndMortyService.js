class RickAndMortyService {
  _apiBase = "https://rickandmortyapi.com/api";

  getAllCharacters = async (page) => {
    const res = await fetch(`${this._apiBase}/chara2cter?page=${page}`);
    const data = await res.json();
    return data.results;
  };

  getCharacter = async (charId) => {
    const res = await fetch(`${this._apiBase}/character/${charId}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  getAllLocations = async (page) => {
    const res = await fetch(`${this._apiBase}/location?page=${page}`);
    const data = await res.json();
    return data.results;
  };

  getAllEpisodes = async (page) => {
    const res = await fetch(`${this._apiBase}/episode?page=${page}`);
    const data = await res.json();
    console.log(data.results);
    return data.results;
  };
}

export default RickAndMortyService;
