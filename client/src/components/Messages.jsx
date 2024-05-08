import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'


const socket = io('http://localhost:5555', {
                  transports: ['websocket'],
                  cors: {
                      origin: "http://localhost:5173"
                  }
              });


const Messages = () => {
    const [user] = useOutletContext()
    const [receiverId, setReceiverId] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [inbox, setInbox] = useState([]);

  useEffect(() => {
    fetch('/api/inbox', {
      method: 'GET',
      credentials: 'include'
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setInbox(data.inbox)
          setMessages(data.messages);
          console.log(data.inbox);
          console.log(data.messages);
        });
      }
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully');
  });

    socket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, data])
      console.log('Received message:', data);
    })



    return () => {
      socket.disconnect()
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;

    socket.emit('message', { receiver_id: receiverId, message });
    console.log('Sent message:', { receiver_id: receiverId, message});

    setMessages(prevMessages => [...prevMessages, { sender_id: user.id, sender_username: user.username, message }]);
    setMessage('');
  };



  return (
    <div>
        {user ? (
          <div>
            <h2>Welcome, {user.username}!</h2>
            <div>
              <input type="text" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} placeholder="Receiver ID" />
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
              <button onClick={sendMessage}>Send</button>
            </div>
            <div>
              <h3>Inbox:</h3>
              <ul>
                {inbox.map((participant) => (
                  <li key={participant.id}>
                    <strong>Username: {participant.username}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Messages:</h3>
              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>
                    <strong>{msg.sender_username}: </strong>
                     {msg.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
  )
}

export default Messages