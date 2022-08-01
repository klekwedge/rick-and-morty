class RickAndMortyService {
  _apiBase = "https://rickandmortyapi.com/api";

  getAllCharacters = async (page) => {
    const res = await fetch(`${this._apiBase}/character?page=${page}`);
    const data = await res.json();
    return data.results;
  };
}

export default RickAndMortyService;
