import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/app.context";

function Pokemon() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  let { pokemon } = useParams();
  const { pokemons } = useContext(AppContext);

  useEffect(() => {
    handleFetch(pokemons.url);
  }, [pokemons.url]);

  async function handleFetch(urlLink) {
    setLoading(true);
    await fetch(urlLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }

  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;

  return (
    <main>
      <div>
        <img
          src={`https://img.pokemondb.net/artwork/avif/${pokemon}.avif`}
          alt={pokemon}
        />
      </div>
      <header>
        <h1>base Experience: {data.base_experience}</h1>
        <h1>
          abilities:{" "}
          {data.abilities.map((ability) => (
            <div>{ability.slot}</div>
          ))}
        </h1>
        <h1>height {data.height}</h1>
        <h1>id {data.id}</h1>
        <h1>name {data.name}</h1>
        <h1>
          stats{" "}
          {data.stats.map((stat) => (
            <div>
              <h1>base_stat: {stat.base_stat}</h1>
              <h1>stat: {stat.stat.name}</h1>
            </div>
          ))}
        </h1>
        <h1>weight {data.weight}</h1>
        <h1>
          types{" "}
          {data.types.map((type) => (
            <div>{type.type.name}</div>
          ))}
        </h1>
      </header>
      <div>
        {Object.values(data.sprites)
          .slice(0, 8)
          .map((image) => image && <img src={image} />)}
      </div>
      <div>
        {Object.values(
          data.sprites.versions["generation-v"]["black-white"].animated
        ).map((image) => image && <img src={image} />)}
      </div>
    </main>
  );
}

export default Pokemon;
