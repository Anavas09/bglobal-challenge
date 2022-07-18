import { createContext, useContext, useState } from "react";
import { useGetPokemons, useSearchPokemon } from "../api";

const Context = createContext();

export const usePokemonContext = () => useContext(Context);

const pokemonClass = {};

export function PokeProvider({ children, data }) {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
  );
  const [detail, setDetail] = useState(false);
  const [pokemons, setPokemons] = useState(data);
  const [count, setCount] = useState(1118);
  const { getPokemon } = useSearchPokemon();
  const { getPokemons } = useGetPokemons(url);

  pokemonClass.pokemons = pokemons;
  pokemonClass.detail = detail;
  pokemonClass.setDetail = setDetail;
  pokemonClass.count = count;

  //Setea los pokemons obtenidos desde la api
  pokemonClass.setBaseData = () => {
    setPokemons(data);
  };

  //Obtiene los pokemons de la api
  pokemonClass.getPokemons = async () => {
    const data = await getPokemons();
    setCount(data.count);
    setUrl(data.next ? data.next : null);

    let list = await Promise.all(
      data.results.map(async (pokemon) => {
        let pokemons = [];
        let pokemonRes = await fetch(pokemon.url);
        let pokemonData = await pokemonRes.json();
        pokemons.push(pokemonData);

        return pokemons;
      })
    );

    setPokemons([...pokemons, ...list]);

    return data.results;
  };

  //Obtiene un pokemon en especifico
  pokemonClass.getPokemon = async (nombrePokemon) => {
    if (nombrePokemon.length >= 3) {
      let pokemon;
      try {
        const data = await getPokemon(nombrePokemon);
        setUrl("https://pokeapi.co/api/v2/pokemon");
        setPokemons([[data]]);
        pokemon = data;
      } catch (err) {
        console.error("Error: Pokemon no encontrado", err);
      }

      return pokemon;
    }
  };

  //Retorna un id de la fomra #00{id}
  pokemonClass.customId = (id) => {
    let customId;
    id ? (customId = ("#00" + id).slice(-4)) : null;

    return customId;
  };

  //Setea las caracteristicas o detalles de cada pokemon
  pokemonClass.setNewDetail = (e) => {
    e.stopPropagation();
    const id = e.target.id;
    pokemons.find((pokemon) => pokemon[0].id == id)
      ? pokemonClass.setDetail(
          pokemons.find((pokemon) => pokemon[0].id == id)[0]
        )
      : pokemonClass.getPokemons();
  };

  return (
    <Context.Provider value={{ pokemonClass }}>{children}</Context.Provider>
  );
}
