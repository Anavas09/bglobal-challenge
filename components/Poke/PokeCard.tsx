import Image from "next/image";
import { usePokemonContext } from "../../contexts/pokeContext";
import { Pokemon } from "../../interface";
import styles from "../../styles/Home.module.css";

const PokemonCard = ({ pokemon }: Pokemon) => {
  const { pokemonClass } = usePokemonContext();

  return (
    <div
      onClick={() => pokemonClass.setDetail(pokemon)}
      className={styles.card}
    >
      <Image
        alt="pokemon"
        src={pokemon.sprites.other.home.front_default}
        width="200px"
        height="200px"
      />
      <div className={styles.cardFooter}>
        <h2>{pokemon.name}</h2>
        <p>{pokemonClass.customId(pokemon?.id)}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
