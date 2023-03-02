import React, { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { AppContext } from "../contexts/app.context";

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const { getPokemon } = useContext(AppContext);

  useEffect(() => {
    handleFetch(url);
  }, [url]);

  async function handleFetch(urlLink) {
    await fetch(urlLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCount(data.count);
        setNext(data.next);
        setPrev(data.previous);
        setPokemons([...data.results]);
      })
      .catch((err) => console.log(err));
  }

  return (
    <main>
      <section>
        <header>
          <Link to="/">
            <h1 className="text-red-500">{count}</h1>
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-2 p-5 content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemons.length > 0 &&
            pokemons.map((pokemon) => (
              <Link to={`/pokemon/${pokemon.name}`}>
                <div
                  className="border border-1 rounded-sm p-2 flex flex-col items-center"
                  onClick={() => getPokemon(pokemon.url)}
                >
                  <img
                    src={`https://img.pokemondb.net/artwork/avif/${pokemon.name}.avif`}
                    className="h-[200px] w-[200px] object-contain"
                  />
                  <h1 className="my-2 text-lg capitalize">{pokemon.name}</h1>
                  {/* <p>{pokemon.url}</p> */}
                </div>
              </Link>
            ))}
        </div>
      </section>
      <section>
        {prev && <button onClick={() => setUrl(prev)}>Prev</button>}
        {next && <button onClick={() => setUrl(next)}>Next</button>}
      </section>
    </main>
  );
}

export default Pokemons;
