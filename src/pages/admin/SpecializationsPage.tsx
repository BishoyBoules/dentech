import React, { useState } from 'react';
import { Item, Specialization } from '../../types/item';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../../components/ItemForm';

const SpecializationSection: React.FC<{
  title: string;
  specialization: Specialization;
  listItem: boolean;
  items: Item[];
  onAddItem: (item: Partial<Item>) => void;
  onUpdateItem: (item: Partial<Item>) => void;
  onDeleteItem: (itemId: string) => void;
}> = ({ specialization, items, onAddItem, onUpdateItem, onDeleteItem }) => {
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
        <h2 className="text-2xl font-bold text-gray-900">Specializations Managment</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 ${item.listItem && 'cursor-pointer'}`}
                onClick={() => item.listItem && navigate(`/admin/items/${item.id}`, { state: { item } })}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                  {item.subItems && item.subItems.length > 0 && (
                    <span className="ml-2 text-xs text-indigo-600">
                      ({item.subItems.length} sub-items)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </td>
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

const SpecializationsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Diagnosis',
      price: 150.00,
      listItem: true,
      subItems: [{
        id: '1',
        name: 'Basic Diagnosis',
        code: 'DIAG001',
        price: 150.00,
        specialization: Specialization.SPECIALIZATION,
        companyName: 'Truemedfin',
        defaultNumOfUnits: 1,
        listItem: true,
        subItems: [
          {
            id: '0-1',
            name: 'MRI',
            price: 50.00,
            specialization: Specialization.DIAGNOSIS,
            defaultNumOfUnits: 1,
            listItem: false,
          },
          {
            id: '0-2',
            name: 'Consultation',
            price: 100.00,
            specialization: Specialization.DIAGNOSIS,
            defaultNumOfUnits: 1,
            listItem: false,
          },
        ]
      }]
    },
    {
      id: '2',
      name: 'Scaling',
      price: 200.00,
      specialization: Specialization.SCALING,
      listItem: true,
      subItems: [
        {
          id: '1-1',
          name: 'X-Ray',
          price: 50.00,
          specialization: Specialization.DIAGNOSIS,
          defaultNumOfUnits: 1,
          listItem: false,
        },
        {
          id: '1-2',
          name: 'Consultation',
          price: 100.00,
          specialization: Specialization.DIAGNOSIS,
          defaultNumOfUnits: 1,
          listItem: false,
        },
      ],
    },
  ]);


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

  return (
    <div className="space-y-8">
      <SpecializationSection
        title="Specializations"
        listItem={true}
        specialization={Specialization.DIAGNOSIS}
        items={items}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default SpecializationsPage;
