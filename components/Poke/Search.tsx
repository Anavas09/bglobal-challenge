import { ChangeEvent } from "react";
import { SearchProps } from "../../interface";
import styles from "../../styles/Home.module.css";

const Search = ({ setPokemonName }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  return (
    <div className={styles.searcher}>
      <div className={styles.form__group}>
        <input
          type="text"
          className={styles.form__input}
          id="name"
          placeholder="Buscar Pokemon..."
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default Search;
