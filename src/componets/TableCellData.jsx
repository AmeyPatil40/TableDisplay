import { TableCell } from "@mui/material";
import style from "../pages/TableDisplay.module.css";
import React, { useRef, useState } from "react";

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
            width: "90%",
            height: "100%",
            padding: "4px",
            outline: "none",
            border: "none",
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
