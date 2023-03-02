import React, { createContext, useReducer, useCallback, useMemo } from "react";
import { AppReducer, InitialState } from "./app.reducer";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [pokemons, dispatch] = useReducer(AppReducer, InitialState);

  const getPokemon = useCallback((url) => {
    dispatch({ type: "getPokemon", payload: url });
  }, []);

  const value = useMemo(
    () => ({ pokemons, getPokemon }),
    [pokemons, getPokemon]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
