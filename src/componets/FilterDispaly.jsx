import React from "react";
import style from "./FilterDispaly.module.css";

function FilterDispaly({ handalFilterClick }) {
  return (
    <div>
      <button
        className={style.addFilterButton}
        onClick={() => {
          handalFilterClick();
        }}
      >
        + Add Filter
      </button>
    </div>
  );
}

export default FilterDispaly;
