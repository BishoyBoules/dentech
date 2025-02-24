import React, { useState, useEffect } from 'react';
import { Item, Specialization } from '../../types/item';

interface ItemFormProps {
  item?: Item;
  onSubmit: (data: Item) => void;
  onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onSubmit, onCancel }) => {
  const [name, setName] = useState(item?.name || '');
  const [price, setPrice] = useState(item?.price?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: item?.id || '',
      name,
      price: parseFloat(price),
      exportingUser: item?.exportingUser,
      specialization: Specialization.DIAGNOSIS
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
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
          Price
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
        >
          {item ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>();

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    // Simulating API call
    const mockItems: Item[] = [
      {
        id: '1',
        name: 'Dental Cleaning',
        price: 150.00,
        specialization: Specialization.SCALING
      },
      {
        id: '2',
        name: 'Tooth Extraction',
        price: 200.00,
        specialization: Specialization.DIAGNOSIS
      },
      {
        id: '3',
        name: 'Root Canal',
        price: 800.00,
        specialization: Specialization.DIAGNOSIS
      }
    ];
    setItems(mockItems);
  }, []);

  const handleCreateItem = (data: Item) => {
    // Simulating API call
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      price: data.price,
      additionDate: new Date(),
      specialization: Specialization.SCALING,
      exportingDate: new Date(),
      releaseDate: new Date(),
      expirationDate: new Date(),
    };
    setItems(prevItems => [...prevItems, newItem]);
    setIsFormOpen(false);
  };

  const handleUpdateItem = (data: Item) => {
    if (!editingItem) return;
    // Simulating API call
    const updatedItems = items.map((item) =>
      item.id === editingItem.id
        ? {
          ...item,
          ...data,
          updatedAt: new Date(),
        }
        : item
    );
    setItems(updatedItems);
    setEditingItem(undefined);
  };

  const handleDeleteItem = (id: string) => {
    // Simulating API call
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Items Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add New Item
        </button>
      </div>

      {(isFormOpen || editingItem) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Item' : 'Create New Item'}
            </h2>
            <ItemForm
              item={editingItem}
              onSubmit={(data) =>
                editingItem ? handleUpdateItem(data) : handleCreateItem(data)
              }
              onCancel={() => {
                setIsFormOpen(false);
                setEditingItem(undefined);
              }}
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
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
    </div>
  );
};

export default ItemsPage;
