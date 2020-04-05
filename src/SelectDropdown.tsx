import React from "react";
import { Gender } from "./App";

export const SelectDropdown: React.FC<{
  genderSelected: (gender: Gender) => void;
}> = ({ genderSelected }) => {
  const [gender, setGender] = React.useState(Gender.MEN);

  const handleChange = (event: any) => {
    event.preventDefault();
    setGender(event.target.value);
    genderSelected(event.target.value);
  };

  return (
    <select value={gender} onChange={handleChange}>
      <option style={{ textTransform: "capitalize" }} value={Gender.MEN}>
        {Gender.MEN}
      </option>
      <option style={{ textTransform: "capitalize" }} value={Gender.WOMEN}>
        {Gender.WOMEN}
      </option>
    </select>
  );
};
