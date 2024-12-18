import React, { useEffect, useState } from 'react';
import { getMessages, updateMessage } from '../services/messageService';
import UpdateMessage from '../components/UpdateMessage';
import Select from 'react-select';

const MessageManagement = () => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingMessage, setEditingMessage] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const messagesPerPage = 7;

    const statusOptions = [
        { value: 'OPEN', label: 'OPEN' },
        { value: 'IN_PROGRESS', label: 'IN_PROGRESS' },
        { value: 'CLOSED', label: 'CLOSED' },
        { value: 'RESOLVED', label: 'RESOLVED' },
    ];

    useEffect(() => {
        fetchMessages();
    }, []);

    const parseStatus = (status) => {
        try {
            const parsed = JSON.parse(status);
            return parsed.status || status;
        } catch (error) {
            return status;
        }
    };

    const fetchMessages = async () => {
        try {
            const data = await getMessages();
            const processedMessages = data.map(msg => ({
                ...msg,
                status: parseStatus(msg.status)
            }));
            const sortedMessages = processedMessages.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
            setMessages(sortedMessages);
            setFilteredMessages(sortedMessages);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const handleSearch = () => {
        if (selectedStatus) {
            const filtered = messages.filter(msg => msg.status === selectedStatus.value);
            setFilteredMessages(filtered);
        } else {
            setFilteredMessages(messages);
        }
        setCurrentPage(1);
    };

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredMessages.length / messagesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleUpdateClick = (message) => {
        setEditingMessage(message);
    };

    const handleSaveUpdate = async (updatedMessage) => {
        try {
            const messageToUpdate = {
                ...updatedMessage,
                status: typeof updatedMessage.status === 'object' ? updatedMessage.status.value : updatedMessage.status
            };

            await updateMessage(updatedMessage.messageId, messageToUpdate);

            const updatedMessages = messages.map((msg) =>
                msg.messageId === updatedMessage.messageId
                    ? { ...msg, ...messageToUpdate }
                    : msg
            );

            setMessages(updatedMessages);
            setFilteredMessages(updatedMessages);
            setEditingMessage(null);
        } catch (error) {
            console.error('Error saving update:', error);
        }
    };

    return (
        <div style={{
            margin: '10vh auto', // Center vertically and horizontally
            padding: '20px',
            maxWidth: '80%', // Keep it responsive
            minHeight: '70vh',
            backgroundColor: '#f9f9f9',
            color: '#282C34',
            borderRadius: '8px', // Slight rounded edges for better aesthetics
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'

        }}>
            <h1 style={{ textAlign: 'center'}}>Message Management</h1>

            {!editingMessage && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '80%' }}>
                        <Select
                            options={statusOptions}
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                            placeholder="Select Status"
                            isClearable
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        style={{
                        //     marginLeft: '10px',
                        //     padding: '8px 16px',
                        //     backgroundColor: '#007bff',
                        //     color: 'white',
                        //     border: 'none',
                        //     borderRadius: '4px',
                        //     cursor: 'pointer'
                        }}
                    >
                        Search
                    </button>
                </div>
            )}

            {!editingMessage && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subject</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Message</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentMessages.map((msg) => (
                            <tr key={msg.messageId}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(msg.dateCreated).toLocaleString()}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{msg.subject}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{msg.email}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{msg.message}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{msg.status}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button
                                        onClick={() => handleUpdateClick(msg)}
                                        style={{
                                            // padding: '5px 10px',
                                            // backgroundColor: '#28a745',
                                            // color: 'white',
                                            // border: 'none',
                                            // borderRadius: '4px',
                                            // cursor: 'pointer'
                                        }}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous Page
                        </button>
                        <span>
                            Page {currentPage} of {Math.ceil(filteredMessages.length / messagesPerPage)}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(filteredMessages.length / messagesPerPage)}
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            )}

            {editingMessage && (
                <UpdateMessage
                    message={editingMessage}
                    onSave={handleSaveUpdate}
                    onCancel={() => setEditingMessage(null)}
                />
            )}
        </div>
    );
};

export default MessageManagement;

