import React from "react";

export default function Message({id, text, onDelete, onEdit, beingEdited}){
    return (
        <div display={"flex"}>
          <div>{text}</div>
          <button onClick={() => onDelete(id)}>Delete</button>
          {!beingEdited ? <button onClick={() => onEdit(id)}>Edit</button> : <span>Being Redacted</span>}
        </div>
    )
}