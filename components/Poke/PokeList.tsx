import PokemonCard from "./PokeCard";
import styles from "../../styles/Home.module.css";
import { PokemonListProps } from "../../interface";

const PokemonList = ({ data }: PokemonListProps) => {
  return (
    <div className={styles.grid}>
      {data &&
        data.map((pokemon: any, i) => (
          <PokemonCard key={i} pokemon={pokemon[0]} />
        ))}
    </div>
  );
};

export default PokemonList;
