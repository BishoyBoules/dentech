import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';

interface List {
    id: number;
    list_name: string;
    list_price: number;
    clinic: number;
    items: number[];
}

interface ListFormProps {
    list?: List;
    onSubmit: (data: List) => void;
    onCancel: () => void;
}

const ListForm: React.FC<ListFormProps> = ({ list, onSubmit, onCancel }) => {
    const [name, setName] = useState(list?.list_name || '');
    const [price, setPrice] = useState(list?.list_price?.toString() || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !price.trim()) {
            return;
        }
        onSubmit({
            id: list?.id || 0,
            list_name: name.trim(),
            list_price: parseFloat(price),
            clinic: list?.clinic || 1,
            items: list?.items || []
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    List Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    List Price
                </label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                    disabled={!name.trim() || !price.trim()}
                >
                    {list ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
};

interface ListsPageProps {
    sendId: (id: number) => void;
}

const ListsPage: React.FC<ListsPageProps> = ({ sendId }) => {
    const [lists, setLists] = useState<List[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedList, setSelectedList] = useState<List | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, _setError] = useState('');

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await api.get('/api/pricing/lists/');
                if (response.data) {
                    setLists(response.data || []);
                }
            } catch (error) {
                console.error('Error fetching lists:', error);
                setLists([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLists();
    }, []);

    const handleCreateList = async (data: List) => {
        try {
            const response = await api.post('/api/pricing/lists/', data);
            setLists(prevLists => [...prevLists, response.data]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    const handleUpdateList = async (data: List) => {
        if (!selectedList) return;
        try {
            const response = await api.put(`/api/pricing/lists/${selectedList.id}/`, data);
            setLists(prevLists =>
                prevLists.map(list =>
                    list.id === selectedList.id ? response.data : list
                )
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating list:', error);
        }
    };

    const handleDeleteList = async () => {
        if (!selectedList) return;
        try {
            await api.delete(`/api/pricing/lists/${selectedList.id}/`);
            setLists(prevLists =>
                prevLists.filter(list => list.id !== selectedList.id)
            );
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Price Lists</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Add New List
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Items Count
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {lists.map(list => (
                            <tr key={list.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{list.list_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${list.list_price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/admin/lists/${list.id}/`} onClick={() => {
                                        sendId(list.id);
                                    }}>{list.items.length}</Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => {
                                            setSelectedList(list);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedList(list);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New List"
            >
                <ListForm
                    onSubmit={handleCreateList}
                    onCancel={() => setIsAddModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit List"
            >
                <ListForm
                    list={selectedList || undefined}
                    onSubmit={handleUpdateList}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete List"
            >
                <div className="p-6">
                    <p className="mb-4">Are you sure you want to delete this list?</p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteList}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ListsPage;
