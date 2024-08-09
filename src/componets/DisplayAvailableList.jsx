import React, { useCallback, useEffect } from "react";
import style from "./ColumnAdded.module.css";

function DisplayAvailableList({ list, handalOnChnage }) {
  const handleChange = useCallback(
    (e) => {
      handalOnChnage(e, list.columnName);
    },
    [handalOnChnage, list.isVisible]
  );

  return (
    <div className={style.mapDiv}>
      <input onChange={handleChange} checked={list.isVisible} type="checkbox" />
      <p>{list.columnName}</p>
    </div>
  );
}

export default React.memo(DisplayAvailableList);
