import { ContributorRole, Contributor } from '@/types';

interface CardEditProps {
  contributor: Partial<Contributor>;
  onChange: (updater: (prev: Partial<Contributor>) => Partial<Contributor>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CONTRIBUTOR_ROLES: ContributorRole[] = [
  'MainArtist',
  'FeaturedArtist',
  'Composer',
  'Lyricist',
  'MusicPublisher',
  'Producer',
  'Mixer',
  'Remixer',
];

const CardEdit = ({ contributor, onChange, onSave, onCancel }: CardEditProps) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={contributor.contributorName || ''}
        onChange={(e) =>
          onChange((prev: Partial<Contributor>) => ({ ...prev, contributorName: e.target.value }))
        }
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
        placeholder="Name"
      />
      <input
        type="text"
        value={contributor.contributorAlias || ''}
        onChange={(e) =>
          onChange((prev: Partial<Contributor>) => ({ ...prev, contributorAlias: e.target.value }))
        }
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
        placeholder="Alias"
      />
      <select
        value={contributor.contributorRole}
        onChange={(e) =>
          onChange((prev: Partial<Contributor>) => ({
            ...prev,
            contributorRole: e.target.value as ContributorRole,
          }))
        }
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
      >
        {CONTRIBUTOR_ROLES.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <div className="flex space-x-2">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CardEdit;
