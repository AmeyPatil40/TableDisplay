import React, { useContext, useEffect, useState, useCallback } from "react";
import style from "./ColumnAdded1.module.css";
import { DataContext } from "../context/DataContex";
import ClearIcon from "@mui/icons-material/Clear";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DispalySelectedColumn() {
  const {
    displayColumn,
    setDisplayColumn,
    columnAvailable,
    setColumnAvailable,
  } = useContext(DataContext);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [handalData, setHandalData] = useState([]);

  // useEffect(()=>{
  //       setHandalData(columnAvailable)
  // },[columnAvailable])

  const handleOnDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const items = Array.from(displayColumn);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setDisplayColumn(items);
    },
    [displayColumn, setDisplayColumn]
  );

  useEffect(() => {
    const filterColumn = columnAvailable
      .filter((item) => item.isVisible === true)
      .map((item) => item.columnName);
    setDisplayColumn(filterColumn);
  }, [columnAvailable]);

  const handalOnClick = (elm, e) => {
    const filterCheck1 = columnAvailable.map((item) => {
      return item.columnName === elm ? { ...item, isVisible: false } : item;
    });
    console.log(filterCheck1);
    setColumnAvailable(filterCheck1);
  };

  return (
    <div className={style.mainDiv2}>
      <h3>SELECTED COLUMNS ({displayColumn.length})</h3>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="char">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {displayColumn.map((elm, index) => (
                <Draggable
                  key={elm.toString()}
                  draggableId={elm.toString()}
                  index={index}
                  isDragDisabled={
                    isCheckboxChecked &&
                    index < provided.placeholder.props.children.length
                  }
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      className={style.mapMainDiv2}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{elm}</span>
                      <ClearIcon
                        onClick={(e) => {
                          handalOnClick(elm, e);
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default React.memo(DispalySelectedColumn);
