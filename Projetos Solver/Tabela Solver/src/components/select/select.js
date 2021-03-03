import React from "react";
import SelectComponent from "react-select";

const customStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: "2px",
    "&:hover": { borderColor: "gray", backgroundColor: '#eaeaea' },
    border: "1px solid lightgray",
    boxShadow: "none",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isFocused || isSelected ? "#007aad" : "",
    color: isFocused || isSelected ? "white" : "",
    ":active": {
      backgroundColor: "#007aad",
    },
    ":hover": {
      backgroundColor: "#3f9fc1",
    },
  }),
  singleValue: (base, { isFocused }) => ({
    ...base,
  }),
  multiValue: (base, { isFocused }) => ({
    ...base,
    backgroundColor: "#e5f2f6",
    height: "20px",
  }),
  multiValueLabel: (base, { isFocused }) => ({
    ...base,
  }),
  multiValueRemove: (base, { isFocused }) => ({
    ...base,
  }),
};

export const Select = (props) => (
  <SelectComponent
    classNamePrefix="react-select"
    styles={customStyles}
    {...props}
  />
);
