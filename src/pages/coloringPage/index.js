import { useState, useEffect, useRef } from "react";
import wordData from "../../data/wordData";
import HanziColoring from "../../components/HanziColoring";
import html2canvas from "html2canvas";
import HanziWriter from "hanzi-writer";
import { useRouter } from "next/router";
import { wordInputs } from "../../constants/constants";
import Words from "../../components/Words/Words";
import ReusableInput from "../../components/ReusableInput/ReusableInput";
import { fetchAllLookupData } from "../../lib/utils";

export default function ColoringPage() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome! I’m here to help you with Hanzi Coloring. Select a curriculum, grade, semester, and word type to get started!",
      sender: "bot",
    },
  ]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [curriculums, setCurriculums] = useState([]);
  const [grades, setGrades] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [wordTypes, setWordTypes] = useState([]);

  const [values, setValues] = useState({});
  const router = useRouter();

  const coloringRef = useRef(null);
  const coloringContainerRef = useRef(null);
  const downloadTargetRef = useRef(null);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllLookupData();
        if (res) {
          console.log("Fetched Lookup Data:", res);
          res.sort((a, b) => a.createdAt - b.createdAt);
          const curriculumsData = res.filter(
            (item) => item.type === "curriculum"
          );
          setCurriculums(curriculumsData);
          const gradesData = res.filter((item) => item.type === "grade");
          setGrades(gradesData);
          const semestersData = res.filter((item) => item.type === "semester");
          setSemesters(semestersData);
          const wordTypesData = res.filter((item) => item.type === "wordType");
          setWordTypes(wordTypesData);
        }
      } catch (error) {
        console.error("Error fetching lookup data:", error);
      }
    };

    fetchData();
  }, []);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    addMessage(`Displaying coloring outline for "${word.name}".`, "bot");
    setTimeout(() => {
      coloringRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 flex flex-col items-center overflow-hidden">
      <header className="bg-white shadow-md w-full fixed top-0 z-20 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            Hanzi Coloring Page
          </h1>
        </div>
      </header>

      <div className="fixed top-24 right-8 w-72 max-w-full bg-white rounded-3xl shadow-lg p-4 z-30">
        <h3 className="text-lg font-semibold text-purple-600 mb-2">
          Notifications
        </h3>
        <div className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-purple-300">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 mb-2 rounded-lg shadow-md text-purple-800 text-sm ${
                msg.sender === "bot"
                  ? "bg-gradient-to-r from-purple-100 to-purple-200"
                  : "bg-gradient-to-r from-blue-100 to-blue-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
            Select Options for Coloring
          </h2>
          <div className="flex flex-col gap-4">
            {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
              (input, index) => (
                <ReusableInput
                  input={input}
                  handleChange={handleChange}
                  index={index}
                />
              )
            )}
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <div className="font-bold text-lg text-purple-700">
              Available Words:
            </div>
            <Words
              curriculum={values["curriculum"]}
              grade={values["grade"]}
              wordType={values["wordType"]}
              semester={values["semester"]}
              handleFunc={handleSelectWord}
            />
          </div>
        </div>

        {selectedWord && (
          <div
            ref={coloringRef}
            className="w-full max-w-2xl mt-10 flex justify-center"
          >
            <button
              onClick={() => router.push(`/download/${selectedWord.name}`)}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
            >
              Download Coloring Page for "{selectedWord.name}"
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
