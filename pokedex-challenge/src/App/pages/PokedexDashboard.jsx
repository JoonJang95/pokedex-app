import { useMemo, useCallback } from "react";
import PokemonPreviewCard from "../components/PokemonPreviewCard";
import PokemonMainCard from "../components/PokemonMainCard";
import PokemonList from "../components/PokemonList";
import Logo from "../components/Logo";

import usePokemonData from "./utils/hooks/usePokemonData";
import "./style.css";

function PokedexDashboard() {
  // -------------------------------------------------------------------------
  // PokedexDashboard - usePokemonData Hook (Pokemon Data Handling)
  // -------------------------------------------------------------------------
  const {
    pokemonDataList,
    removePokemonFromList,
    selectedPokemonPreviewCard,
    selectPokemonPreviewCard,
    prevPokedexPage,
    nextPokedexPage,
    goToPrevPokedexPage,
    goToNextPokedexPage,
  } = usePokemonData();

  // -------------------------------------------------------------------------
  // PokemonDashboard - Helper React Components (Involving Pokemon Data)
  // -------------------------------------------------------------------------

  // ------------------- PokemonList Child Component Props -------------------

  // Using useCallback here to leverage this as a JSX component
  const PokemonPreviewCards = useCallback(
    () => (
      <>
        {pokemonDataList.map(
          (
            { status, value: { id, type, name, spriteImageURL, speciesURL } },
            index
          ) =>
            status === "fulfilled" && (
              <li key={`list-item-${id}`}>
                <PokemonPreviewCard
                  key={`pokemon-${id}`}
                  id={id}
                  spriteImageURL={spriteImageURL}
                  selectedPokemonCardId={selectedPokemonPreviewCard.id}
                  removePokemonPreviewCard={() => removePokemonFromList(index)}
                  selectPokemonPreviewCard={() =>
                    selectPokemonPreviewCard({
                      id,
                      type,
                      name,
                      spriteImageURL,
                      speciesURL,
                    })
                  }
                />
              </li>
            )
        )}
      </>
    ),
    // No need to put selectPokemonPreviewCard in dependency array since it'll always be re-recreated on every
    // re-render and that will cause unnecessary useEffect triggers
    [pokemonDataList, selectedPokemonPreviewCard]
  );

  const NextPokedexPageButton = useMemo(
    () =>
      nextPokedexPage && <button onClick={goToNextPokedexPage}>Next</button>,
    // No need to put goToNextPokedexPage in dependency array since it'll always be re-recreated on every
    // re-render and that will cause unnecessary useEffect triggers
    [nextPokedexPage]
  );

  const PrevPokedexPageButton = useMemo(
    () =>
      prevPokedexPage && <button onClick={goToPrevPokedexPage}>Prev</button>,
    // No need to put goToPrevPokedexPage in dependency array since it'll always be re-recreated on every
    // re-render and that will cause unnecessary useEffect triggers
    [prevPokedexPage]
  );

  // -------------------------------------------------------------------------
  // PokemonDashboard - Return JSX Elements
  // -------------------------------------------------------------------------

  return (
    <main>
      <article className={"pokedex_display"}>
        <PokemonList
          nextPokedexPageButton={NextPokedexPageButton}
          prevPokedexPageButton={PrevPokedexPageButton}
        >
          <PokemonPreviewCards />
        </PokemonList>
        <PokemonMainCard
          selectedPokemonPreviewCard={selectedPokemonPreviewCard}
        />
      </article>
      <section>
        <Logo />
      </section>
    </main>
  );
}

export default PokedexDashboard;
