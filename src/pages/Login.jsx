import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlerLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8888/users/login", {
                name: email,
                password
            });

            const { success, message, user } = response.data;

            if (success) {
                console.log(message);
                console.log(user);
                login(user);


                switch (user.role_id) {
                    case 1:
                        navigate('/admindashboard');
                        break;
                    case 2:
                        navigate('/managerdashboard');
                        break;
                    case 3:
                        navigate('/sellerdashboard');
                        break;
                    case 4:
                        navigate('/operativedashboard');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else {
                setError(message);
            }
        } catch (error) {
            console.error("Error en la solicitud de login:", error);
            setError('Error interno del servidor');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handlerLogin} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="p-2 text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>}
                    <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
