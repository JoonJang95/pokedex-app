import "./style.css";

function PokemonPreviewCard({
  id,
  spriteImageURL,
  removePokemonPreviewCard,
  selectedPokemonCardId,
  selectPokemonPreviewCard,
}) {
  return (
    <figure
      draggable
      style={{
        backgroundColor:
          selectedPokemonCardId === id ? "rgb(152,251,152, 0.9)" : null,
      }}
      className={`pokemon-preview-card`}
    >
      <figcaption>{`#${id}`}</figcaption>
      <div className={"pokemon-preview-content"}>
        <img src={spriteImageURL} alt={"pokemon sprite"} />
        <div className={"pokemon-preview-card-buttons-container"}>
          <button
            onClick={selectPokemonPreviewCard}
            style={{ backgroundColor: "rgb(79,134,247, 0.75)" }}
          >
            View
          </button>
          <button
            onClick={removePokemonPreviewCard}
            style={{ backgroundColor: "rgba(255, 90, 96, 0.75)" }}
          >
            Remove
          </button>
        </div>
      </div>
    </figure>
  );
}

export default PokemonPreviewCard;
