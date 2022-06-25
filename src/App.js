import React from "react";
import "./styles.css";

import { EmployeeDropdown } from "./EmployeeDropdown/Employee.Component";
import { DatePickers } from "./DatePicker/DatePicker.Component"

export default function App() {
  return (
    <div className="App">
      <EmployeeDropdown />
      <DatePickers />
    </div>
  );
}
