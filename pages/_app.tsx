import { PokeProvider } from "../contexts/pokeContext";
import { MyAppProps } from "../interface";
import "../styles/globals.css";
function MyApp({ Component, pageProps, list }: MyAppProps) {
  return (
    <PokeProvider data={list}>
      <Component {...pageProps} />
    </PokeProvider>
  );
}

MyApp.getInitialProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let list = await Promise.all(
    data.results.map(async (pokemon: any) => {
      let pokemons = [];
      let res = await fetch(pokemon.url);
      let data = await res.json();
      pokemons.push(data);

      return pokemons;
    })
  );

  return { list };
};

export default MyApp;
