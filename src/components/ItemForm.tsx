import React, { useState } from 'react';
import { Item } from '../types/item';
import dayjs from 'dayjs';

interface ItemFormProps {
    item?: Item;
    specialization?: string;
    onSubmit: (data: Partial<Item>) => void;
    onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, specialization, onSubmit, onCancel }) => {
    const [itemName, setItemName] = useState(item?.item_name || '');
    const [itemCode, setItemCode] = useState(item?.item_code || '');
    const [pricePerUnit, setPricePerUnit] = useState(item?.price_per_unit || 0);
    const [companyName, setCompanyName] = useState(item?.company_name || '');
    const [defaultNumOfUnits, setDefaultNumOfUnits] = useState(item?.default_number_of_units || 1);
    const [defaultNumOfSubUnits, setDefaultNumOfSubUnits] = useState(item?.default_number_of_subunits || 1);
    const [pricePerSubUnit, setPricePerSubUnit] = useState(item?.pricePerSubUnit || 0);
    const [expirationDate, setExpirationDate] = useState(
        item?.expiration_date ? dayjs(item.expiration_date).format('YYYY-MM-DD') : ''
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: item?.id,
            item_name: itemName,
            item_code: itemCode,
            price_per_unit: pricePerUnit,
            specialization,
            company_name: companyName,
            default_number_of_units: defaultNumOfUnits,
            default_number_of_subunits: defaultNumOfSubUnits,
            pricePerSubUnit,
            expiration_date: expirationDate
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                        type="text"
                        id="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700">Code</label>
                    <input
                        type="text"
                        id="itemCode"
                        value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="pricePerUnit" className="block text-sm font-medium text-gray-700">Price per Unit *</label>
                    <input
                        type="number"
                        id="pricePerUnit"
                        value={pricePerUnit}
                        onChange={(e) => setPricePerUnit(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        min="0"
                        step="0.01"
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
                    <label htmlFor="defaultNumOfUnits" className="block text-sm font-medium text-gray-700">Default Number of Units</label>
                    <input
                        type="number"
                        id="defaultNumOfUnits"
                        value={defaultNumOfUnits}
                        onChange={(e) => setDefaultNumOfUnits(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        min="1"
                    />
                </div>
                <div>
                    <label htmlFor="defaultNumOfSubUnits" className="block text-sm font-medium text-gray-700">Default Number of Sub Units</label>
                    <input
                        type="number"
                        id="defaultNumOfSubUnits"
                        value={defaultNumOfSubUnits}
                        onChange={(e) => setDefaultNumOfSubUnits(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        min="1"
                    />
                </div>
                <div>
                    <label htmlFor="pricePerSubUnit" className="block text-sm font-medium text-gray-700">Price per Sub Unit</label>
                    <input
                        type="number"
                        id="pricePerSubUnit"
                        value={pricePerSubUnit}
                        onChange={(e) => setPricePerSubUnit(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        min="0"
                        step="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                    <input
                        type="date"
                        id="expirationDate"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
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
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default ItemForm;