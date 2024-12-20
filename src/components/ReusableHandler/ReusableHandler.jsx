import React, { useEffect, useState } from "react";
import { wordInputs } from "../../constants/constants";
import { useLookupData } from "../../hooks/useLookupData";
import ReusableInput from "../ReusableInput/ReusableInput";
import Words from "../Words/Words";
import { fetchWordsByFilters } from "../../lib/utils/words";

const ReusableHandler = ({
  handleFunc,
  t,
  moduleName,
  wordsFetched,
  setWordsFetcehed,
}) => {
  const { curriculums, grades, semesters, wordTypes } = useLookupData();
  const [words, setWords] = useState([]);
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    console.log(name, value);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { curriculum, grade, semester, wordType,topic } = values;

      // Ensure required fields are selected
      if (curriculum && grade && semester) {
        // Fetch condition based on moduleName
        if (((moduleName === "story" && topic) || moduleName === "dialogue"  )|| wordType) {
          try {
            const res = await fetchWordsByFilters(
              curriculum,
              grade,
              semester,
              wordType,
              moduleName,
              grades,
              semesters
            );
            console.log("res", res);
            if (res) {
              setWords(res);
              if (setWordsFetcehed) {
                setWordsFetcehed(res);
                sessionStorage.setItem("words", JSON.stringify(res));
                if(moduleName === "story")
                sessionStorage.setItem("topic", values.topic);
              }
            }
          } catch (error) {
            console.error("Error fetching words:", error);
          }
        }
      }
    };

    fetchData();
  }, [values.curriculum, values.grade, values.semester, values.wordType, moduleName]);

  const renderSelectTitle = (moduleName) => {
    switch (moduleName) {
      case "coloring":
        return t("coloringPage.selectOptions");
      case "story":
        return t("createAStory.selectOptions");
      case "dialogue":
        return t("createADialogue.selectOptions");
      default:
        return t("selectOptions");
    }
  };
  return (
    <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4 border-2 border-[#F9AF42]">
      <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
        {renderSelectTitle(moduleName)}
      </h2>
      <div className="flex flex-col gap-4">
        {wordInputs(
          curriculums,
          grades,
          semesters,
          wordTypes.filter((type) => type.name !== "Phrases")
        )?.map((input, index) =>
          (moduleName === "story" || moduleName === "dialogue") &&
          input.name === "wordType" ? null : (moduleName === "stroke-order" ||
              moduleName === "coloring" || moduleName==="dialogue") &&
            input.name === "topic" ? null : (
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
      {(moduleName === "stroke-order" || moduleName === "coloring") && (
        <div className="mt-6 flex flex-col gap-2">
          <div className="mt-6 flex flex-col gap-2">
            <div className="font-bold text-lg text-purple-700">
              {t("availableWords")}
            </div>
            <div className="overflow-y-auto max-h-96 rounded-lg border border-purple-400 shadow-md p-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 scrollbar-thumb-rounded hover:scrollbar-thumb-purple-500 focus:scrollbar-thumb-purple-300">
              <Words
                handleFunc={handleFunc}
                words={words}
                t={t}
                moduleName={moduleName}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableHandler;
