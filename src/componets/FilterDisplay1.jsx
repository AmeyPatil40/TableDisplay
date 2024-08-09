import React, { useContext } from "react";
import { DataContext } from "../context/DataContex";
import style from "./FilterDisplay1.module.css";

function FilterDisplay1({
  handalDelete,
  handalSelectColumn,
  handalValue,
  filter,
  handalFilterisEqual,
}) {
  const { displayColumn } = useContext(DataContext);

  return (
    <div className={style.filterContainer}>
      <span className={style.filterLabel}>Where</span>
      <select
        className={style.filterSelect}
        value={filter.columnName}
        onChange={(e) => {
          handalSelectColumn(e, filter.id);
        }}
      >
        {displayColumn.map((elm) => (
          <option key={elm} value={elm}>
            {elm}
          </option>
        ))}
      </select>
      <select
        className={style.filterSelect}
        onChange={(e) => {
          handalFilterisEqual(e, filter.id);
        }}
      >
        <option value={true}>isEqual</option>
        <option value={false}>isNotEqual</option>
      </select>
      <input
        className={style.filterInput}
        value={filter.value}
        onChange={(e) => {
          handalValue(e.target.value, filter.id);
        }}
        type="text"
      />
      <button
        className={style.filterButton}
        onClick={() => {
          handalDelete(filter.id);
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default FilterDisplay1;
