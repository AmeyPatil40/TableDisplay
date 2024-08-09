import React, { useContext, useEffect, useState, useCallback } from "react";
import style from "./ColumnAdded1.module.css";
import { DataContext } from "../context/DataContex";
import ClearIcon from "@mui/icons-material/Clear";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DispalySelectedColumn() {
  const { displayColumn, setDisplayColumn, columnAvailable } =
    useContext(DataContext);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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

  const handleCheckboxChange = useCallback((e) => {
    setIsCheckboxChecked(e.target.checked);
  }, []);

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
                      <ClearIcon />
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
