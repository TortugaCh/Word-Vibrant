import { useEffect, useState } from "react";
import { fetchAllLookupData } from "../lib/utils";

export const useLookupData = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [curriculums, setCurriculums] = useState([]);
  const [grades, setGrades] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [wordTypes, setWordTypes] = useState([]);
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

  return {
    curriculums,
    grades,
    semesters,
    wordTypes,
  };
};
