import "./style.css";

function Logo() {
  return (
    <figure className={"logo"}>
      <figcaption>
        <span>
          <i style={{ fontFamily: "Gill Sans", color: "#bdc6d4" }}>TAPCART</i>{" "}
        </span>
        <span>
          <b style={{ fontFamily: "Comic Sans MS" }}>
            <span style={{ color: "#7b1e57" }}>C</span>
            <span style={{ color: "#56527d" }}>O</span>
            <span style={{ color: "#7d9273" }}>L</span>
            <span style={{ color: "#c4c470" }}>O</span>
            <span style={{ color: "#27619d" }}>R</span>
          </b>
        </span>
      </figcaption>
    </figure>
  );
}

export default Logo;
