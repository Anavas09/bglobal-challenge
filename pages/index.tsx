import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import PokemonDetail from "../components/Poke/PokeDetails";
import PokemonList from "../components/Poke/PokeList";
import Search from "../components/Poke/Search";
import Modal from "../components/Modal/Modal";

import { usePokemonContext } from "../contexts/pokeContext";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { pokemonClass } = usePokemonContext();
  const [pokemonName, setPokemonName] = useState("");

  useEffect(() => {
    pokemonName
      ? pokemonClass.getPokemon(pokemonName)
      : pokemonClass.setBaseData();

    //Cuando se llega al final de la pantalla, carga mas datos
    //en este caso, 20 mas
    window.onscroll = (e: any) => {
      const pageEnd =
        e.target.documentElement.scrollHeight -
          e.target.documentElement.scrollTop <=
        e.target.documentElement.clientHeight;
      if (pokemonClass.pokemons.length > 1) {
        pageEnd && pokemonClass.getPokemons();
      }
    };
  }, [pokemonName, pokemonClass]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <Search setPokemonName={setPokemonName} />

      <PokemonList data={pokemonClass.pokemons} />

      {pokemonClass.detail ? (
        <Modal
          show={pokemonClass.detail}
          onClose={() => pokemonClass.setDetail(false)}
        >
          <PokemonDetail />
        </Modal>
      ) : null}
    </div>
  );
};

export default Home;
