import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import style from "./ColumnAdded.module.css";
import { DataContext } from "../context/DataContex";
import DisplayAvailableList from "./DisplayAvailableList";

function DispalyAllColumn() {
  const { displayColumn, columnAvailable, setColumnAvailable } =
    useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredData = useMemo(() => {
    return searchTerm
      ? columnAvailable.filter((item) =>
          item.columnName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : columnAvailable;
  }, [searchTerm, columnAvailable]);

  const handleOnChange = useCallback(
    (e, columnName) => {
      const value = e.target.checked;
      setColumnAvailable((prevColumnAvailable) =>
        prevColumnAvailable.map((elm) =>
          elm.columnName === columnName ? { ...elm, isVisible: value } : elm
        )
      );
    },
    [setColumnAvailable]
  );

  const stickyHeaderStyle = useMemo(
    () => ({
      position: "sticky",
      zIndex: "0",
      top: "0",
      padding: "5px",
      background: "white",
      display: "flex",
    }),
    []
  );

  return (
    <div className={style.mainDiv1}>
      <div className={style.inputDiv}>
        <input
          className={style.searchInput}
          placeholder="Search column name..."
          type="text"
          onChange={handleSearch}
        />
        {/* <SearchIcon sx={{ cursor: "pointer", color: "#4169E1" }} /> */}
      </div>

      <div className={style.dataDispalyDiv}>
        <div style={stickyHeaderStyle}>
          <h4>ASSOCIATIONS</h4>
        </div>
        {filteredData.map((elm) => (
          <DisplayAvailableList
            key={elm.columnName}
            handalOnChnage={handleOnChange}
            list={elm}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(DispalyAllColumn);
