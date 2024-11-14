import React from "react";

const ReusableInput = ({ input, handleChange, index }) => {
  return (
    <select
      onChange={(e) => handleChange(input.name, e.target.value)}
      className="p-3 rounded-full border border-purple-300 shadow-sm focus:outline-none focus:border-purple-500 transition"
      index={index}
    >
      <option value="">{input.placeholder}</option>
      {input.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default ReusableInput;
