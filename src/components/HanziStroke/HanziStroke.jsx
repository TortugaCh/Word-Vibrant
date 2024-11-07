import HanziWriter from "hanzi-writer";

const HanziStroke = ({ word }) => {
  const getHanzi = async () => {
    document.getElementById("character-target-div").innerHTML = "";

    const writer = HanziWriter.create("character-target-div", word, {
      width: 150, // Increased size for visibility
      height: 150,
      padding: 10,
      showOutline: true,
    });
    writer.animateCharacter();
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <div
        id="character-target-div"
        className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center p-6"
        style={{ width: 180, height: 180 }}
      ></div>
      <button
        onClick={getHanzi}
        className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
      >
        Get Stroke
      </button>
    </div>
  );
};

export default HanziStroke;
