import React from "react";
import SelectField from "../ui/SelectField";
import { SORT_OPTIONS } from "../../config/constants";

export default function SortSelect({ value, onChange }) {
  return (
    <SelectField
      id="sort-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={SORT_OPTIONS}
    />
  );
}