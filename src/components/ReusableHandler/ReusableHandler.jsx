import React, { useState } from "react";
import { wordInputs } from "../../constants/constants";
import { useLookupData } from "../../hooks/useLookupData";
import ReusableInput from "../ReusableInput/ReusableInput";
import Words from "../Words/Words";
import ReusableButton from "../Buttons/gradientButton";

const ReusableHandler = ({ handleFunc, t, moduleName }) => {
  const { curriculums, grades, semesters, wordTypes } = useLookupData();
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

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
        {wordInputs(curriculums, grades, semesters, wordTypes)?.map(
          (input, index) =>
            (moduleName === "story" || moduleName === "dialogue") &&
            input.name === "wordType" ? null : (
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
        <ReusableButton text="Generate Story" isDisabled={!values["semester"] || !values["curriculum"] || !values["grade"]} onClick={handleFunc}/>
        {/* <div className="mt-6 flex flex-col gap-2">
          <div className="font-bold text-lg text-purple-700">
            {t("availableWords")}
          </div>
          <div className="overflow-y-auto max-h-96 rounded-lg border border-purple-400 shadow-md p-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 scrollbar-thumb-rounded hover:scrollbar-thumb-purple-500 focus:scrollbar-thumb-purple-300">
            <Words
              curriculum={values["curriculum"]}
              grade={values["grade"]}
              semester={values["semester"]}
              handleFunc={handleFunc}
              t={t}
              moduleName={moduleName}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ReusableHandler;
