import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataContext } from "../context/DataContex";
import FilterDispaly from "./FilterDispaly";
import FilterDisplay1 from "./FilterDisplay1";
import { Container } from "@mui/material";
import style from "./FilterDispaly.module.css";

export default function FilterPopUp() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { filter, setFiletr, setFilterApplied } = React.useContext(DataContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handalDelete = (id) => {
    setFiletr(
      filter.filter((elm) => {
        return elm.id !== id;
      })
    );
    if (filter.length === 1) {
      setAnchorEl(null);
    }
  };
  const handalSelectColumn = (e, id) => {
    let value = e.target.value;
    setFiletr(
      filter.map((elm) => {
        if (elm.id === id) {
          return { ...elm, columnName: value };
        } else {
          return elm;
        }
      })
    );
  };
  const handalValue = (value, id) => {
    setFiletr(
      filter.map((elm) => {
        if (elm.id === id) {
          return { ...elm, value: value };
        } else {
          return elm;
        }
      })
    );
  };
  const handalFilterisEqual = (e, id) => {
    let value = e.target.value;
    setFiletr(
      filter.map((elm) => {
        if (elm.id === id) {
          return { ...elm, isEqual: value };
        } else {
          return elm;
        }
      })
    );
  };

  const handalFilterClick = () => {
    setFilterApplied(false);

    setFiletr([
      ...filter,
      { id: Date.now(), isEqual: true, value: "", columnName: "id" },
    ]);
  };
  const handalFilterClose = () => {
    setFiletr([...filter]);
    setAnchorEl(null);
    setFilterApplied(true);
    //setFilterClick()
    // if (filter.length > 0) {

    //   setFilterApplied(true);

    // } else {
    // //   setFilterApplied(true);
    //   setAnchorEl(null);
    // }
    // const filteredData = data.filter((item) =>
    //   filter.every(
    //     (criteria) =>
    //       String(item[criteria.columnName]).trim() ===
    //       String(criteria.value).trim()
    //   )
    // );
    // console.log(filteredData);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // if (filter.length > 0) {
    //   setFilterApplied(true);
    //   setAnchorEl(null);
    // } else {
    //   setFilterApplied(false);
    //   setAnchorEl(null);
    // }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <Container>
            {filter.map((elm) => {
              if (elm.id) {
                return (
                  <FilterDisplay1
                    handalDelete={handalDelete}
                    handalSelectColumn={handalSelectColumn}
                    handalValue={handalValue}
                    handalFilterisEqual={handalFilterisEqual}
                    key={elm.id}
                    filter={elm}
                  ></FilterDisplay1>
                );
              }
            })}
            <FilterDispaly
              handalFilterClick={handalFilterClick}
            ></FilterDispaly>
            {filter.length ? (
              <button
                onClick={() => {
                  handalFilterClose();
                }}
               className={style.addFilterButton}
              >
                Apply Filter
              </button>
            ) : null}
          </Container>
        </Typography>
      </Popover>
    </div>
  );
}
