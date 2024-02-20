import React from "react";

export default function MessageInput({textMessage, onChange, onSubmit, editMode}){
    return (
        <>
            <input value={textMessage} onChange={(e) => {
                onChange(e.target.value);
            }} />
            <button onClick={onSubmit}>{editMode ? "Edit" : "Submit"}</button>
          </>
    )
}