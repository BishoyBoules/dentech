import React, { useState, useEffect } from 'react';
import { User, Permission, UserRole } from '../types/user';
import { useAuth } from '../contexts/AuthContext';

interface PermissionsManagerProps {
  users: User[];
  onUpdatePermissions: (userId: string, permissions: Permission[]) => Promise<void>;
}

export const PermissionsManager: React.FC<PermissionsManagerProps> = ({
  users,
  onUpdatePermissions,
}) => {
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter out admin users and current user from the list
  const editableUsers = users.filter(
    (u) => u.role !== UserRole.ADMIN && u.id !== currentUser?.id
  );

  useEffect(() => {
    if (selectedUser) {
      const user = users.find((u) => u.id === selectedUser);
      setSelectedPermissions(user?.permissions || []);
    }
  }, [selectedUser, users]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handlePermissionToggle = (permission: Permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      await onUpdatePermissions(selectedUser, selectedPermissions);
    } catch (error) {
      console.error('Failed to update permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser?.role !== UserRole.ADMIN) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-semibold mb-4">Manage User Permissions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select User
          </label>
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a user...</option>
            {editableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email}) - {user.role}
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              {Object.values(Permission).map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={selectedPermissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={permission}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {permission.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedUser && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update Permissions'}
          </button>
        )}
      </form>
    </div>
  );
};
