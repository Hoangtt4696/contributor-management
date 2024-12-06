import { useState } from 'react';
import { Contributor } from '@/types';

import CardView from './components/CardView';
import CardEdit from './components/CardEdit';

interface ContributorListProps {
  onBack: () => void;
  contributors: Contributor[];
  setContributors: React.Dispatch<React.SetStateAction<Contributor[]>>;
}

const ContributorList = ({ onBack, contributors, setContributors }: ContributorListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Contributor>>({});

  const handleEdit = (contributor: Contributor) => {
    setEditingId(contributor.contributorId);
    setEditForm(contributor);
  };

  const handleSave = () => {
    if (!editForm.contributorName?.trim() || !editForm.contributorAlias?.trim()) {
      alert('Name and Alias are required');
      return;
    }

    setContributors((prevContributors: Contributor[]): Contributor[] =>
      prevContributors.map((c) => (c.contributorId === editingId ? { ...c, ...editForm } : c))
    );
    
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (contributorId: number) => {
    if (window.confirm('Are you sure you want to delete this contributor?')) {
      setContributors((prevContributors) =>
        prevContributors.filter((c) => c.contributorId !== contributorId)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-white">Contributors</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((contributor) => (
            <div
              key={contributor.contributorId}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
            >
              {editingId === contributor.contributorId ? (
                <CardEdit
                  contributor={editForm}
                  onChange={setEditForm}
                  onSave={handleSave}
                  onCancel={() => {
                    setEditingId(null);
                    setEditForm({});
                  }}
                />
              ) : (
                <CardView contributor={contributor} onEdit={handleEdit} onDelete={handleDelete} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributorList;
