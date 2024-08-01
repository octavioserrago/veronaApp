// src/components/FeedbackMessage.js
import React, { useEffect } from 'react';

const FeedbackMessage = ({ message, type = 'success', duration = 3000, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-600';
            case 'error':
                return 'bg-red-600';
            case 'info':
                return 'bg-blue-600';
            default:
                return 'bg-gray-600';
        }
    };

    return (
        <div className={`fixed bottom-4 right-4 ${getBackgroundColor()} text-white px-4 py-2 rounded-lg shadow-lg`}>
            {message}
        </div>
    );
};

export default FeedbackMessage;
