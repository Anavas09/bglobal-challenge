import Image from "next/image";
import React from "react";
import { usePokemonContext } from "../../contexts/pokeContext";
import styles from "../../styles/Home.module.css";

const pokeTypeColors: any = {
  bug: "#A8B623",
  dark: "#5D5D5D",
  dragon: "#8B6AC9",
  electric: "#EAD246",
  fairy: "#E6AADE",
  fighting: "#B53932",
  fire: "#F7822D",
  flying: "#A992E3",
  ghost: "#725796",
  grass: "#8BC34A",
  ground: "#D6C180",
  ice: "#90C9E9",
  normal: "#9E997B",
  poison: "#A34297",
  psychic: "#F15C85",
  rock: "#B9A049",
  steel: "#B8B7D2",
  water: "#748FD6",
};

const convertInchesToFeet = (value: number) => {
  var feet = Math.floor(value / 12);
  var inches = value % 12;
  return feet + "'" + inches + '"';
};

const PokemonDetail = () => {
  const { pokemonClass } = usePokemonContext();

  const pokemonDetail = pokemonClass.detail;

  const pokemonWeight =
    Math.round((pokemonDetail.weight / 4.5 + Number.EPSILON) * 100) / 100;

  const pokemonHeight = convertInchesToFeet(
    Math.round(pokemonDetail.height * 3.937)
  );

  const pokemonHeightMeters = () => {
    if (pokemonDetail.height / 10 < 1) {
      return `${pokemonDetail.height * 10}cm`;
    } else {
      return `${pokemonDetail.height / 10}m`;
    }
  };

  return (
    <div
      className={styles.detailContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.controllsContainer}>
        {pokemonDetail?.id - 1 > 0 ? (
          pokemonDetail?.id - 1 < pokemonClass.count ? (
            <span
              key={pokemonDetail?.id - 1}
              className={styles.controlls}
              id={`${pokemonDetail?.id - 1}`}
              onClick={(e: any) => pokemonClass.setNewDetail(e)}
            >
              Anterior
            </span>
          ) : (
            <span />
          )
        ) : (
          <span />
        )}

        <div className={styles.detail}>
          <div className={styles.detailImg}>
            <Image
              alt="pokemon"
              src={pokemonDetail.sprites.other.home.front_default}
              width="350px"
              height="350px"
            />
          </div>
          <div>
            <h1 className={styles.detailTitle}>
              <em>{pokemonDetail.name}</em>{" "}
              {pokemonClass.customId(pokemonDetail?.id)}
            </h1>
            <div className={styles.detailInfo}>
              <div>
                <h5>Height:</h5>
                <p>{`${pokemonHeight} (${pokemonHeightMeters()})`}</p>
                <h5>Weight:</h5>
                <p>{`${pokemonWeight}lbs (${pokemonDetail.weight / 10}kg)`}</p>
              </div>
              <div>
                <h5>Type:</h5>
                {pokemonDetail.types.map((type: any, i: number) => {
                  let color = pokeTypeColors[type.type.name];

                  return (
                    <span
                      key={i}
                      className={styles.type}
                      style={{ backgroundColor: color }}
                    >
                      {type.type.name}
                    </span>
                  );
                })}
                <h5>Abilities:</h5>
                {pokemonDetail.abilities.map((ability: any, i: number) => (
                  <p className={styles.abilityName} key={i}>
                    {ability.ability.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {pokemonDetail?.id + 1 > 0 ? (
          pokemonDetail?.id + 1 < pokemonClass.count ? (
            <span
              key={pokemonDetail?.id + 1}
              className={styles.controlls}
              id={pokemonDetail?.id + 1}
              onClick={(e: any) => pokemonClass.setNewDetail(e)}
            >
              Siguiente
            </span>
          ) : (
            <span />
          )
        ) : (
          <span />
        )}
      </div>

      <button onClick={() => pokemonClass.setDetail(false)}>Volver</button>
    </div>
  );
};

export default PokemonDetail;
