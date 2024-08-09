import React from "react";
import TablePagination from "@mui/material/TablePagination";
import style from "./TablePagination.module.css"; // Import the CSS module

function CustomTablePagination({ dataToDisplay, rowsPerPage, page, handlePageChange, handleRowsPerPageChange }) {
  return (
    <div className={style.paginationContainer}>
      <span className={style.paginationText}>
        Showing {page * rowsPerPage + 1} to {Math.min(page * rowsPerPage + rowsPerPage, dataToDisplay.length)} of {dataToDisplay.length} entries
      </span>
      <TablePagination
        classes={{
          root: style.paginationContainer,
          select: style.paginationSelect,
          menuItem: style.paginationButton,
          actions: style.paginationButton
        }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataToDisplay.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}

export default CustomTablePagination;