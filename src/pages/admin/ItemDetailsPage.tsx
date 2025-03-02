import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { Item } from '../../types/item';

interface SubItemFormProps {
  listItem: boolean;
  subItem?: Item;
  onSubmit: (data: Partial<Item>) => void;
  onCancel: () => void;
  visible: boolean;
  subItems: Item[];
}

const SubItemForm: React.FC<SubItemFormProps> = ({ subItem, onSubmit, onCancel, visible }) => {
  const [name, setName] = useState(subItem?.name || '');
  const [price, setPrice] = useState(subItem?.price || 0);
  const [companyName, setCompanyName] = useState(subItem?.companyName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: subItem?.id || Math.random().toString(),
      name,
      price,
      companyName,
    });
  };

  return (
    <Modal
      title={subItem ? 'Edit Sub Item' : 'Add New Sub Item'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
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
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price *</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
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
            {subItem ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const ItemDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subId } = useParams<{ id: string; subId: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubItem, setEditingSubItem] = useState<Item | undefined>();

  useEffect(() => {
    if (location.state?.item) {
      setItem(location.state.item);
    }
  }, [location.state]);

  useEffect(() => {
    if (subId && item?.subItems) {
      const subItem = item.subItems.find(si => si.id === subId);
      if (subItem) {
        setItem(subItem);
      }
    }
  }, [subId, item?.subItems]);

  if (!item) {
    return (
      <div className="p-4">
        <div className="text-red-600">Item not found</div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back
        </button>
      </div>
    );
  }

  const handleAddSubItem = (subItem: Partial<Item>) => {
    const newSubItem = {
      ...subItem,
      id: Math.random().toString(),
      listItem: false,
    } as Item;

    const updatedItem = {
      ...item,
      subItems: [...(item.subItems || []), newSubItem],
    };

    setItem(updatedItem);
    setIsFormOpen(false);
    setEditingSubItem(undefined);
  };

  const handleUpdateSubItem = (updatedSubItem: Partial<Item>) => {
    const updatedSubItems = item.subItems?.map(si =>
      si.id === updatedSubItem.id ? { ...si, ...updatedSubItem } : si
    ) || [];

    setItem({
      ...item,
      subItems: updatedSubItems,
    });
    setIsFormOpen(false);
    setEditingSubItem(undefined);
  };

  const handleDeleteSubItem = (subItemId: string) => {
    Modal.confirm({
      title: 'Delete Sub Item',
      content: 'Are you sure you want to delete this sub item?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        const updatedSubItems = item.subItems?.filter(si => si.id !== subItemId) || [];
        setItem({
          ...item,
          subItems: updatedSubItems,
        });
      },
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSubItem(undefined);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Add New Item
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>

      <SubItemForm
        subItem={editingSubItem}
        listItem={false}
        subItems={item.subItems || []}
        onSubmit={editingSubItem ? handleUpdateSubItem : handleAddSubItem}
        onCancel={handleCloseForm}
        visible={isFormOpen}
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {item.subItems?.map((subItem) => {
              const rowProps = subItem.listItem ? {
                onClick: () => navigate(`/admin/items/${item.id}/sub-items/${subItem.id}`, { state: { item: subItem } }),
                className: "hover:bg-gray-50 cursor-pointer"
              } : {
                className: "hover:bg-gray-50"
              };

              return (
                <tr key={subItem.id} {...rowProps}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subItem.name}
                    {subItem.listItem && (
                      <span className="ml-2 text-xs text-indigo-600">
                        ({subItem.subItems?.length} sub-items)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${subItem.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subItem.companyName || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSubItem(subItem);
                        setIsFormOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSubItem(subItem.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {(!item.subItems || item.subItems.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No sub items found. Click "Add New Item" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
