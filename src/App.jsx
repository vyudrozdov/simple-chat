import React from 'react';
import Message from './components/Message';
import MessageInput from './components/MessageInput';

export const BAD_ID = -1;

export default function App() {
  const [editId, setEditId] = React.useState(BAD_ID);
  const [messages, setMessages] = React.useState([]);
  const [textMessage, setTextMessage] = React.useState("");

  const sendMessage = React.useCallback(() => {
    if (!textMessage){
      return;
    }
    setTextMessage("");
    if (editId !== BAD_ID){
      const editIndex = messages.findIndex(m => m.id === editId);
      setMessages([...messages.slice(0, editIndex), {text: textMessage, id: Date.now()}, ...messages.slice(editIndex + 1)]);
      setEditId(BAD_ID);
      return;
    }
    setMessages([...messages, {text: textMessage, id: Date.now()}]);
  }, [editId, textMessage, messages]);

  const deleteMessage = React.useCallback((id) => {
    setMessages(messages.filter(m => m.id !== id));
  }, [messages]);

  const setEdit = (id) => {
    setEditId(id);
    setTextMessage(messages.find(m => m.id === id).text);
  }

  const onMessageChange = (text) => {
    setTextMessage(text);
  }

  const stopEditing = () => {
    setEditId(BAD_ID);
  }

  React.useEffect(() => {
    if (editId === BAD_ID){
      setTextMessage("");
    }
  }, [editId]);

  return (
    <div className='App'>
      <MessageInput 
        textMessage={textMessage} 
        editMode={editId !== BAD_ID} 
        onChange={onMessageChange}
        onSubmit={sendMessage}
      />
      {messages.map(m => (
        <Message {...m} 
          key={m.id}
          beingEdited={editId === m.id} 
          onDelete={deleteMessage} 
          onEdit={setEdit}
          onStopEdit={stopEditing}
        />
      ))}
    </div>
  );
}