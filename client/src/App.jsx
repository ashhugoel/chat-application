import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('https://3002-idx-chat-application-1724986684404.cluster-a3grjzek65cxex762e4mwrzl46.cloudworkstations.dev/'); // Replace with your backend URL

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    socket.emit('send-message', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive-message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
