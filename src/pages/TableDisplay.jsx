import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContex";
import style from "./TableDisplay.module.css";
import TableCellData from "../componets/TableCellData";
import CustomTablePagination from "../componets/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import axios from "axios";

function TableDisplay() {
  const {
    displayColumn,
    data,
    setFilterApplied,
    filterApplied,
    filter,
    setData,
  } = useContext(DataContext);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(""); // Store the column to be sorted by
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSortClick = (columnName) => {
    const isAsc = orderBy === columnName && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnName);

    const sortedData = [...dataToDisplay].sort((a, b) => {
      const valueA = a[columnName] ?? ""; // Handle undefined or null values
      const valueB = b[columnName] ?? ""; // Handle undefined or null values

      if (typeof valueA === "number" && typeof valueB === "number") {
        return isAsc ? valueA - valueB : valueB - valueA;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return isAsc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return 0; // Fallback for mismatched types or empty data
      }
    });

    setDataToDisplay(sortedData);
  };

  const handleDoubleClick = async (id, column, value) => {
    try {
      await axios.patch(`http://localhost:8080/posts/${id}`, {
        [column]: value,
      });

      // Fetch the updated data after the PATCH request
      const updatedData = await axios.get("http://localhost:8080/posts");
      setData(updatedData.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const filterData = () => {
    if (filterApplied) {
      const filteredData = data.filter((item) =>
        filter.every(
          (criteria) =>
            String(item[criteria.columnName]).trim() ===
            String(criteria.value).trim()
        )
      );
      setDataToDisplay(filteredData);
    } else {
      setDataToDisplay(data);
    }
  };

  useEffect(() => {
    filterData();
  }, [filter, data]);

  return (
    <>
      <div className={style.parentDiv}>
        <Table padding="none" stickyHeader aria-label="sticky table">
          <TableHead className={style.tableHead}>
            <TableRow className={style.tableRow}>
              {displayColumn.map((columnName) => (
                <TableCell
                  key={columnName}
                  sx={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "550",
                    backgroundColor: " #F0F8FF",
                    gap: "10px",
                  }}
                  className={style.tableCell}
                  onClick={() => handleSortClick(columnName)}
                >
                  <TableSortLabel
                    active={orderBy === columnName}
                    direction={orderBy === columnName ? order : "asc"}
                  >
                    {columnName}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToDisplay
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} sx={{ height: "30px", width: "Auto" }}>
                  {displayColumn.map((column) => (
                    <TableCellData
                      key={column}
                      row={row}
                      column={column}
                      handleDoubleClick={handleDoubleClick}
                    />
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <CustomTablePagination
        dataToDisplay={dataToDisplay}
        rowsPerPage={rowsPerPage}
        page={page}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      ></CustomTablePagination>
    </>
  );
}

export default TableDisplay;
