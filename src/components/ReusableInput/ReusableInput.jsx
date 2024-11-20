import { useRouter } from "next/router";
import React from "react";

const ReusableInput = ({ input, handleChange, index }) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <select
      onChange={(e) => handleChange(input.name, e.target.value)}
      className="p-3 rounded-full border border-purple-300 shadow-sm focus:outline-none focus:border-purple-500 transition"
      index={index}
    >
      <option value="">
        {locale === "en" ? input.placeholder : input.placeholderZh}
      </option>
      {input.options.map((option) => (
        <option key={option.id} value={option.id}>
        {locale === "en" ? option.name : option.nameZh}
        </option>
      ))}
    </select>
  );
};

export default ReusableInput;
