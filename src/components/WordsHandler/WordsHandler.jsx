import { useRouter } from "next/router";
import Words from "../Words/Words";
import ReusableInput from "../ReusableInput/ReusableInput";
import axios from "axios";
import { wordInputs, wordsInputs } from "../../constants/constants";
import { useEffect, useRef, useState } from "react";
import { fetchAllLookupData } from "../../lib/utils";
import { message } from "antd";

// const WordsHandler = () => {
//   const [selectedWord, setSelectedWord] = useState(null);
//   const [inputWord, setInputWord] = useState("");
//   const [isAdding, setIsAdding] = useState(false);
//   const [curriculums, setCurriculums] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [wordTypes, setWordTypes] = useState([]);

//   const [values, setValues] = useState({});
//   const [newWord, setNewWord] = useState({});
//   const router = useRouter();
//   const strokeRef = useRef(null);

//   const handleChange = (name, value) => {
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectedWordChange = (name, value) => {
//     setSelectedWord((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNewWordChange = (name, value) => {
//     setNewWord((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGetStroke = (word) => {
//     console.log("Selected Word:", word);
//     setSelectedWord(word);
//     setInputWord(word.name);
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
//     if (!inputWord) return;
//     const res = await axios.put(
//       `/api/words/update-word/${selectedWord.id}`,
//       { word: inputWord }
//     );

//     if (res) {
//       console.log("Updated Word:", res);
//       setSelectedWord(null);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedWord) return;
//     const res = await axios.delete(`/api/words/delete-word/${selectedWord.id}`);

//     if (res) {
//       console.log("Deleted Word:", res);
//       setSelectedWord(null);
//     }
//   };

//   const handleAddWord = async () => {
//     const res = await axios.post(`/api/words/add-word`, newWord);

//     if (res) {
//       console.log("Added New Word:", res);
//       setIsAdding(false);
//       setNewWord({});
//     }
//   };

//   return (
//       <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
//         <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
//           <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
//             Select Options for Stroke Order
//           </h2>
//           <div className="flex flex-col gap-4">
//             {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
//               (input, index) => (
//                 <ReusableInput
//                   key={index}
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
//             className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10 flex flex-col items-center space-y-4"
//           >
//             <input
//               type="text"
//               value={inputWord}
//               onChange={(e) =>
//                 setInputWord(e.target.value)
//               }
//               className="border border-gray-300 rounded-lg px-4 py-2 w-full"
//             />
//             <button
//               onClick={handleUpdate}
//               className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
//             >
//               Update
//             </button>
//             <button
//               onClick={handleDelete}
//               className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105"
//             >
//               Delete
//             </button>
//           </div>
//         )}

//         {/* Add New Word */}
//         {isAdding && (
//           <div className="w-full max-w-2xl bg-white p-6 rounded-3xl shadow-lg mt-10 flex flex-col space-y-4">
//             {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
//               (input, index) => (
//                 <ReusableInput
//                   key={index}
//                   input={{ ...input, value: newWord[input.name] || "" }}
//                   handleChange={handleNewWordChange}
//                   index={index}
//                 />
//               )
//             )}
//             <button
//               onClick={handleAddWord}
//               className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
//             >
//               Add Word
//             </button>
//           </div>
//         )}

//         {/* Add New Word Button */}
//         {!isAdding && (
//           <button
//             onClick={() => setIsAdding(true)}
//             className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 mt-4"
//           >
//             Add New Word
//           </button>
//         )}
//       </main>
//   );
// };

const WordsHandler = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [values, setValues] = useState({});
  const [modalValues, setModalValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curriculums, setCurriculums] = useState([]);
  const [grades, setGrades] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [wordTypes, setWordTypes] = useState([]);
  const strokeRef = useRef(null);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    console.log(values);
  };

  const handleModalChange = (name, value) => {
    setModalValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetStroke = (word) => {
    setSelectedWord(word);
    setValues({
      curriculum: word.curriculum,
      grade: word.grade,
      semester: word.semester,
      wordType: word.wordType,
      name: word.name,
    });
    setTimeout(() => {
      strokeRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllLookupData();
        if (res) {
          res.sort((a, b) => a.createdAt - b.createdAt);
          setCurriculums(res.filter((item) => item.type === "curriculum"));
          setGrades(res.filter((item) => item.type === "grade"));
          setSemesters(res.filter((item) => item.type === "semester"));
          setWordTypes(res.filter((item) => item.type === "wordType"));
        }
      } catch (error) {
        console.error("Error fetching lookup data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddWord = async () => {
    try {
      const resp = await axios.post(`/api/words/create-word`, modalValues);
      if (resp.status === 200) {
        console.log("Word added successfully");
        message.success("Word added successfully");
      } else {
        message.error("Error adding word");
      }
      setModalValues({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding word:", error);
      message.error("Error adding word");
    }
  };

  const handleUpdateWord = async () => {
    try {
      if (!selectedWord) return;
      const resp = await axios.put(
        `/api/words/update-word/${selectedWord.id}`,
        {
          word: values.name,
        }
      );
      if (resp.status === 200) {
        console.log("Word updated successfully");
        message.success("Word updated successfully");
      } else {
        message.error("Error updating word");
      }

      setSelectedWord(null);
      setValues({});
    } catch (error) {
      console.error("Error updating word:", error);
      message.error("Error updating word");
    }
  };

  const handleDeleteWord = async () => {
    try {
      if (!selectedWord) return;
      const resp = await axios.delete(
        `/api/words/delete-word/${selectedWord.id}`
      );
      if (resp.status === 200) {
        console.log("Word deleted successfully");
        message.success("Word deleted successfully");
      } else {
        message.error("Error deleting word");
      }

      setSelectedWord(null);
      setValues({});
    } catch (error) {
      console.error("Error deleting word:", error);
      message.error("Error deleting word");
    }
  };

  return (
    <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
      {/* Manage Words Section */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
        <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
          Manage Words
        </h2>
        <div className="flex flex-col gap-4">
          {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
            (input, index) => (
              <ReusableInput
                key={index}
                input={{ ...input, value: values[input.name] || "" }}
                handleChange={handleChange}
                index={index}
              />
            )
          )}
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="mt-6 flex flex-col gap-2">
            <div className="font-bold text-lg text-purple-700">
              Available Words:
            </div>
            <div className="overflow-y-auto max-h-96 rounded-lg border border-purple-400 shadow-md p-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 scrollbar-thumb-rounded hover:scrollbar-thumb-purple-500 focus:scrollbar-thumb-purple-300">
              <Words
                curriculum={values["curriculum"]}
                grade={values["grade"]}
                wordType={values["wordType"]}
                semester={values["semester"]}
                handleFunc={handleGetStroke}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding Word */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-center text-xl font-bold mb-4">Add New Word</h2>
            <div className="flex flex-col gap-4">
              {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
                (input, index) => (
                  <ReusableInput
                    key={index}
                    input={{ ...input, value: modalValues[input.name] || "" }}
                    handleChange={handleModalChange}
                    index={index}
                  />
                )
              )}
              {modalValues.curriculum &&
                modalValues.wordType &&
                modalValues.grade &&
                modalValues.semester && (
                  <input
                    type="text"
                    value={modalValues.name || ""}
                    onChange={(e) => handleModalChange("name", e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    placeholder="Enter Word"
                  />
                )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddWord}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={
                  !modalValues.name ||
                  !modalValues.curriculum ||
                  !modalValues.grade ||
                  !modalValues.semester ||
                  !modalValues.wordType
                }
              >
                Add Word
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-500 transition duration-300 shadow-lg transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Word Section */}
      {selectedWord && (
        <div
          ref={strokeRef}
          className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10 flex flex-col items-center space-y-4"
        >
          <input
            type="text"
            value={values.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Selected Word"
          />
          <div className="flex space-x-4">
            <button
              onClick={handleUpdateWord}
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Update Word
            </button>
            <button
              onClick={handleDeleteWord}
              className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Delete Word
            </button>
          </div>
        </div>
      )}

      {/* Add New Word Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
      >
        Add New Word
      </button>
    </main>
  );
};

export default WordsHandler;
