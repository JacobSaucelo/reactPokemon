export const AppReducer = (state, action) => {
  switch (action.type) {
    case "getPokemon":
      return { ...state, url: action.payload };
    default:
      return state;
  }
};

export const InitialState = {
  url: "",
};
