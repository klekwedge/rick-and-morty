class RickAndMortyService {
  _apiBase = "https://rickandmortyapi.com/api";
  _basePage= 1;

  getAllCharacters = async (page = this._basePage) => {
    const res = await fetch(`${this._apiBase}/character?page=${page}`);
    const data = await res.json();
    return data.results;
  };
}

export default RickAndMortyService;
