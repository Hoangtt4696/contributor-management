import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import ButtonGroup from '@/components/ButtonGroup';
import { MusicType, ContributorRole, ContributorAssignment, Contributor } from '@/types';

import Role from './components/ContributorRole';
import { getRoles, requiredRoles } from './constants';

interface RoleAssignmentProps {
  onBack: () => void;
  contributors: Contributor[];
  setContributors: React.Dispatch<React.SetStateAction<Contributor[]>>;
  roleAssignments: {
    musicType: MusicType;
    assignments: ContributorAssignment[];
  };
  setRoleAssignments: React.Dispatch<
    React.SetStateAction<{
      musicType: MusicType;
      assignments: ContributorAssignment[];
    }>
  >;
}

const Home = ({
  onBack,
  contributors,
  setContributors,
  roleAssignments,
  setRoleAssignments,
}: RoleAssignmentProps) => {
  const [musicType, setMusicType] = useState<MusicType>(
    roleAssignments.musicType || 'Instrumental'
  );
  const [assignments, setAssignments] = useState<ContributorAssignment[]>(
    roleAssignments.assignments || []
  );
  const [errors, setErrors] = useState<Record<ContributorRole, string>>({});

  const handleContributorSelect = (role: ContributorRole, selectedContributors: Contributor[]) => {
    setAssignments((prev) => {
      const existing = prev.find((a) => a.role === role);
      if (existing) {
        return prev.map((a) =>
          a.role === role ? { ...a, contributors: selectedContributors } : a
        );
      }
      return [...prev, { role, contributors: selectedContributors }];
    });
  };

  const handleAddContributor = (newContributor: Omit<Contributor, 'contributorId'>) => {
    const created = { ...newContributor, contributorId: contributors.length + 1 };
    setContributors([...contributors, created]);
    return created;
  };

  const validateAssignments = (): boolean => {
    const newErrors: Record<ContributorRole, string> = {} as Record<ContributorRole, string>;
    let isValid = true;

    const mainArtists = assignments.find((a) => a.role === 'MainArtist')?.contributors?.length || 0;
    const featuredArtists =
      assignments.find((a) => a.role === 'FeaturedArtist')?.contributors?.length || 0;

    if (mainArtists + featuredArtists > 3) {
      newErrors.MainArtist = 'Combined Main and Featured Artists cannot exceed 3';
      isValid = false;
    }

    requiredRoles.forEach((role) => {
      const assignment = assignments.find((a) => a.role === role);
      if (!assignment?.contributors?.length) {
        newErrors[role] = `${role} is required`;
        isValid = false;
      }
    });

    if (musicType !== 'Instrumental') {
      const lyricistAssignment = assignments.find((a) => a.role === 'Lyricist');
      if (!lyricistAssignment?.contributors?.length) {
        newErrors.Lyricist = 'Lyricist is required for this music type';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateAssignments()) {
      setRoleAssignments({
        musicType,
        assignments: [...assignments],
      });
      toast.success('Contributors saved successfully');
    }
  };

  const roles = getRoles(musicType);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center space-x-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
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
          <h1 className="text-2xl font-bold text-white">Role Assignment</h1>
        </div>
        <div className="rounded-lg p-6 space-y-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-400">
              Music type <span className="text-red-500">*</span>
            </label>
            <ButtonGroup
              selected={musicType}
              onChange={setMusicType}
              options={['Instrumental', 'Ballad', 'Rock']}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {roles.map(({ role, label, required }) => (
              <Role
                key={role}
                label={label}
                selectedContributors={assignments.find((a) => a.role === role)?.contributors || []}
                onSelect={(selected) => handleContributorSelect(role, selected)}
                required={required}
                role={role}
                onCreateContributor={handleAddContributor}
                error={errors[role]}
              />
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              className="px-6 py-2 w-48 bg-white text-black rounded-md font-bold hover:bg-gray-100 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
