import { useReducer, useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";

// Utils - Helper functions imports
import { pokemonURLs } from "../constants";
import { pokemonDataReducer } from "../reducers/pokemonDataReducer";
import {
  get_PokemonData_query,
  get_PokemonDataStoreRefs_query,
  get_pokemonSpeciesDescription_query,
} from "../helpers/pokemonDataQueries";

// -------------------------------------------------------------------------
// Custom hook to manage the state of the pokemon data
// -------------------------------------------------------------------------

// Planning to tell the candidates to make an initial query where the limit is 9 & offset is 243
const initialPokedexOffset = 243;
const pokemonQueryLimit = 9;

const initialPokedexPageURL = pokemonURLs.getPokemonDataStoreRefsURL(
  initialPokedexOffset,
  pokemonQueryLimit
);

function usePokemonData() {
  // -------------------------------------------------------------------------
  // usePokemonData - React useReducer Hooks
  // -------------------------------------------------------------------------
  const [pokemonDataList, dispatchPokemonData] = useReducer(
    pokemonDataReducer,
    []
  );

  // -------------------------------------------------------------------------
  // usePokemonData - React useState Hooks
  // -------------------------------------------------------------------------

  const [currentPokedexPage, setCurrentPokedexPage] = useState(
    initialPokedexPageURL
  );
  const [prevPokedexPage, setPrevPokedexPage] = useState(null);
  const [nextPokedexPage, setNextPokedexPage] = useState(null);

  const [selectedPokemonPreviewCard, setSelectedPokemonPreviewCard] = useState({
    id: 244,
    name: "entei",
    type: "fire",
    spriteImageURL:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/244.png",
    speciesDescription:
      "Volcanoes erupt when it barks. Un­ able to restrainits extreme power, it races headlong around the land.",
  });

  // -------------------------------------------------------------------------
  // pokemonDataReducer - Helper Functions (Involving React Hooks)
  // -------------------------------------------------------------------------

  // -------------- Exportable Pokemon Data Dispatch Methods -----------------

  const setPokemonDataList = function (pokemonDataList) {
    dispatchPokemonData({
      type: "SET_POKEMON_DATA_LIST",
      payload: pokemonDataList,
    });
  };

  const removePokemonFromList = function (pokemonIndex) {
    dispatchPokemonData({
      type: "REMOVE_POKEMON_FROM_LIST",
      payload: pokemonIndex,
    });
  };

  // ---------- Exportable Pokemon Card Selection Handler Methods ------------
  const selectPokemonPreviewCard = async function (pokemonData) {
    const { id, name, type, spriteImageURL, speciesURL } = pokemonData;

    const speciesDescription = await get_pokemonSpeciesDescription_query(
      speciesURL
    );

    setSelectedPokemonPreviewCard({
      id,
      name,
      type,
      spriteImageURL,
      speciesDescription,
    });
  };

  // --------------- Exportable Pokedex Page Handler Methods -----------------

  const goToNextPokedexPage = function () {
    setCurrentPokedexPage(nextPokedexPage);
  };

  const goToPrevPokedexPage = function () {
    setCurrentPokedexPage(prevPokedexPage);
  };

  // ------------------- Pokemon Data Fetch Queries --------------------------

  // generate a list of pokemon meta data from mapping data store reference urls
  const fetchPokemonDataList = async function (
    pokemonDataStoreRefsURL,
    signal
  ) {
    const {
      pokemonDataStoreRefs,
      nextPokemonDataStoreRefsURL,
      prevPokemonDataStoreRefsURL,
    } = await get_PokemonDataStoreRefs_query(pokemonDataStoreRefsURL, signal);

    const pokemonDataListPromises = pokemonDataStoreRefs.map(
      ({ url: pokemonDataURL }) => get_PokemonData_query(pokemonDataURL, signal)
    );

    let pokemonDataList = [];

    try {
      // Leveraging Promise.allSettled instead of Promise.all b/c even if there are some failed
      // requests for pokemon meta data, we still want to display all the pokemon
      // that did have successful data retrievals
      pokemonDataList = await Promise.allSettled(pokemonDataListPromises);
    } catch (err) {
      console.error(
        `There was an error resolving the pokemonDataList promises: ${err}`
      );
    }

    // pokemonDataList, previous, & next page URL states updates are grouped into a batch update to optimize
    // re-renders. This is b/c in React 17 (In version 18, React auto batches all state updates),
    // each state updates in async requests trigger re-renders.
    unstable_batchedUpdates(() => {
      setNextPokedexPage(nextPokemonDataStoreRefsURL);
      setPrevPokedexPage(prevPokemonDataStoreRefsURL);
      setPokemonDataList(pokemonDataList);
    });
  };

  // -------------------------------------------------------------------------
  // usePokemonData - React useEffects
  // -------------------------------------------------------------------------

  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;

    fetchPokemonDataList(currentPokedexPage, signal);
    // TODO: add in logic to prevent state updates on aborted signals & check if signal works
    return function cleanup() {
      fetchController.abort();
    };
    // No need to put fetchPokemonData in dependency array since it'll always be re-recreated on every
    // re-render and that will cause unnecessary useEffect triggers
  }, [currentPokedexPage]);

  return {
    pokemonDataList,
    setPokemonDataList,
    removePokemonFromList,
    selectedPokemonPreviewCard,
    selectPokemonPreviewCard,
    nextPokedexPage,
    prevPokedexPage,
    goToNextPokedexPage,
    goToPrevPokedexPage,
  };
}

export default usePokemonData;
