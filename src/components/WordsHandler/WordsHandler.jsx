// import { useRouter } from "next/router";
// import Template from "../Template";
// import Words from "../Words/Words";
// import ReusableInput from "../ReusableInput/ReusableInput";
// import axios from "axios";
// import { wordInputs, wordsInputs } from "../../constants/constants";
// import { useEffect, useRef, useState } from "react";
// import { fetchAllLookupData } from "../../lib/utils";
// const WordsHandler = () => {
//   const [selectedWord, setSelectedWord] = useState(null);
//   const [curriculums, setCurriculums] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [wordTypes, setWordTypes] = useState([]);

//   const [values, setValues] = useState({});
//   const router = useRouter();
//   const strokeRef = useRef(null);

//   const handleChange = (name, value) => {
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGetStroke = (word) => {
//     console.log("Selected Word:", word);
//     setSelectedWord(word);
//     setTimeout(() => {
//       strokeRef.current.scrollIntoView({ behavior: "smooth" });
//     }, 200);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetchAllLookupData();
//         if (res) {
//           console.log("Fetched Lookup Data:", res);
//           res.sort((a, b) => a.createdAt - b.createdAt);
//           const curriculumsData = res.filter(
//             (item) => item.type === "curriculum"
//           );
//           setCurriculums(curriculumsData);
//           const gradesData = res.filter((item) => item.type === "grade");
//           setGrades(gradesData);
//           const semestersData = res.filter((item) => item.type === "semester");
//           setSemesters(semestersData);
//           const wordTypesData = res.filter((item) => item.type === "wordType");
//           setWordTypes(wordTypesData);
//         }
//       } catch (error) {
//         console.error("Error fetching lookup data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleUpdate = async () => {
//     console.log(selectedWord.name)
//     const res = await axios.put(
//       `/api/words/update-word/${selectedWord.id}`,
//       {word:selectedWord.name}
//     );

//     if (res) {
//       console.log("Updated Word:", res);
//       setSelectedWord(null);
//     }
//   };

//   const handleDelete = async () => {
//     const res = await axios.delete(`/api/words/delete-word/${selectedWord.id}`);

//     if (res) {
//       console.log("Deleted Word:", res);
//       setSelectedWord(null);
//     }
//   };
//   return (
//     <Template>
//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
//         <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
//           <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
//             Select Options for Stroke Order
//           </h2>
//           <div className="flex flex-col gap-4">
//             {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
//               (input, index) => (
//                 <ReusableInput
//                   input={input}
//                   handleChange={handleChange}
//                   index={index}
//                 />
//               )
//             )}
//           </div>

//           {/* Word Grid */}
//           <div className="mt-6 flex flex-col gap-2">
//             <div className="font-bold text-lg text-purple-700">
//               Available Words:
//             </div>
//             <Words
//               curriculum={values["curriculum"]}
//               grade={values["grade"]}
//               wordType={values["wordType"]}
//               semester={values["semester"]}
//               handleFunc={handleGetStroke}
//             />
//           </div>
//         </div>

//         {/* Stroke Order Display */}
//         {selectedWord && (
//           <div
//             ref={strokeRef}
//             className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10 flex justify-center"
//           >
//             <button
//               onClick={handleUpdate}
//               className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
//             >
//               Edit {selectedWord.name}
//             </button>
//             <button
//               onClick={handleDelete}
//               className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
//             >
//               Delete {selectedWord.name}
//             </button>
//           </div>
//         )}
//       </main>
//     </Template>
//   );
// };

// export default WordsHandler;

import { useRouter } from "next/router";
import Template from "../Template";
import Words from "../Words/Words";
import ReusableInput from "../ReusableInput/ReusableInput";
import axios from "axios";
import { wordInputs, wordsInputs } from "../../constants/constants";
import { useEffect, useRef, useState } from "react";
import { fetchAllLookupData } from "../../lib/utils";

const WordsHandler = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [inputWord, setInputWord] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [curriculums, setCurriculums] = useState([]);
  const [grades, setGrades] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [wordTypes, setWordTypes] = useState([]);

  const [values, setValues] = useState({});
  const [newWord, setNewWord] = useState({});
  const router = useRouter();
  const strokeRef = useRef(null);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectedWordChange = (name, value) => {
    setSelectedWord((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewWordChange = (name, value) => {
    setNewWord((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetStroke = (word) => {
    console.log("Selected Word:", word);
    setSelectedWord(word);
    setInputWord(word.name);
    setTimeout(() => {
      strokeRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
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

  const handleUpdate = async () => {
    if (!inputWord) return;
    const res = await axios.put(
      `/api/words/update-word/${selectedWord.id}`,
      { word: inputWord }
    );

    if (res) {
      console.log("Updated Word:", res);
      setSelectedWord(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedWord) return;
    const res = await axios.delete(`/api/words/delete-word/${selectedWord.id}`);

    if (res) {
      console.log("Deleted Word:", res);
      setSelectedWord(null);
    }
  };

  const handleAddWord = async () => {
    const res = await axios.post(`/api/words/add-word`, newWord);

    if (res) {
      console.log("Added New Word:", res);
      setIsAdding(false);
      setNewWord({});
    }
  };

  return (
      <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
            Select Options for Stroke Order
          </h2>
          <div className="flex flex-col gap-4">
            {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
              (input, index) => (
                <ReusableInput
                  key={index}
                  input={input}
                  handleChange={handleChange}
                  index={index}
                />
              )
            )}
          </div>

          {/* Word Grid */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="font-bold text-lg text-purple-700">
              Available Words:
            </div>
            <Words
              curriculum={values["curriculum"]}
              grade={values["grade"]}
              wordType={values["wordType"]}
              semester={values["semester"]}
              handleFunc={handleGetStroke}
            />
          </div>
        </div>

        {/* Stroke Order Display */}
        {selectedWord && (
          <div
            ref={strokeRef}
            className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10 flex flex-col items-center space-y-4"
          >
            <input
              type="text"
              value={inputWord}
              onChange={(e) =>
                setInputWord(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <button
              onClick={handleUpdate}
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        )}

        {/* Add New Word */}
        {isAdding && (
          <div className="w-full max-w-2xl bg-white p-6 rounded-3xl shadow-lg mt-10 flex flex-col space-y-4">
            {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
              (input, index) => (
                <ReusableInput
                  key={index}
                  input={{ ...input, value: newWord[input.name] || "" }}
                  handleChange={handleNewWordChange}
                  index={index}
                />
              )
            )}
            <button
              onClick={handleAddWord}
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Add Word
            </button>
          </div>
        )}

        {/* Add New Word Button */}
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 mt-4"
          >
            Add New Word
          </button>
        )}
      </main>
  );
};

export default WordsHandler;
