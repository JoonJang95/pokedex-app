// -------------------------------------------------------------------------
// Pokemon Data Queries Helper Functions
// -------------------------------------------------------------------------

// ---------------- Pokemon Species Description Query  ---------------------

const get_pokemonSpeciesDescription_query = async function (pokemonSpeciesURL) {
  try {
    const pokemonSpeciesResponseBody = await fetch(pokemonSpeciesURL);
    const pokemonSpecies = await pokemonSpeciesResponseBody.json();

    const englishSpeciesEntry = pokemonSpecies.flavor_text_entries.find(
      (entry) => (entry.language.name === "en" ? entry.flavor_text : "")
    );

    const queryResponse = englishSpeciesEntry.flavor_text;

    return queryResponse;
  } catch (err) {
    console.error(`There was an error fetching pokemon species: ${err}`);

    const emptyQueryResponse = "";

    return emptyQueryResponse;
  }
};

// --------------------- Pokemon Meta Data Query  --------------------------

const get_PokemonData_query = async function (pokemonDataURL, signal) {
  try {
    const pokemonDataResponseBody = await fetch(pokemonDataURL, { signal });
    const pokemonData = await pokemonDataResponseBody.json();

    const queryResponse = {
      id: pokemonData.id,
      name: pokemonData.name,
      type: pokemonData.types[0].type.name,
      spriteImageURL:
        pokemonData.sprites.other["official-artwork"].front_default,
      speciesURL: pokemonData.species.url,
    };

    return queryResponse;
  } catch (err) {
    console.error(`There was an error fetching pokemon data: ${err}`);

    const emptyQueryResponse = {
      id: null,
      name: "",
      type: "",
      spriteImageURL: "",
      speciesURL: "",
    };

    return emptyQueryResponse;
  }
};

// ------------------ Pokemon Data Store Refs Query  -----------------------

const get_PokemonDataStoreRefs_query = async function (
  pokemonDataStoreRefsURL,
  signal
) {
  try {
    const pokemonDataStoreRefsResponseBody = await fetch(
      pokemonDataStoreRefsURL,
      { signal }
    );
    const { results, next, previous } =
      await pokemonDataStoreRefsResponseBody.json();

    const queryResponse = {
      pokemonDataStoreRefs: results,
      nextPokemonDataStoreRefsURL: next,
      prevPokemonDataStoreRefsURL: previous,
    };

    return queryResponse;
  } catch (err) {
    console.error(
      `There was an error fetching the pokemon data store refs: ${err}`
    );

    const emptyQueryResponse = {
      pokemonDataStoreRefs: [],
      nextPokemonDataStoreRefsURL: null,
      prevPokemonDataStoreRefsURL: null,
    };

    return emptyQueryResponse;
  }
};

export {
  get_PokemonData_query,
  get_PokemonDataStoreRefs_query,
  get_pokemonSpeciesDescription_query,
};
