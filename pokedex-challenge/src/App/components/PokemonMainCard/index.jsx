import { pokemonTypeIconsURLs } from "../../pages/utils/constants";
import "./style.css";

function PokemonMainCard({ selectedPokemonPreviewCard }) {
  const { id, name, type, spriteImageURL, speciesDescription } =
    selectedPokemonPreviewCard;

  return (
    <section className={"pokemon-main-display-section"}>
      <div className={"pokemon-main-display-container"}>
        <figure className={"pokemon-main-display-card"}>
          <p className={"pokemon-main-display-id"}>{`#${id}`}</p>
          <div className={"pokemon-main-display-type-icon-container"}>
            <img
              className={"pokemon-main-display-type-icon"}
              src={pokemonTypeIconsURLs[type]}
              alt={"pokemon type icon"}
            />
          </div>
          <img
            className={"pokemon-main-display-image"}
            src={spriteImageURL}
            alt={"pokemon sprite"}
          />
          <figcaption>
            <h2>{name}</h2>
            <p>{speciesDescription}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default PokemonMainCard;
