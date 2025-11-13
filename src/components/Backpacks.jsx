import pokeBallImg from "../images/pokeball-310px.png";

export default function Backpacks({ currentScore }) {
  const divNumberArray1 = [1, 2, 3, 4, 5, 6];
  const divNumberArray2 = [7, 8, 9, 10, 11, 12];

  function Div({ content, border }) {
    const divStyle = {
      border: border,
    };

    return <div style={divStyle}>{content}</div>;
  }

  return (
    <div className="backpacks-div">
      <h2>Backpacks:</h2>
      <div className="backpack-wrapper">
        <div className="backpack">
          {divNumberArray1.map((number) => {
            let contents = null;
            let border = "2px dashed black";
            if (number <= currentScore) {
              contents = (
                <img
                  src={pokeBallImg}
                  alt="Pokeball icon."
                  width={36}
                  height={36}
                />
              );
              border = "none";
            }

            return <Div key={number} content={contents} border={border} />;
          })}
        </div>
        <div className="backpack">
          {divNumberArray2.map((number) => {
            let contents = null;
            let border = "2px dashed black";
            if (number <= currentScore) {
              contents = (
                <img
                  src={pokeBallImg}
                  alt="Pokeball icon."
                  width={36}
                  height={36}
                />
              );
              border = "none";
            }

            return <Div key={number} content={contents} border={border} />;
          })}
        </div>
      </div>
    </div>
  );
}
