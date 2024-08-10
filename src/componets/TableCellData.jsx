import { TableCell } from "@mui/material";
import style from "../pages/TableDisplay.module.css";
import React, { useEffect, useRef, useState } from "react";

function TableCellData({ row, column, handleDoubleClick }) {
  const [contenteditable1, setContenteditable1] = useState(false);
  const [rowColumnValue, setRowColumnValue] = useState(row[column]);

  return (
    <TableCell
      contentEditable={contenteditable1}
      onDoubleClick={() => {
        if (column != "id") {
          setContenteditable1(true);
        }
      }}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          setContenteditable1(false);
          handleDoubleClick(row.id, column, rowColumnValue);
        }
      }}
      onBlur={() => {
        setContenteditable1(false);
        handleDoubleClick(row.id, column, rowColumnValue); //handleDoubleClick
      }}
      sx={{ textAlign: "center", fontWeight: "300" }}
      className={style.tableCell}
    >
      {contenteditable1 ? (
        <input
          style={{
            width: "70%",
            height: "30px",
            padding: "5px",
            outline: "none",
            border: "none",
            fontWeight: "bold",
            borderRadius: "10px",
          }}
          value={rowColumnValue}
          onChange={(e) => {
            setRowColumnValue(e.target.value);
          }}
        />
      ) : (
        rowColumnValue
      )}
    </TableCell>
  );
}

export default TableCellData;
