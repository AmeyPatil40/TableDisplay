import React from "react";
import DispalyAllColumn from "../componets/DispalyAllColumn";
import DispalySelectedColumn from "../componets/DispalySelectedColumn";
import style from "./ColumnAddedPage.module.css";
function ColumnAddedPage() {
  return (
    <div>
      <div className={style.mainDiv}>
        <DispalyAllColumn></DispalyAllColumn>
        <DispalySelectedColumn></DispalySelectedColumn>
      </div>
    </div>
  );
}

export default ColumnAddedPage;
