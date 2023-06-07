import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './assets/component/Card';
import PokeInfo from './assets/component/PokeInfo';

function App() {
  const [pokemondata, setPokemonData] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokeDex,setPokeDex]=useState();
  

  const pokeFun = async () => {
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
    console.log(res)
  };
  
  const getPokemon = async (res) => {
    const pokemonPromises = res.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });

    const pokemonDataArray = await Promise.all(pokemonPromises);
    const updatedPokemonData = [...pokemondata, ...pokemonDataArray];
    updatedPokemonData.sort((a, b) => a.id > b.id ? 1 : -1);
    setPokemonData(updatedPokemonData);
    setDataFetched(true);
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  if (!dataFetched) {
    return null; // Render nothing until data is fetched
  }

  if (pokemondata.length === 0) {
    return null; // Render nothing until data is fetched
  }

 

  return (
    <>
      <div className="bg-fixed" style={{ backgroundImage: "url('../src/assets/bg.webp')" }}>
      <div className="min-h-screen  flex flex-col items-center px-4">
        <img src="../src/assets/logo.png" alt="" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pokemondata.map((poke, index) => (
            <Card data={poke} key={index} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 py-5">
        {prevUrl && (
          <button
          className='rounded-md text-red-600 border border-red-600 px-4 py-2 font-semibold'
            onClick={() => {
              setPokemonData([]);
              setDataFetched(false);
              setLoading(true);
              setUrl(prevUrl);
            }}
          >
            Previous
          </button>
        )}

        {nextUrl && (
          <button
          className='rounded-md text-white bg-red-600 px-4 py-2 font-semibold'
            onClick={() => {
              setPokemonData([]);
              setDataFetched(false);
              setLoading(true);
              setUrl(nextUrl);
            }}
          >
            Next
          </button>
        )}
      </div>
      </div>
    </>
  );
}

export default App;
