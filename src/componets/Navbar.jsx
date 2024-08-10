import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import style from "./Navbar.module.css";

import FilterPopUp from "./FilterPopUp";
import { DataContext } from "../context/DataContex";

function Navbar() {
  const {columnDispalyPage,setColumnDispalyPage}=useContext(DataContext);

  const navigate = useNavigate();
  const handalButtonClick = () => {
    if(!columnDispalyPage){
      navigate("./addcolumn");
      setColumnDispalyPage(true)
    }else{
      navigate("/");
      setColumnDispalyPage(false)
    }
    
  };
  return (
    <div className={style.parentDiv}>
      <div style={{display:"flex",alignItems:"center"}}>
        {!columnDispalyPage?<FilterPopUp ></FilterPopUp>:null}
        {/* <FilterPopUp ></FilterPopUp> */}
      </div>
      <div>
        {columnDispalyPage ? <Button
          // sx={{color:"Black",border:"1px solid black",backgroundColor:"white",}}
          onClick={() => {
            handalButtonClick();
          }}
        >
           Go To Table
        </Button> :  <Button
          // sx={{color:"Black",border:"1px solid black",backgroundColor:"white",}}
          onClick={() => {
            handalButtonClick();
          }}
        >Edit Column
         
        </Button>}
       
      </div>
    </div>
  );
}

export default Navbar;
