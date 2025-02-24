import React, { useState, useEffect } from 'react';
import { Item, Specialization } from '../../types/item';

interface ItemFormProps {
  item?: Item;
  specialization: Specialization;
  onSubmit: (data: Partial<Item>) => void;
  onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, specialization, onSubmit, onCancel }) => {
  const [name, setName] = useState(item?.name || '');
  const [code, setCode] = useState(item?.code || '');
  const [price, setPrice] = useState(item?.price?.toString() || '');
  const [companyName, setCompanyName] = useState(item?.companyName || '');
  const [defaultNumOfUnits, setDefaultNumOfUnits] = useState(item?.defaultNumOfUnits?.toString() || '');
  const [defaultNumOfSubUnits, setDefaultNumOfSubUnits] = useState(item?.defaultNumOfSubUnits?.toString() || '');
  const [pricePerUnit, setPricePerUnit] = useState(item?.pricePerUnit?.toString() || '');
  const [pricePerSubUnit, setPricePerSubUnit] = useState(item?.pricePerSubUnit?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: item?.id,
      code,
      name,
      price: parseFloat(price),
      specialization,
      companyName,
      defaultNumOfUnits: defaultNumOfUnits ? parseInt(defaultNumOfUnits) : undefined,
      defaultNumOfSubUnits: defaultNumOfSubUnits ? parseInt(defaultNumOfSubUnits) : undefined,
      pricePerUnit: pricePerUnit ? parseFloat(pricePerUnit) : undefined,
      pricePerSubUnit: pricePerSubUnit ? parseFloat(pricePerSubUnit) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
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
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price *</label>
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
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="defaultNumOfUnits" className="block text-sm font-medium text-gray-700">Number of Units</label>
          <input
            type="number"
            id="defaultNumOfUnits"
            value={defaultNumOfUnits}
            onChange={(e) => setDefaultNumOfUnits(e.target.value)}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="defaultNumOfSubUnits" className="block text-sm font-medium text-gray-700">Number of Sub Units</label>
          <input
            type="number"
            id="defaultNumOfSubUnits"
            value={defaultNumOfSubUnits}
            onChange={(e) => setDefaultNumOfSubUnits(e.target.value)}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="pricePerUnit" className="block text-sm font-medium text-gray-700">Price per Unit</label>
          <input
            type="number"
            id="pricePerUnit"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            step="0.01"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="pricePerSubUnit" className="block text-sm font-medium text-gray-700">Price per Sub Unit</label>
          <input
            type="number"
            id="pricePerSubUnit"
            value={pricePerSubUnit}
            onChange={(e) => setPricePerSubUnit(e.target.value)}
            step="0.01"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
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

const SpecializationSection: React.FC<{
  title: string;
  specialization: Specialization;
  items: Item[];
  onAddItem: (item: Partial<Item>) => void;
  onUpdateItem: (item: Partial<Item>) => void;
  onDeleteItem: (itemId: string) => void;
}> = ({ title, specialization, items, onAddItem, onUpdateItem, onDeleteItem }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>();

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                  {item.subItems && item.subItems.length > 0 && (
                    <span className="ml-2 text-xs text-indigo-600">
                      ({item.subItems.length} sub-items)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.code || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.companyName || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.defaultNumOfUnits || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setIsFormOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
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

const SpecializationsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockItems: Item[] = [
      {
        id: '1',
        name: 'Basic Diagnosis',
        code: 'DIAG001',
        price: 150.00,
        specialization: Specialization.DIAGNOSIS,
        companyName: 'DentCorp',
        defaultNumOfUnits: 1,
        subItems: [
          {
            id: '1-1',
            name: 'X-Ray',
            price: 50.00,
            specialization: Specialization.DIAGNOSIS,
            defaultNumOfUnits: 1,
          },
          {
            id: '1-2',
            name: 'Consultation',
            price: 100.00,
            specialization: Specialization.DIAGNOSIS,
            defaultNumOfUnits: 1,
          },
        ],
      },
      {
        id: '2',
        name: 'Advanced Scaling',
        code: 'SCL001',
        price: 200.00,
        specialization: Specialization.SCALING,
        companyName: 'DentEquip',
        defaultNumOfUnits: 1,
      },
    ];
    setItems(mockItems);
  }, []);

  const handleAddItem = (newItemData: Partial<Item>) => {
    const newItem: Item = {
      id: Math.random().toString(36).substring(7),
      name: newItemData.name!,
      price: newItemData.price!,
      specialization: newItemData.specialization!,
      code: newItemData.code,
      companyName: newItemData.companyName,
      defaultNumOfUnits: newItemData.defaultNumOfUnits,
      defaultNumOfSubUnits: newItemData.defaultNumOfSubUnits,
      pricePerUnit: newItemData.pricePerUnit,
      pricePerSubUnit: newItemData.pricePerSubUnit,
      additionDate: new Date(),
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleUpdateItem = (updatedItemData: Partial<Item>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItemData.id
          ? { ...item, ...updatedItemData, updatedAt: new Date() }
          : item
      )
    );
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };

  const diagnosisItems = items.filter(
    (item) => item.specialization === Specialization.DIAGNOSIS
  );
  const scalingItems = items.filter(
    (item) => item.specialization === Specialization.SCALING
  );

  return (
    <div className="space-y-8">
      <SpecializationSection
        title="Diagnosis"
        specialization={Specialization.DIAGNOSIS}
        items={diagnosisItems}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />

      <SpecializationSection
        title="Scaling"
        specialization={Specialization.SCALING}
        items={scalingItems}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default SpecializationsPage;
