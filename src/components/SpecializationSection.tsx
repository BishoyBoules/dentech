import React, { useState } from 'react';
import { Item } from '../types/item';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';


const SpecializationSection: React.FC<{
    title: string;
    specialization: string;
    listItem: boolean;
    items: Item[];
    onAddItem: (item: Partial<Item>) => void;
    onUpdateItem: (item: Partial<Item>) => void;
    onDeleteItem: (itemId: string) => void;
}> = ({ title, specialization, items, onAddItem, onUpdateItem, onDeleteItem }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | undefined>();
    const navigate = useNavigate()

    const handleSubmit = (data: Partial<Item>) => {
        if (editingItem) {
            onUpdateItem({ ...data, id: editingItem.id });
        } else {
            onAddItem(data);
        }
        setIsFormOpen(false);
        setEditingItem(undefined);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    Add New Item
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th> */}
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units</th> */}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr
                                key={item.id}
                                className={`hover:bg-gray-50 ${item.id && 'cursor-pointer'}`}
                                onClick={() => navigate(`/admin/items/${item.id}`, { state: { item } })}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.item_name}
                                    {item.subItems && item.subItems.length > 0 && (
                                        <span className="ml-2 text-xs text-indigo-600">
                                            ({item.subItems.length} sub-items)
                                        </span>
                                    )}
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.code || 'N/A'}
                  </td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${item.price_per_unit.toFixed(2)}
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.companyName || 'N/A'}
                  </td> */}
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.defaultNumOfUnits || 'N/A'}
                  </td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingItem(item);
                                            setIsFormOpen(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteItem(item.id);
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

            {isFormOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingItem ? 'Edit Item' : 'Create New Item'}
                        </h2>
                        <ItemForm
                            item={editingItem}
                            specialization={specialization}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingItem(undefined);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpecializationSection