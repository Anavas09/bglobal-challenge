import { useState, useCallback } from "react";

export const getPokemons = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const useGetPokemons = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async () => {
    try {
      setIsLoading(true);
      const pokemons = await getPokemons(url);
      setData(pokemons);
      return pokemons;
    } catch (e) {
      setError(e);
      setIsLoading(false);
      throw e;
    }
  };

  return {
    isLoading,
    error,
    data,
    getPokemons: useCallback(execute, [url]), // to avoid infinite calls when inside a `useEffect`
  };
};

export const searchPokemon = async (nombrePokemon) => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + nombrePokemon.toLowerCase()
  );
  const data = await res.json();

  return data;
};

export const useSearchPokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [datakk, setData] = useState(null);

  const execute = async (searchValue, options = {}) => {
    try {
      setIsLoading(true);
      const pokemon = await searchPokemon(searchValue, options);
      setData(pokemon);
      return pokemon;
    } catch (e) {
      setError(e);
      setIsLoading(false);
      throw e;
    }
  };

  return {
    isLoading,
    error,
    datakk,
    getPokemon: useCallback(execute, []), // to avoid infinite calls when inside a `useEffect`
  };
};
