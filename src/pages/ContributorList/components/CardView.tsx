/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import { Contributor } from '@/types';

const CardItem = ({
  contributor,
  onEdit,
  onDelete,
}: {
  contributor: Contributor;
  onEdit: (contributor: Contributor) => void;
  onDelete: (contributorId: number) => void;
}) => {
  const handleEdit = useCallback(() => onEdit(contributor), [contributor]);
  const handleDelete = useCallback(() => onDelete(contributor.contributorId), [contributor]);

  return (
    <div className="flex items-center space-x-4">
      <img
        src={contributor.contributorAvatarUrl}
        alt={contributor.contributorName}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/30"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{contributor.contributorName}</h3>
        <p className="text-gray-400 text-sm">{contributor.contributorAlias}</p>
        <span className="inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {contributor.contributorRole}
        </span>
        <div className="mt-3 space-x-2">
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
