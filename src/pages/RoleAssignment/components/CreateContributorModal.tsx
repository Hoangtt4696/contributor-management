import React, { useState, useEffect } from 'react';
import { Contributor, ContributorRole } from '@/types';

interface CreateContributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contributor: Omit<Contributor, 'contributorId'>) => void;
  initialName?: string;
  role: ContributorRole;
}

export const CreateContributorModal: React.FC<CreateContributorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialName = '',
  role,
}) => {
  const [name, setName] = useState(initialName);
  const [alias, setAlias] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-200 mb-4">Add New Contributor</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onSubmit({
              contributorName: name,
              contributorAlias: alias,
              contributorAvatarUrl: avatarUrl,
              contributorRole: role,
            });

            setName('');
            setAlias('');
            setAvatarUrl('');
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-200">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm mt-1 w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 px-4 py-3 outline-none placeholder-gray-400"
              required
              placeholder="Enter contributor's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Alias</label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="text-sm mt-1 w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 px-4 py-3 outline-none placeholder-gray-400"
              required
              placeholder="Enter contributor's alias"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Avatar URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="text-sm mt-1 w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 px-4 py-3 outline-none placeholder-gray-400"
              required
              placeholder="Enter avatar URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Role: {role}</label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 text-sm py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 text-sm py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
