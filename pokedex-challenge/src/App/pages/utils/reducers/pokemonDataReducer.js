import _ from "lodash";

// -------------------------------------------------------------------------
// Pokemon Data Reducer Function
// -------------------------------------------------------------------------

export const pokemonDataReducer = function (state, action) {
  switch (action.type) {
    case "SET_POKEMON_DATA_LIST": {
      const pokemonDataList = action.payload;

      return pokemonDataList;
    }
    case "REMOVE_POKEMON_FROM_LIST": {
      const indexOfPokemonToRemove = action.payload;

      // Make sure to copy state to not mutate the state object directly
      const pokemonDataListCopy = _.cloneDeep(state);

      // Remove the pokemon from the list state
      pokemonDataListCopy.splice(indexOfPokemonToRemove, 1);

      return pokemonDataListCopy;
    }
    // Future Tasks: Can add in more dispatch methods
    // (e.g. - add Pokemon to list, swap Pokemon position, etc)
    default:
      throw new Error("There was an error with the dispatch request");
  }
};
