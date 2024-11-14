import React, { useEffect, useState } from "react";
import { fetchWords, fetchWordsByFilters } from "../../lib/utils";

const Words = ({ curriculum, grade, semester, wordType, handleFunc }) => {
  const [words, setWords] = useState([]);
  useEffect(() => {
    if (curriculum && grade && semester && wordType) {
      const fetchData = async () => {
        const res = await fetchWordsByFilters(
          curriculum,
          grade,
          semester,
          wordType
        );
        console.log(res);
        if (res) {
          setWords(res);
        }
      };
      fetchData();
    }
    return () => {};
  }, [curriculum, grade, semester, wordType]);

  if (!words.length) {
    return (
      <p className="text-gray-500 italic">
        Select a curriculum, grade, semester, and word type to get stroke.
      </p>
    );
  }
  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="font-bold text-lg text-purple-700">Available Words:</div>
      <div className="grid grid-cols-3 gap-3 text-blue-600">
        {words?.map((word, index) => (
          <div
            key={index}
            onClick={() => handleFunc(word.name)}
            className="cursor-pointer text-center bg-gradient-to-br from-purple-200 to-blue-300 p-2 rounded-full hover:shadow-lg transition-transform transform hover:scale-105 text-lg font-semibold"
          >
            {word.name}
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Words;
