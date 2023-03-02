import { Route, Routes } from "react-router-dom";
import Pokemon from "./components/pages.pokemon";
import Pokemons from "./components/pages.pokemons";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/pokemon/:pokemon" element={<Pokemon />} />
      </Routes>
    </main>
  );
}

export default App;
