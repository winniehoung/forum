import React, { useState } from 'react';

const UpdateMessage = ({ message, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...message });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    width: '400px'
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Message</h2>

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        disabled
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                            color: '#aaa'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                            color: '#aaa'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        disabled
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                            color: '#aaa'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            color: '#000'
                        }}
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="CLOSED">CLOSED</option>
                        <option value="RESOLVED">RESOLVED</option>
                    </select>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px'
                }}>
                    <button type="submit" style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                        Save
                    </button>
                    <button type="button" onClick={onCancel} style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMessage;