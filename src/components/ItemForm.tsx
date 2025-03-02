
import React, { useState } from 'react';
import { Item, Specialization } from '../types/item';

interface ItemFormProps {
    item?: Item;
    specialization: Specialization;
    onSubmit: (data: Partial<Item>) => void;
    onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, specialization, onSubmit, onCancel }) => {
    const [name, setName] = useState(item?.name || '');
    const [code, setCode] = useState(item?.code || '');
    const [price, setPrice] = useState(0);
    const [companyName, setCompanyName] = useState(item?.companyName || '');
    const [defaultNumOfUnits, setDefaultNumOfUnits] = useState(0);
    const [defaultNumOfSubUnits, setDefaultNumOfSubUnits] = useState(0);
    const [pricePerUnit, setPricePerUnit] = useState(0);
    const [pricePerSubUnit, setPricePerSubUnit] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: item?.id,
            code,
            name,
            price: price,
            specialization,
            companyName,
            defaultNumOfUnits: defaultNumOfUnits,
            defaultNumOfSubUnits: defaultNumOfSubUnits,
            pricePerUnit: pricePerUnit,
            pricePerSubUnit: pricePerSubUnit,
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
                {!item?.listItem && <div>
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
                </div>}
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
                        onChange={(e) => setDefaultNumOfUnits(+e.target.value)}
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
                        onChange={(e) => setDefaultNumOfSubUnits(+e.target.value)}
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
                        onChange={(e) => {
                            setPricePerSubUnit(+e.target.value)
                            setPricePerUnit(+e.target.value * defaultNumOfSubUnits)
                            setPrice(pricePerUnit * defaultNumOfUnits)
                        }}
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

export default ItemForm