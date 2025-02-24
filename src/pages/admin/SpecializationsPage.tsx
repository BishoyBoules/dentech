import React, { useState, useEffect } from 'react';
import { Item, Specialization } from '../../types/item';

interface ItemDetailsModalProps {
  item: Item;
  onClose: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Code:</p>
            <p>{item.code || 'N/A'}</p>
          </div>
          <div>
            <p className="font-medium">Price:</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-medium">Company:</p>
            <p>{item.companyName || 'N/A'}</p>
          </div>
          <div>
            <p className="font-medium">Units:</p>
            <p>{item.defaultNumOfUnits || 'N/A'}</p>
          </div>
          <div>
            <p className="font-medium">Sub Units:</p>
            <p>{item.defaultNumOfSubUnits || 'N/A'}</p>
          </div>
          <div>
            <p className="font-medium">Price per Unit:</p>
            <p>${item.pricePerUnit?.toFixed(2) || 'N/A'}</p>
          </div>
          <div>
            <p className="font-medium">Price per Sub Unit:</p>
            <p>${item.pricePerSubUnit?.toFixed(2) || 'N/A'}</p>
          </div>
          <div>
            <p className="font-medium">Total Sub Units:</p>
            <p>{item.totalNumOfSubUnits || 'N/A'}</p>
          </div>
        </div>

        {item.subItems && item.subItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Sub Items</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Units
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {item.subItems.map((subItem) => (
                  <tr key={subItem.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subItem.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${subItem.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subItem.defaultNumOfUnits || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const ItemsTable: React.FC<{
  items: Item[];
  onItemClick: (item: Item) => void;
}> = ({ items, onItemClick }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Code
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Company
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr
            key={item.id}
            onClick={() => onItemClick(item)}
            className="cursor-pointer hover:bg-gray-50"
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
              {item.code || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${item.price.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.companyName || 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SpecializationsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
      {
        id: '3',
        name: 'Complex Diagnosis',
        code: 'DIAG002',
        price: 300.00,
        specialization: Specialization.DIAGNOSIS,
        companyName: 'DentCorp',
        defaultNumOfUnits: 1,
      },
    ];
    setItems(mockItems);
  }, []);

  const diagnosisItems = items.filter(
    (item) => item.specialization === Specialization.DIAGNOSIS
  );
  const scalingItems = items.filter(
    (item) => item.specialization === Specialization.SCALING
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Diagnosis</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ItemsTable items={diagnosisItems} onItemClick={setSelectedItem} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Scaling</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ItemsTable items={scalingItems} onItemClick={setSelectedItem} />
        </div>
      </div>

      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default SpecializationsPage;
