import React, { useEffect, useState } from "react";
import { fetchWords, fetchWordsByFilters } from "../../lib/utils";

const getRandomColor = () => {
  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
    "bg-teal-200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Words = ({ curriculum, grade, semester, wordType, handleFunc, t,moduleName,words }) => {
  // const [words, setWords] = useState([]);

  // useEffect(() => {
  //   if (curriculum && grade && semester) {
  //     const fetchData = async () => {
  //       const res = await fetchWordsByFilters(
  //         curriculum,
  //         grade,
  //         semester,
  //         wordType,
  //         moduleName
  //       );

  //       if (res) {
  //         console.log(res);
  //         setWords(res);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [curriculum, grade, semester, wordType]);

  if (!words.length) {
    return (
      <p className="text-gray-500 italic">
        {" "}
        {t ? t("selectWord") : "Select a word"}
      </p>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-3">
        {words?.map((word, index) => {
          const randomColor = getRandomColor(); // Get a random color
          return (
            <div
              key={index}
              onClick={() => handleFunc(word)}
              className={`cursor-pointer text-center ${randomColor} p-2 rounded-full hover:shadow-lg transition-transform transform hover:scale-105 text-lg font-semibold`}
            >
              {word.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Words;
