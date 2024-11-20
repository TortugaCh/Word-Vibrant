import React, { useState } from "react";
import { wordInputs } from "../../constants/constants";
import { useLookupData } from "../../hooks/useLookupData";
import ReusableInput from "../ReusableInput/ReusableInput";
import Words from "../Words/Words";

const ReusableHandler = ({handleFunc,t}) => {
  const { curriculums, grades, semesters, wordTypes } = useLookupData();
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
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
          handleFunc={handleFunc}
        />
      </div>
    </div>
  );
};

export default ReusableHandler;
