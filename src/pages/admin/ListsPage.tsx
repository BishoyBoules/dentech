import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';
import { Item } from '../../types/item';

interface List {
    id: number;
    list_name: string;
    list_price: number;
    clinic: number;
}

interface ListFormProps {
    list?: List;
    onSubmit: (data: List) => void;
    onCancel: () => void;
}

interface ItemSelection {
    item: Item;
    isSelected: boolean;
}

const ListForm: React.FC<ListFormProps> = ({ list, onSubmit, onCancel }) => {
    const [name, setName] = useState(list?.list_name || '');
    const [selectedItems, setSelectedItems] = useState<ItemSelection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const [itemsResponse, listResponse] = await Promise.all([
                    api.get('/api/inventory/items/'),
                    list ? api.get(`/api/pricing/lists/${list.id}/`) : Promise.resolve({ data: null })
                ]);

                if (itemsResponse.data) {
                    const itemsData = itemsResponse.data;
                    const listItems = listResponse.data?.items || [];
                    const listItemIds = listItems.map((item: List) => item.id);

                    const initialSelections = itemsData.map((item: Item) => ({
                        item,
                        isSelected: listItemIds.includes(item.id)
                    }));
                    setSelectedItems(initialSelections);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [list]);

    const calculateTotalPrice = () => {
        return selectedItems
            .filter(selection => selection.isSelected)
            .reduce((total, selection) => {
                const price = Number(selection.item.price_per_unit) || 0;
                return total + price;
            }, 0);
    };

    const handleItemToggle = (itemId: string) => {
        setSelectedItems(prev => prev.map(selection =>
            selection.item.id === itemId
                ? { ...selection, isSelected: !selection.isSelected }
                : selection
        ));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            return;
        }

        try {
            const selectedItemIds = selectedItems
                .filter(selection => selection.isSelected)
                .map(selection => selection.item.id);

            if (selectedItemIds.length === 0) {
                console.error('No items selected');
                return;
            }

            const listData = {
                list_name: name.trim(),
                list_price: calculateTotalPrice(),
                clinic: list?.clinic || 1,
                items: selectedItemIds
            };

            let response;
            if (list) {
                response = await api.put(`/api/pricing/lists/${list.id}/`, listData);
            } else {
                response = await api.post('/api/pricing/lists/', listData);
            }

            onSubmit(response.data);
        } catch (error: any) {
            console.error('Error saving list:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        }
    };

    if (loading) {
        return <div>Loading items...</div>;
    }

    const formatPrice = (price: number | string) => {
        const numPrice = Number(price) || 0;
        return numPrice.toFixed(2);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    List Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 border-[1px] border-solid shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Items</h3>
                <div className="max-h-96 overflow-y-auto border border-gray-200 border-solid rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {selectedItems.map(selection => (
                                <tr key={selection.item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selection.isSelected}
                                            onChange={() => handleItemToggle(selection.item.id)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 border-[1px] border-solid rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {selection.item.item_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${formatPrice(selection.item.price_per_unit)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-lg font-medium">
                    Total Price: ${formatPrice(calculateTotalPrice())}
                </div>
                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 border-solid rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                        disabled={!name.trim() || selectedItems.filter(i => i.isSelected).length === 0}
                    >
                        {list ? 'Update' : 'Create'}
                    </button>
                </div>
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
            } catch (error: any) {
                console.error('Error fetching lists:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                }
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
        } catch (error: any) {
            console.error('Error creating list:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
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
        } catch (error: any) {
            console.error('Error updating list:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
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
        } catch (error: any) {
            console.error('Error deleting list:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
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
                                    }}>View</Link>
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
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 border-solid rounded-md hover:bg-gray-50"
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
