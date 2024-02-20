import React from "react";

export default function Message({id, text, onDelete, onEdit, beingEdited, onStopEdit}){
    const onEditButtonPress = () => {
      if (beingEdited){
        onStopEdit();
        return;
      }
      onEdit(id);
    }
    return (
        <div display={"flex"}>
          <div>{text}</div>
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={onEditButtonPress}>{!beingEdited ? "Edit" : "Stop editing"}</button>
        </div>
    )
}