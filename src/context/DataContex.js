import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const DataContext=createContext();

export const DataProvider=({children})=>{
    const [data,setData]=useState([]); 
    const [displayColumn,setDisplayColumn]=useState(["ID","NAME"]);
    const [columnAvailable,setColumnAvailable]=useState([]);
    const [filter, setFiletr] = useState([]); 
    const [filterApplied,setFilterApplied]=useState(false);
    // const [filterButtonClick,setFilterClick]=useState(false);
    const [columnDispalyPage,setColumnDispalyPage]=useState(false);

const fetchData=async()=>{
    try{
        const res=await axios.get("http://localhost:8080/posts");
        const finalData=res.data;
        setData(finalData);
        let arrOneData=finalData[0];
        const keys=Object.keys(arrOneData).map(key=>{
            return {columnName:key,isVisible:true}
        });
        setColumnAvailable(keys)
        // console.log(keys);
      const filterColumn = keys
      .filter((item) => item.isVisible === true)
      .map((item) => item.columnName);
       setDisplayColumn(filterColumn);
    }catch(error){
        console.log("Facing error while fetching data",error)
    }    
}
useEffect(()=>{
    if(filter.length==0){
        setFilterApplied(true)
    }
},[filter])

useEffect(()=>{
fetchData();
},[]); //filterApplied


    return(
        <DataContext.Provider value={{
        data,
        displayColumn,
        setData,filter,
        setFiletr,
        filterApplied,
        setFilterApplied,
        columnDispalyPage,
        setColumnDispalyPage,
        setDisplayColumn,
        columnAvailable,
        setColumnAvailable}}>
            {children}</DataContext.Provider>
    )
};