// // src/pages/strokeOrders/index.js
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import { fetchAllLookupData } from "../../lib/utils";
// import { wordInputs } from "../../constants/constants";
// import ReusableInput from "../../components/ReusableInput/ReusableInput";
// import Words from "../../components/Words/Words";

// export default function StrokeOrders() {
//   const [messages, setMessages] = useState([
//     {
//       text: "Welcome! I’m here to help you with Hanzi Stroke Orders. Select a curriculum, grade, semester, and word type to get started!",
//       sender: "bot",
//     },
//   ]);

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

//   const addMessage = (text, sender) => {
//     setMessages((prev) => [...prev, { text, sender }]);
//   };

//   const handleGetStroke = (word) => {
//     setSelectedWord(word);
//     addMessage(`Displaying stroke order for "${word.name}".`, "bot");
//     setTimeout(() => {
//       strokeRef.current.scrollIntoView({ behavior: "smooth" });
//     }, 200);
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 flex flex-col items-center overflow-hidden">
//       {/* Header */}
//       <header className="bg-white shadow-md w-full fixed top-0 z-20 py-4">
//         <div className="container mx-auto px-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-purple-600">
//             Stroke Order Chatbot
//           </h1>
//         </div>
//       </header>

//       {/* Decorative Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="circle1 animate-bounce-slow"></div>
//         <div className="circle2 animate-bounce-slow"></div>
//         <div className="circle3 animate-bounce-slow"></div>
//         <div className="star1 animate-spin-slow">⭐</div>
//         <div className="star2 animate-spin-slow">⭐</div>
//         <div className="star3 animate-spin-slow">⭐</div>
//         <div className="triangle1"></div>
//         <div className="triangle2"></div>
//         <div className="chinese-word1">汉</div>
//         <div className="chinese-word2">字</div>
//       </div>

//       {/* Modern Notification Panel */}
//       <div className="fixed top-24 right-8 w-72 max-w-full bg-white rounded-3xl shadow-lg p-4 z-30 transition-transform transform duration-500 ease-in-out">
//         <h3 className="text-lg font-semibold text-purple-600 mb-2">
//           Notifications
//         </h3>
//         <div className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-purple-300">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-4 mb-2 rounded-lg shadow-md text-purple-800 text-sm ${
//                 msg.sender === "bot"
//                   ? "bg-gradient-to-r from-purple-100 to-purple-200"
//                   : "bg-gradient-to-r from-blue-100 to-blue-200"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//       </div>

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
//               onClick={() =>
//                 router.push(`/strokeOrders/practice/${selectedWord.name}`)
//               }
//               className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
//             >
//               Get Stroke For {selectedWord.name}
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslations } from 'next-intl';  // Importing the translations hook
import { fetchAllLookupData } from "../../lib/utils";
import { wordInputs } from "../../constants/constants";
import ReusableInput from "../../components/ReusableInput/ReusableInput";
import Words from "../../components/Words/Words";
import { withMessages } from "../../lib/getMessages";

export default function StrokeOrders() {
  const t = useTranslations("strokeOrder");  // Access translations for strokeOrders page
  const [messages, setMessages] = useState([
    {
      text: t("welcomeMessage"),
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
  const strokeRef = useRef(null);

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

  const handleGetStroke = (word) => {
    setSelectedWord(word);
    addMessage(t("getStrokeButton").replace("{word}", word.name), "bot");
    setTimeout(() => {
      strokeRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 flex flex-col items-center overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-md w-full fixed top-0 z-20 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            {t("headerTitle")}
          </h1>
        </div>
      </header>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="circle1 animate-bounce-slow"></div>
        <div className="circle2 animate-bounce-slow"></div>
        <div className="circle3 animate-bounce-slow"></div>
        <div className="star1 animate-spin-slow">⭐</div>
        <div className="star2 animate-spin-slow">⭐</div>
        <div className="star3 animate-spin-slow">⭐</div>
        <div className="triangle1"></div>
        <div className="triangle2"></div>
        <div className="chinese-word1">汉</div>
        <div className="chinese-word2">字</div>
      </div>

      {/* Modern Notification Panel */}
      <div className="fixed top-24 right-8 w-72 max-w-full bg-white rounded-3xl shadow-lg p-4 z-30 transition-transform transform duration-500 ease-in-out">
        <h3 className="text-lg font-semibold text-purple-600 mb-2">
          {t("notificationTitle")}
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
            {t("selectOptions")}
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

          {/* Word Grid */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="font-bold text-lg text-purple-700">
              {t("availableWords")}
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
            className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10 flex justify-center"
          >
            <button
              onClick={() =>
                router.push(`/strokeOrders/practice/${selectedWord.name}`)
              }
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              {t("getStrokeButton").replace("{word}", selectedWord.name)}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
export const getServerSideProps = withMessages('strokeOrder');
