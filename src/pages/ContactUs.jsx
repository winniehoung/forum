import React, { useState } from 'react';
import { createMessage } from '../services/messageService';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        subject: '',
        message: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createMessage(formData);
            setSuccessMessage('Your message has been sent successfully!');
            setFormData({ userId: '', email: '', subject: '', message: '' }); // Reset form
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to send message. Please try again later.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={{
            margin: '10vh auto',
            maxWidth: '600px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h2 style={{ textAlign: 'center', color: '#282C34' }}>Contact Us</h2>
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px',color: '#282C34' }}>
                    <label>User ID:</label>
                    <input
                        type="number"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px',color: '#282C34' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px',color: '#282C34' }}>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px',color: '#282C34' }}>
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button type="submit" style={{
                    // backgroundColor: '#007bff',
                    // color: 'white',
                    // padding: '10px',
                    // borderRadius: '4px',
                    // border: 'none',
                    // cursor: 'pointer',
                    // width: '100%'
                }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
