import React, { useState, useEffect } from 'react';
import axios from 'axios';

const staticMessages = {
  // Mock messages data for local testing, this will be replaced with real data from backend
  1: [
    { sender: 'parent', name: 'Jane Doe', photo: '', text: 'Hello, I have a question about my child.', time: '10:00 AM' },
    { sender: 'teacher', name: 'Teacher Name', photo: '', text: 'Hi Jane, how can I help you?', time: '10:05 AM' },
  ],
  2: [
    { sender: 'parent', name: 'John Smith', photo: '', text: 'When is the next parent-teacher meeting?', time: '11:00 AM' },
    { sender: 'teacher', name: 'Teacher Name', photo: '', text: 'It’s scheduled for next Thursday.', time: '11:10 AM' },
  ],
};

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [parents, setParents] = useState([]);
    const [currentParent, setCurrentParent] = useState(null);
    const staffid = sessionStorage.getItem('UserId');

    // Fetch all parents when component mounts
    useEffect(() => {
        axios.get('http://localhost:8888/parent/all')
            .then(response => {
                console.log('Fetched parents:', response.data);
                setParents(response.data);
            })
            .catch(error => {
                console.error('Error fetching parents:', error);
            });
    }, []);

    useEffect(() => {
        if (currentParent) {
            axios.get(`http://localhost:8888/msg/getMsg/${currentParent.parentId}`)
                .then(response => {
                    console.log('Fetched messages:', response.data);
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [currentParent]);

    const handleSend = async () => {
        if (message.trim() && currentParent) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'teacher', name: 'Teacher Name', photo: 'path_to_teacher_photo', text: message, time: currentTime },
            ]);

            const formData = new FormData();
            formData.append('messageBody', message);
            formData.append('senderId', staffid);
            formData.append('receiverId', currentParent.parentId);

            try {
                const response = await axios.post('http://localhost:8888/msg/sendmsg', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data === 'Success') {
                    const messagesResponse = await axios.get(`http://localhost:8888/msg/getMsg/${currentParent.parentId}`);
                    setMessages(messagesResponse.data);
                }
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error sending message:', error);
            }

            setMessage('');
        }
    };

    return (
        <div className="flex max-w-6xl mx-auto p-4 bg-gray-50 rounded-xl shadow-md mt-20 mr-12 h-[620px]">
            
            <div className="w-1/3 bg-gray-100 p-4 border-r border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Parents</h2>
                <ul className="space-y-2">
                    {parents.map(parent => (
                        <li
                            key={parent.id}
                            className={`p-2 rounded cursor-pointer hover:bg-gray-200 ${currentParent?.id === parent.id ? 'bg-gray-300' : ''}`}
                            onClick={() => setCurrentParent(parent)}
                        >
                            <img
                                src={`data:image/jpeg;base64,${parent.photo}`} 
                                alt={parent.name}
                                className="w-10 h-10 rounded-full object-cover mr-2 inline"
                            />
                            {parent.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col p-4">
                {currentParent ? (
                    <>
                        <div className="flex items-center mb-4">
                            <img
                                src={`data:image/jpeg;base64,${currentParent.photo}`} // Display profile picture
                                alt={currentParent.name}
                                className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <h2 className="text-2xl font-semibold">{currentParent.name}</h2>
                        </div>
                        <div className="flex-1 bg-white p-4 border border-gray-300 rounded-lg overflow-y-auto">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div key={index} className={`mb-2 p-2 rounded-lg flex items-start ${msg.sender === 'teacher' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                        <img
                                            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png"
                                            alt={msg.name}
                                            className="w-8 h-8 rounded-full object-cover mr-2"
                                        />
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <span className="font-semibold">{msg.name}</span>
                                                <span className="text-gray-500 text-sm ml-2">{msg.time}</span>
                                            </div>
                                            <p>{msg.messageBody}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No messages yet.</p>
                            )}
                        </div>
                        <div className="mt-4 flex items-center">
                            <input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="flex-1 border border-gray-300 p-2 rounded-l-lg"
                                placeholder="Type your message here..."
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-500 text-white p-2 rounded-r-lg ml-2"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select a parent to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatPage;
