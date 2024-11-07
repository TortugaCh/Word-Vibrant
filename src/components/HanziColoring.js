import HanziWriter from "hanzi-writer";

const HanziColoring = ({ word }) => {
  const getHanziOutline = () => {
    document.getElementById("coloring-target-div").innerHTML = "";

    const writer = HanziWriter.create("coloring-target-div", word, {
      width: 150,
      height: 150,
      padding: 5,
      showOutline: true,
      showCharacter: false,
      delayBetweenStrokes: 2000, // Keeps the outline visible for coloring
      outlineColor: "#333",
    });
    writer.showOutline();
  };

  return (
    <div>
      <div id="coloring-target-div" />
      <button
        onClick={getHanziOutline}
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
      >
        Start Coloring
      </button>
    </div>
  );
};

export default HanziColoring;
