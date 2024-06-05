import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/usersApiSlice';
import Message from '../../components/Message';
import AdminMenu from './AdminMenu';

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState('');
    const [editableUserEmail, setEditableUserEmail] = useState('');

    useEffect(() => {
        refetch();
    }, [refetch]);

    const toggleEdit = (userId, userName, userEmail) => {
        setEditableUserId(userId);
        setEditableUserName(userName);
        setEditableUserEmail(userEmail);
    };

    const updateHandler = async(id) => {
        try {
            await updateUser({
                userId:id,
                username:editableUserName,
                email:editableUserEmail
            })
            setEditableUserId(null);
            refetch();
        } catch (error) {
            toast.error(error.data.message||error.error);
        }
    };

    const deleteHandler = async(id) => {
        if(window.confirm("Are you Sure?? ")){
            try {
                await deleteUser(id);
            } catch (error) {
                toast.error(error.data.message||error.error);
            }
        }
    };

    return (
        <div className="p=4">
            <h1 className="text-2xl font-semibold mb-4">Users</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <div className='flex flex-col md:flex-row'>
                   <AdminMenu/>
                    <table className='w-full md:w-4/5 mx-auto border border-black'>
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-black text left">ID</th>
                                <th className="px-4 py-2 border border-black text left">Name</th>
                                <th className="px-4 py-2 border border-black text left">Email</th>
                                <th className="px-4 py-2 border border-black text left">Admin</th>
                                <th className="px-4 py-2 border border-black text left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className='px-4 py-2 border border-black'>{user._id}</td>
                                    <td className='px-4 py-2 border border-black'>
                                        {editableUserId === user._id ? (
                                            <div className='flex items-center'>
                                                <input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} className='w-full p-2 border rounded-lg' />
                                                <button onClick={() => updateHandler(user._id)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='flex items-center'>
                                                {user.username}
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                    <FaEdit className='ml-[1rem]' />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 border border-black'>
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} className='w-full p-2 border rounded-lg' />
                                                <button onClick={() => updateHandler(user._id)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <p>{user.email}</p>
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                    <FaEdit className='ml-[1rem]' />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 border border-black'>
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border border-black">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button onClick={() => deleteHandler(user._id)} className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
