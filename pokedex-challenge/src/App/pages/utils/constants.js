import bugTypeIcon from "./images/pokemonTypes/Icon_Bug.png";
import darkTypeIcon from "./images/pokemonTypes/Icon_Dark.png";
import dragonTypeIcon from "./images/pokemonTypes/Icon_Dragon.png";
import electricTypeIcon from "./images/pokemonTypes/Icon_Electric.png";
import fairyTypeIcon from "./images/pokemonTypes/Icon_Fairy.png";
import fightingTypeIcon from "./images/pokemonTypes/Icon_Fighting.png";
import fireTypeIcon from "./images/pokemonTypes/Icon_Fire.png";
import flyingTypeIcon from "./images/pokemonTypes/Icon_Flying.png";
import ghostTypeIcon from "./images/pokemonTypes/Icon_Ghost.png";
import grassTypeIcon from "./images/pokemonTypes/Icon_Grass.png";
import groundTypeIcon from "./images/pokemonTypes/Icon_Ground.png";
import iceTypeIcon from "./images/pokemonTypes/Icon_Ice.png";
import normalTypeIcon from "./images/pokemonTypes/Icon_Normal.png";
import poisonTypeIcon from "./images/pokemonTypes/Icon_Poison.png";
import psychicTypeIcon from "./images/pokemonTypes/Icon_Psychic.png";
import rockTypeIcon from "./images/pokemonTypes/Icon_Rock.png";
import steelTypeIcon from "./images/pokemonTypes/Icon_Steel.png";
import waterTypeIcon from "./images/pokemonTypes/Icon_Water.png";

// -------------------------------------------------------------------
// Pokemon Types Map
// -------------------------------------------------------------------

const pokemonTypeIconsURLs = {
  bug: bugTypeIcon,
  dark: darkTypeIcon,
  dragon: dragonTypeIcon,
  electric: electricTypeIcon,
  fairy: fairyTypeIcon,
  fighting: fightingTypeIcon,
  fire: fireTypeIcon,
  flying: flyingTypeIcon,
  ghost: ghostTypeIcon,
  grass: grassTypeIcon,
  ground: groundTypeIcon,
  ice: iceTypeIcon,
  normal: normalTypeIcon,
  poison: poisonTypeIcon,
  psychic: psychicTypeIcon,
  rock: rockTypeIcon,
  steel: steelTypeIcon,
  water: waterTypeIcon,
};

// -------------------------------------------------------------------
// Pokemon API URLs
// -------------------------------------------------------------------

const pokemonURLs = {
  getPokemonDataStoreRefsURL: function (offset, limit) {
    return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  },
};

export { pokemonTypeIconsURLs, pokemonURLs };
