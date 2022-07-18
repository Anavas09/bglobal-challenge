import { AppProps } from "next/app";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type MyAppProps = AppProps & {
  list: object[];
};

export type ModalProps = {
  children: ReactNode;
  onClose: any;
  show: boolean;
  title?: string;
};

export type Pokemon = {
  pokemon: {
    id: number;
    name: string;
    sprites?: any;
  };
};

export type PokemonCard = {
  pokemon: Pokemon;
};

export type PokemonListProps = {
  data: Pokemon[];
};

export type SearchProps = {
  setPokemonName: Dispatch<SetStateAction<string>>;
};
