import { Table } from "antd";

interface ListItem {
    item_name: string;
    price_per_unit: string | number;
}

interface List {
    id: number;
    clinic: number;
    list_name: string;
    items: ListItem[];
}

interface CategoryListsPageProps {
    lists: List[] | null;
    name: string;
}

const CategoryListsPage: React.FC<CategoryListsPageProps> = ({ lists, name }) => {
    // Get all items from all lists
    const allItems = lists?.flatMap(list => list.items) || [];

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">{name}</h1>
            <Table
                dataSource={allItems}
                rowKey={(record) => record.item_name}
                columns={[
                    { 
                        title: 'Item Name',
                        dataIndex: 'item_name',
                        key: 'item_name',
                        sorter: (a, b) => a.item_name.localeCompare(b.item_name)
                    },
                    { 
                        title: 'Price per Unit',
                        dataIndex: 'price_per_unit',
                        key: 'price_per_unit',
                        render: (price) => `$${Number(price).toFixed(2)}`,
                        sorter: (a, b) => Number(a.price_per_unit) - Number(b.price_per_unit)
                    },
                ]}
            />
        </main>
    );
};

export default CategoryListsPage;