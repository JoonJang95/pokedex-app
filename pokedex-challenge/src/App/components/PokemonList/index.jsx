import "./style.css";

function PokemonList({
  children,
  nextPokedexPageButton,
  prevPokedexPageButton,
}) {
  return (
    <section className={"pokemon-list-section"}>
      <ol className={"pokemon-list-container"}>{children}</ol>
      <div className={"pokemon-list-pagination-buttons-container"}>
        {prevPokedexPageButton}
        {nextPokedexPageButton}
      </div>
    </section>
  );
}

export default PokemonList;
