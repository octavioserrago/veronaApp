import React, { useEffect, useState } from 'react';
import SideBar from '../../components/Side-bar';
import { BiUserPlus, BiTrash, BiSolidPencil } from "react-icons/bi";
import axios from 'axios';

const roleMapping = {
    1: 'Administrador',
    2: 'Gerente',
    3: 'Vendedor',
    4: 'Operador'
};

const UsersCrud = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        password: '',
        role_id: '',
        branch_id: ''
    });
    const [branches, setBranches] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8888/users');
            setUsers(response.data.results);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await axios.get('http://localhost:8888/branches');
            setBranches(response.data.results);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchBranches();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:8888/users', newUser);
            console.log('Respuesta del servidor:', response.data);
            fetchUsers();
            setShowModal(false);
            setNewUser({
                name: '',
                password: '',
                role_id: '',
                branch_id: ''
            });
            alert('Usuario agregado exitosamente');
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            alert('Error al agregar usuario. Por favor, intenta nuevamente.');
        }
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:8888/users/${userId}`);
                console.log('Respuesta del servidor:', response.data);
                fetchUsers();
                alert('Usuario eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                alert('Error al eliminar usuario. Por favor, intenta nuevamente.');
            }
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex flex-col flex-1 ml-56 p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold ml-8">Usuarios</h1>
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                        onClick={toggleModal}
                    >
                        Agregar Usuario <BiUserPlus />
                    </button>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Contraseña</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Rol</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Sucursal</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.user_id} className="odd:bg-white even:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.user_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.user_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.user_password}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{roleMapping[user.role_id]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.branch_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                                    onClick={() => handleEdit(user.user_id)}
                                                >
                                                    <BiSolidPencil />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none ml-2"
                                                    onClick={() => handleDelete(user.user_id)}
                                                >
                                                    <BiTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Usuario</h3>
                                        <div className="mt-2">
                                            <div className="mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={newUser.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={newUser.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">Rol</label>
                                                <select
                                                    name="role_id"
                                                    id="role_id"
                                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={newUser.role_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecciona un rol</option>
                                                    {Object.entries(roleMapping).map(([key, value]) => (
                                                        <option key={key} value={key}>{value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="branch_id" className="block text-sm font-medium text-gray-700">Sucursal</label>
                                                <select
                                                    name="branch_id"
                                                    id="branch_id"
                                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={newUser.branch_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecciona una sucursal</option>
                                                    {branches.map(branch => (
                                                        <option key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleAddUser}
                                >
                                    Agregar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={toggleModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersCrud;
