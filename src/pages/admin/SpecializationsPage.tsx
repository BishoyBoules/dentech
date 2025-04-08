import React, { useState, useEffect } from 'react';
import { Item, Category } from '../../types/item';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../../components/ItemForm';
import { Modal } from 'antd';
import api from '../../utils/axios';

const SpecializationSection: React.FC<{
  title?: string;
  specialization?: string;
  items?: Category[];
  lists?: number[];
  extraItems?: number[];
  chooseSpecialization: (id: number) => void
  onAddItem: (item: Partial<Item>) => void;
  onUpdateItem: (item: Partial<Item>) => void;
  onDeleteItem: (itemId: string) => void;
}> = ({
  title,
  specialization,
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  chooseSpecialization,
}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | any>();
    const navigate = useNavigate();

    const handleSubmit = (data: Partial<Item>) => {
      try {
        if (editingItem) {
          onUpdateItem({ ...data, id: editingItem.id });
        } else {
          onAddItem({ ...data, specialization });
        }
        setIsFormOpen(false);
        setEditingItem(undefined);
      } catch (error) {
        console.error('Error submitting form:', error);
        // You might want to show an error message to the user here
      }
    };

    const handleCategoryClick = (id: number) => {
      chooseSpecialization(id);
      navigate(`/admin/category-lists/${id}`);
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCategoryClick(+item.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.category_name}
                    {item.lists && item.lists.length > 0 && (
                      <span className="ml-2 text-xs text-indigo-600">
                        ({item.lists?.length} lists)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${+item.category_price_per_patient.toFixed(2)}
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
                        Modal.confirm({
                          title: 'Delete Item',
                          content: 'Are you sure you want to delete this item? This action cannot be undone.',
                          okText: 'Yes',
                          okType: 'danger',
                          cancelText: 'No',
                          onOk: () => onDeleteItem(item.id)
                        });
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
          open={isFormOpen}
          footer={null}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingItem(undefined);
          }}
          width={800}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Item' : 'Create New Item'}
            </h2>
            <ItemForm
              item={editingItem}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingItem(undefined);
              }}
            />
          </div>
        </Modal>
      </div>
    );
  };

const SpecializationsPage = ({ chooseSpecialization }: { chooseSpecialization: (id: number) => void }) => {
  const [_items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getItems = async () => {
    try {
      const response = await api.get('/api/pricing/category/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  const handleAddItem = (newItemData: Partial<Item>) => {
    const newItem: Item = {
      id: Math.random().toString(36).substring(7),
      item_name: newItemData.item_name!,
      price_per_unit: newItemData.price_per_unit!,
      specialization: newItemData.specialization!,
      item_code: newItemData.item_code || '',
      company_name: newItemData.company_name || '',
      default_number_of_units: newItemData.default_number_of_units || 1,
      default_number_of_subunits: newItemData.default_number_of_subunits || 1,
      pricePerSubUnit: newItemData.pricePerSubUnit,
      expiration_date: newItemData.expiration_date || new Date().toISOString().split('T')[0],
      subItems: [],
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
    setItems((prevItems) => {
      const deleteItemAndChildren = (items: Item[]): Item[] => {
        return items.filter(item => {
          if (item.id === itemId) return false;
          if (item.subItems?.length) {
            item.subItems = deleteItemAndChildren(item.subItems);
          }
          return true;
        });
      };
      return deleteItemAndChildren(prevItems);
    });
  };

  return (
    <div className="space-y-8 p-6">
      <SpecializationSection
        items={categories}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        chooseSpecialization={chooseSpecialization}
      />
    </div>
  );
};

export default SpecializationsPage;
