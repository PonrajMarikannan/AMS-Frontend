import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const parentId = sessionStorage.getItem('UserId'); // Retrieve ParentId from session storage

    useEffect(() => {
        if (parentId) {
            axios.get(`http://localhost:8888/msg/getMsg/${parentId}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [parentId]);

    return (
        <div className="flex flex-col h-full w-96">
            <div className="flex-1 overflow-y-auto p-4 bg-white border border-gray-300 rounded-lg">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`mb-2 p-2 rounded-lg flex items-start ${msg.sender === 'teacher' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} max-w-full`}>
                            <img
                                src={msg.photo || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png"}
                                alt={msg.name}
                                className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold">{msg.name}</span>
                                    <span className="text-gray-500 text-sm ml-2">{msg.time}</span>
                                </div>
                                <p className={`whitespace-pre-wrap break-words  rounded-lg ${msg.sender === 'teacher' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`} style={{ maxWidth: '100%' }}>
                                    {msg.messageBody}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet.</p>
                )}
            </div>
        </div>
    );
}

export default ChatPage;
