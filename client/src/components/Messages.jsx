import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5555', {
  transports: ['websocket'],
  cors: {
    origin: "http://localhost:5173"
  }
});

const Messages = () => {
  const [user] = useOutletContext();
  const [receiverId, setReceiverId] = useState(null);
  const [receiverUsername, setReceiverUsername] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('/api/inbox', {
      method: 'GET',
      credentials: 'include'
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setInbox(data.inbox);
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
      setMessages(prevMessages => [...prevMessages, data]);
      console.log('Received message:', data);
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;

    socket.emit('message', { receiver_id: receiverId, receiver_username: receiverUsername, message });
    console.log('Sent message:', { receiver_id: receiverId, message });

    const newMessage = { sender_id: user.id, sender: user, receiver_id: receiverId, receiver_username: receiverUsername, message };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');
  };

  const handleParticipantClick = (user) => {
    const selected = messages.find((participant) => participant.sender_id === user.id);
    setSelectedUser({ id: user.id, username: user.username });
  };

    console.log(inbox);
  return (
    <div className="flex h-screen overflow-hidden">
    {user ? (
      <div className="flex flex-col w-1/2 mx-auto my-auto p-8 bg-gray-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
        <div className="flex items-center mb-4">
          <input type="text" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} placeholder="Receiver ID" className="w-full border border-gray-300 rounded-md p-2 mr-2" />
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="w-full border border-gray-300 rounded-md p-2 mr-2" />
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">Send</button>
        </div>
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Inbox:</h3>
          <ul className="divide-y divide-gray-300">
            {inbox.map((participant) => (
              <li key={participant.id} onClick={() => handleParticipantClick(participant)} className="flex items-center cursor-pointer py-2">
                <img src={participant.profile_pic} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                <span className="font-semibold">{participant.username}</span>
              </li>
            ))}
          </ul>
        </div> */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Messages:</h3>
          <div className="flex flex-col space-y-2 overflow-y-auto max-h-96">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender_id === user.id ? 'items-end' : 'items-start'}`}>
                <span className="text-sm font-semibold">{msg.sender_username}</span>
                {console.log(msg)}
                <p className={`bg-gray-100 p-2 rounded-lg ${msg.sender_id === user.id ? 'bg-blue-100 text-right' : 'bg-white'}`}>{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <p className="text-center my-auto">Loading user data...</p>
    )}
  </div>
  );
};

export default Messages;
