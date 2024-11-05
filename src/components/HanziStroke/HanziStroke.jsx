import HanziWriter from "hanzi-writer";
const HanziStroke = ({ word }) => {
  const getHanzi = async () => {
    document.getElementById("character-target-div").innerHTML = "";

    var writer = HanziWriter.create("character-target-div", word, {
      width: 100,
      height: 100,
      padding: 5,
    //   showCharacter: false,
      showOutline: true,
    });
    writer.animateCharacter();
  };
  return (
    <div>
      <div id="character-target-div"></div>
      <button onClick={getHanzi}>Get Hanzi</button>
    </div>
  );
};

export default HanziStroke;
