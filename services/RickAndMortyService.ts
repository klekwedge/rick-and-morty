/* eslint-disable class-methods-use-this */
class RickAndMortyService {
  apiBase = 'https://rickandmortyapi.com/api';

  getAllCharacters = async (page: number) => {
    const res = await fetch(`${this.apiBase}/character?page=${page}`);
    const data = await res.json();
    return data.results;
  };

  getCharacter = async (charId: string) => {
    const res = await fetch(`${this.apiBase}/character/${charId}`);
    const data = await res.json();
    return data;
  };

  getAllLocations = async (page: number) => {
    const res = await fetch(`${this.apiBase}/location?page=${page}`);
    const data = await res.json();
    return data.results;
  };

  getLocation = async (id: string) => {
    const res = await fetch(`${this.apiBase}/location/${id}`);
    const data = await res.json();
    return data;
  };

  getAllEpisodes = async (page: number) => {
    const res = await fetch(`${this.apiBase}/episode?page=${page}`);
    const data = await res.json();
    return data.results;
  };

  getEpisode = async (id: string) => {
    const res = await fetch(`${this.apiBase}/episode/${id}`);
    const data = await res.json();
    return data;
  };

  getData = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
}

export default RickAndMortyService;
