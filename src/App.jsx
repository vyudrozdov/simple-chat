import React from 'react';
import Message from './components/Message';

const BAD_ID = -1;

export default function App() {
  const [editId, setEditId] = React.useState(BAD_ID);
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const sendMessage = React.useCallback(() => {
    if (!message){
      return;
    }
    setMessage("");
    if (editId !== BAD_ID){
      const editIndex = messages.findIndex(m => m.id === editId);
      setMessages([...messages.slice(0, editIndex), {text: message, id: Date.now()}, ...messages.slice(editIndex + 1)]);
      setEditId(BAD_ID);
      return;
    }
    setMessages([...messages, {text: message, id: Date.now()}]);
  }, [editId, message, messages]);

  const deleteMessage = React.useCallback((id) => {
    setMessages(messages.filter(m => m.id !== id));
  }, [messages]);

  const setEdit = (id) => {
    setEditId(id);
    setMessage(messages.find(m => m.id === id).text);
  }

  React.useEffect(() => {
    if (editId === BAD_ID){
      setMessage("");
    }
  }, [editId]);

  const editMode = editId !== BAD_ID;

  return (
    <div className='App'>
      <input value={message} onChange={(e) => {
        setMessage(e.target.value);
      }} />
      <button onClick={sendMessage}>{editMode ? "Edit" : "Send message"}</button>
      {messages.map(m => (
        <Message key={m.id} {...m} beingEdited={editId === m.id} onDelete={deleteMessage} onEdit={setEdit} />
      ))}
    </div>
  );
}