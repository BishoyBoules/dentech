import React, { useState, useEffect } from 'react';
import { Item, Specialization } from '../../types/item';
import axios from 'axios';
import Modal from '../../components/Modal';

interface ItemFormProps {
  item?: Item;
  onSubmit: (data: Item) => void;
  onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onSubmit, onCancel }) => {
  const [name, setName] = useState(item?.item_name || '');
  const [price, setPrice] = useState(item?.price_per_unit?.toString() || '');
  const [itemCode, setItemCode] = useState(item?.item_code || '');
  const [companyName, setCompanyName] = useState(item?.company_name || '');
  const [numberOfUnits, setNumberOfUnits] = useState(item?.number_of_units?.toString() || '1');
  const [defaultUnits, setDefaultUnits] = useState(item?.default_number_of_units?.toString() || '1');
  const [defaultSubunits, setDefaultSubunits] = useState(item?.default_number_of_subunits?.toString() || '1');
  const [expirationDate, setExpirationDate] = useState(
    item?.expiration_date || new Date().toISOString().split('T')[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim() || !itemCode.trim() || !companyName.trim()) {
      return;
    }
    onSubmit({
      id: item?.id || '',
      item_name: name.trim(),
      price_per_unit: +price,
      item_code: itemCode.trim(),
      company_name: companyName.trim(),
      number_of_units: +numberOfUnits,
      default_number_of_units: +defaultUnits,
      default_number_of_subunits: +defaultSubunits,
      expiration_date: expirationDate,
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
          Price Per Unit
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
      <div>
        <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700">
          Item Code
        </label>
        <input
          type="text"
          id="itemCode"
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfUnits" className="block text-sm font-medium text-gray-700">
          Number of Units
        </label>
        <input
          type="number"
          id="numberOfUnits"
          value={numberOfUnits}
          onChange={(e) => setNumberOfUnits(e.target.value)}
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="defaultUnits" className="block text-sm font-medium text-gray-700">
          Default Number of Units
        </label>
        <input
          type="number"
          id="defaultUnits"
          value={defaultUnits}
          onChange={(e) => setDefaultUnits(e.target.value)}
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="defaultSubunits" className="block text-sm font-medium text-gray-700">
          Default Number of Subunits
        </label>
        <input
          type="number"
          id="defaultSubunits"
          value={defaultSubunits}
          onChange={(e) => setDefaultSubunits(e.target.value)}
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
          Expiration Date
        </label>
        <input
          type="date"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
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
          disabled={!name.trim() || !price.trim() || !itemCode.trim() || !companyName.trim()}
        >
          {item ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, _setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/inventory/items/');
        if (response.data) {
          setItems(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [currentPage]);

  const handleCreateItem = async (data: Item) => {
    try {
      const response = await axios.post('/api/inventory/items/', {
        item_name: data.item_name,
        price_per_unit: +data.price_per_unit,
        item_code: data.item_code,
        company_name: data.company_name,
        default_number_of_units: +(data.default_number_of_units ?? 0),
        default_number_of_subunits: +(data.default_number_of_subunits ?? 0),
        specialization: data.specialization
      });
      setItems(prevItems => [...prevItems, response.data]);
    } catch (error) {
      console.error('Error creating item:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  const handleUpdateItem = async (data: Item) => {
    if (!selectedItem) return;
    try {
      const response = await axios.put(`/api/inventory/items/${selectedItem.id}/`, {
        item_name: data.item_name,
        price_per_unit: +data.price_per_unit,
        item_code: data.item_code,
        company_name: data.company_name,
        default_number_of_units: +(data.default_number_of_units ?? 0),
        default_number_of_subunits: +(data.default_number_of_subunits ?? 0),
        specialization: data.specialization
      });
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === selectedItem.id ? response.data : item
        )
      );
    } catch (error) {
      console.error('Error updating item:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  // const handleDeleteItem = async (id: string) => {
  //   try {
  //     await axios.delete(`/api/inventory/items/${id}/`);
  //     setItems(prevItems => prevItems.filter(item => item.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: Item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    try {
      await axios.delete(`/api/inventory/items/${selectedItem.id}/`);
      setItems(items.filter(item => item.id !== selectedItem.id));
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Items Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add New Item
        </button>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Item">
        <ItemForm
          onSubmit={(data) => {
            handleCreateItem(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Item">
        {selectedItem && (
          <ItemForm
            item={selectedItem}
            onSubmit={(data) => {
              handleUpdateItem(data);
              setIsEditModalOpen(false);
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Item">
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.item_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price_per_unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
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
